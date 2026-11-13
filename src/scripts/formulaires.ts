/**
 * Envoi des formulaires ÉQUO.
 * - Validation accessible (messages reliés aux champs).
 * - Anti-spam : champ piège invisible + délai minimal de remplissage.
 * - Envoi via Web3Forms ou Formspree si configuré, sinon préparation
 *   d'un e-mail dans la messagerie du visiteur.
 */
type Config = { provider: string | null; web3formsKey: string | null; formspreeId: string | null; email: string };

const DELAI_MIN_MS = 3000;

function message(form: HTMLFormElement, type: 'ok' | 'erreur' | 'info', html: string) {
  const zone = form.querySelector<HTMLElement>('[data-statut]');
  if (!zone) return;
  zone.hidden = false;
  zone.dataset.type = type;
  zone.innerHTML = html;
  zone.focus();
}

type ChampEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/** Vérifie un champ et affiche son message ; renvoie true s'il est valide. */
function validerChamp(el: ChampEl): boolean {
  const err = document.getElementById(`${el.id}-erreur`);
  let texte = '';
  const min = 'minLength' in el ? el.minLength : -1;
  if (el.validity.valueMissing) texte = el.type === 'checkbox' ? 'Merci de cocher cette case pour que nous puissions vous répondre.' : 'Ce champ est obligatoire.';
  else if (el.validity.typeMismatch) texte = 'Merci de vérifier le format de l’adresse e-mail.';
  else if (min > 0 && el.value.trim().length < min) texte = `Merci d’écrire au moins ${min} caractères.`;
  el.setAttribute('aria-invalid', texte ? 'true' : 'false');
  if (err) { err.textContent = texte; err.hidden = !texte; }
  return !texte;
}

/** Vérifie tout le formulaire et place le focus sur le premier champ en erreur. */
function valider(form: HTMLFormElement): boolean {
  let premier: ChampEl | null = null;
  form.querySelectorAll<ChampEl>('[data-champ]').forEach((el) => {
    if (!validerChamp(el) && !premier) premier = el;
  });
  if (premier) (premier as ChampEl).focus();
  return !premier;
}

function versTexte(data: FormData, libelles: Record<string, string>): string {
  const lignes: string[] = [];
  data.forEach((v, k) => {
    if (k.startsWith('_') || k === 'access_key' || k === 'botcheck' || k === 'consentement' || k === 'subject') return;
    lignes.push(`${libelles[k] ?? k} : ${v}`);
  });
  return lignes.join('\n');
}

export function initFormulaires(config: Config) {
  document.querySelectorAll<HTMLFormElement>('form[data-formulaire]').forEach((form) => {
    const debut = Date.now();
    form.setAttribute('novalidate', '');

    // Préremplissage du type de demande via ?type=…
    const type = new URLSearchParams(location.search).get('type');
    const select = form.querySelector<HTMLSelectElement>('select[name="type"]');
    if (type && select && [...select.options].some((o) => o.value === type)) select.value = type;

    // Après une première erreur, le message du champ se met à jour dès qu'il est corrigé (sans déplacer le focus).
    // (évènement « input » : le message disparaît pendant la saisie, pas au moment où l'on clique ailleurs,
    // ce qui évite un décalage de la page sous le pointeur.)
    form.querySelectorAll<ChampEl>('[data-champ]').forEach((el) =>
      el.addEventListener(el instanceof HTMLInputElement && el.type === 'checkbox' || el instanceof HTMLSelectElement ? 'change' : 'input', () =>
        el.getAttribute('aria-invalid') === 'true' && validerChamp(el),
      ),
    );

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!valider(form)) return;

      const data = new FormData(form);
      const piege = (data.get('botcheck') as string) || '';
      if (piege || Date.now() - debut < DELAI_MIN_MS) {
        // Probablement un robot : on ne transmet rien.
        message(form, 'erreur', 'Votre message n’a pas pu être envoyé. Merci de réessayer dans quelques secondes.');
        return;
      }

      const libelles: Record<string, string> = JSON.parse(form.dataset.libelles || '{}');
      const sujet = `[Site ÉQUO] ${form.dataset.sujet ?? 'Message'}`;
      const bouton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

      if (!config.provider) {
        const corps = versTexte(data, libelles);
        location.href = `mailto:${config.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
        message(
          form,
          'info',
          `Votre messagerie s’ouvre avec votre message prêt à envoyer. Si rien ne se passe, écrivez-nous directement à <strong>${config.email}</strong>.`,
        );
        return;
      }

      bouton?.setAttribute('disabled', '');
      bouton?.setAttribute('aria-busy', 'true');
      try {
        let url = '';
        if (config.provider === 'web3forms' && config.web3formsKey) {
          url = 'https://api.web3forms.com/submit';
          data.set('access_key', config.web3formsKey);
          data.set('subject', sujet);
          data.set('from_name', 'Site ÉQUO');
        } else if (config.provider === 'formspree' && config.formspreeId) {
          url = `https://formspree.io/f/${config.formspreeId}`;
          data.set('_subject', sujet);
        } else throw new Error('Formulaire non configuré');

        const res = await fetch(url, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        message(form, 'ok', '<strong>Merci, votre message a bien été envoyé.</strong> Nous vous répondrons dans les meilleurs délais.');
      } catch {
        message(
          form,
          'erreur',
          `L’envoi n’a pas abouti. Vous pouvez réessayer ou nous écrire directement à <strong>${config.email}</strong>.`,
        );
      } finally {
        bouton?.removeAttribute('disabled');
        bouton?.removeAttribute('aria-busy');
      }
    });
  });
}
