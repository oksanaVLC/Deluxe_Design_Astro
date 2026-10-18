// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/guides/internationalization/
export default defineConfig({
  // Cambia por tu dominio definitivo (se usa para las URLs canónicas y hreflang)
  site: 'https://deluxe-design.netlify.app',
  i18n: {
    locales: ['es', 'en', 'ru', 'fr'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false }, // es → /   ·   en → /en/   ·   ru → /ru/   ·   fr → /fr/
  },
});
