import es from './translations/es';
import en from './translations/en';
import ru from './translations/ru';
import fr from './translations/fr';
import type { Dict } from './translations/es';

export type Lang = 'es' | 'en' | 'ru' | 'fr';
export type { Dict };

export const defaultLang: Lang = 'es';

/** Orden en el que aparecen en el selector de idioma. */
export const languages: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'es', label: 'ES', name: 'Español' },
];

const dictionaries: Record<Lang, Dict> = { es, en, ru, fr };

export function useTranslations(lang: Lang): Dict {
  return dictionaries[lang] ?? dictionaries[defaultLang];
}

/** URL de la home en cada idioma: es → "/", en → "/en/", etc. */
export function localizedHome(lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return lang === defaultLang ? `${base}/` : `${base}/${lang}/`;
}

/** Ruta a un archivo de /public respetando el "base" de Astro. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
