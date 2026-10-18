# Deluxe Design Properties · Astro

Web de una página en 4 idiomas (ES, EN, RU, FR), dividida en componentes.

## Arrancar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist listo para subir
npm run preview   # sirve /dist en local
```

Requiere Node 18.20+ (recomendado 22).

## Estructura

```
public/
  images/          fotos, logos, llaves (webp) + póster jpg
  video/           hero.mp4 (H.264) y hero.webm (VP9), ambos sin audio
src/
  styles/
    variables.css  colores, fuentes, tamaños y espaciados (cambian por breakpoint)
    global.css     reset, tipografía base y utilidades (.btn, .eyebrow, .h2, .field…)
    animations.css keyframes compartidos (llaves, caída, fundido) + reduced-motion
  i18n/
    translations/  es.ts (base), en.ts, ru.ts, fr.ts
    index.ts       idiomas, useTranslations(), localizedHome(), asset()
  data/site.ts     contacto, redes sociales, rutas de imágenes y equipo
  layouts/BaseLayout.astro   <head>, SEO, hreflang y fuentes
  views/Home.astro           orden de las secciones
  pages/index.astro          español  → /
  pages/[lang]/index.astro   en/ru/fr → /en/ /ru/ /fr/
  components/
    Hero, HeroVideo, Header, LanguageSwitcher, MobileMenu, SocialLinks,
    Intro, WhyUs, ProjectSlider, Process, Surroundings, Team, Contact,
    Dossier, Footer
```

Cada componente lleva sus propios estilos en su `<style>` (Astro los aísla, así que no
chocan entre sí) y su JS en `<script>`. Todos usan las variables de `variables.css`.

Breakpoints: móvil < 768px · tablet 768–1199px · escritorio ≥ 1200px.

## Tareas habituales

- **Cambiar un texto:** edítalo en `src/i18n/translations/<idioma>.ts`. `es.ts` es el
  modelo: si añades una clave allí, TypeScript marcará los otros idiomas hasta que la traduzcas.
- **Cambiar un color o un tamaño:** `src/styles/variables.css`.
- **Redes sociales, email, teléfono, área cliente:** `src/data/site.ts` (ahora están en `#`).
- **Añadir una foto al slider:** añade la ruta en `slides` (`site.ts`) y su título/alt
  en `slider.slides` de cada idioma.
- **Quitar o mover una sección:** `src/views/Home.astro`.
- **Dominio:** cambia `site` en `astro.config.mjs` (se usa en canonical y hreflang).

## Vídeo en iPhone y Android

No hace falta ningún plugin. `HeroVideo.astro` ya incluye:
`autoplay muted loop playsinline webkit-playsinline`, `.muted = true` por JS antes de
`play()`, reintento al volver a la pestaña o tras el primer toque, y CSS que oculta los
controles nativos de WebKit (el "circulito" de play). Si el iPhone está en
**Ahorro de batería**, iOS bloquea todo autoplay: entonces se ve el póster, sin botón.

Si cambias el vídeo, expórtalo sin audio y en H.264 con faststart:

```bash
ffmpeg -i nuevo.mp4 -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 24 -movflags +faststart public/video/hero.mp4
ffmpeg -i nuevo.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 38 public/video/hero.webm
```

## Formularios

Los formularios de contacto y dossier llevan `data-netlify="true"`. Si publicas en Netlify,
funcionan sin backend (los envíos aparecen en el panel de Netlify, en Forms). En otro
hosting, cambia el `action` del formulario por tu servicio (Formspree, tu API…).

## Pendiente

- URLs reales de redes sociales y del área cliente
- Páginas legales (privacidad, aviso legal, cookies)
- Revisar las traducciones RU/FR/EN con un nativo antes de publicar

Iconos: Font Awesome Free 6.6.0 (CC BY 4.0).
