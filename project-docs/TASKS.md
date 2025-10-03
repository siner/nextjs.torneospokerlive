# Gestión de Tareas

## Feature: Mejora de Usabilidad y Estética (Layout, Navegación, Listados)

Mejorar la experiencia de usuario y el diseño visual de la aplicación.

## Completed Tasks

- [x] Usar imagen del logo en la cabecera
- [x] Crear estructura inicial de `project-docs`.
- [x] Rellenar `tech-specs.md` (incluyendo BBDD).
- [x] Rellenar `user-structure.md`.
- [x] Reestructurar `TASKS.md`.
- [x] Completar `overview.md`.
- [x] Detallar `requirements.md`.
- [x] Actualizar `tech-specs.md` (metodología).
- [x] Actualizar `user-structure.md` (flujos).
- [x] Actualizar `timeline.md`.
- [x] Identificar áreas específicas para la mejora de UI/UX (Navegación: consistencia móvil/desktop, estado activo).
- [x] Proponer cambios concretos (Refactorizar componente Navigation, usarlo en móvil y desktop).
- [x] Implementar mejoras UI/UX: Refactorizar `Navigation` y actualizar `Header` para consistencia.
- [x] Implementar mejoras UI/UX: Ajustar espaciado en `Header`.
- [x] Implementar mejoras UI/UX: Añadir iconos a `Navigation`.
- [x] Implementar mejoras UI/UX: Añadir iconos al Dropdown de Usuario en `Header`.
- [x] Implementar mejoras UI/UX: Refactorizar logo en `Header` (h1->span, sin ancho fijo).
- [x] Implementar mejoras UI/UX: Eliminar enlaces de contacto de `Header` y `Sheet`.
- [x] Implementar mejoras UI/UX: Crear componente `Footer` con enlaces de contacto y copyright.
- [x] Implementar mejoras UI/UX: Añadir `Footer` a `layout.tsx` y ajustar estructura.
- [x] Implementar mejoras UI/UX: Solucionar error de linter en `layout.tsx` con `Suspense` para `Header` async.
- [x] Implementar mejoras Layout: Centrar contenido de `Header` usando `container`.
- [x] Implementar mejoras Layout: Centrar contenido de `main` en `layout.tsx` usando `container`.
- [x] Implementar mejoras Estética: Mejorar hover/activo en `Navigation` desktop.
- [x] Implementar mejoras Estética: Simplificar `Sheet` móvil (eliminar H2 Menú).
- [x] Implementar mejoras UI/UX: Refactorizar `RowTournament` para usar `Card` de Shadcn/ui.
- [x] Implementar mejoras UI/UX: Corregir linter error en `RowTournament` post-refactor.
- [x] Implementar mejoras UI/UX: Refactorizar `RowTournament` a formato compacto (sin Card, flex, 3 cols).
- [x] Implementar mejoras UI/UX: Añadir Fee, Bounty, LevelTime a `RowTournament`.
- [x] Implementar mejoras UI/UX: Ajustar ancho de columna Fecha en `RowTournament`.
- [x] Implementar mejoras UI/UX: Ajustar formato de Buy-in/Fee/Bounty en `RowTournament`.
- [x] Implementar mejoras UI/UX: Cambiar icono de Bounty en `RowTournament` (Percent -> Target).
- [x] Implementar mejoras UI/UX: Aumentar tamaño fuente Buyin en `RowTournament`.
- [x] Implementar mejoras UI/UX: Centrar verticalmente columna Costos en `RowTournament`.
- [x] Implementar mejoras UI/UX: Mostrar "Registro Cerrado" si Buyin=0 en `RowTournament`.
- [x] Implementar mejoras UI/UX: Ajustar alineación vertical de Costos en móvil (`pt-1`) (Intento 1 fallido).
- [x] Implementar mejoras UI/UX: Reajustar layout `RowTournament` para mejor responsividad móvil (flex-col -> sm:flex-row) (Intento 2).
- [x] Implementar mejoras UI/UX: Reajustar layout `RowTournament` a 3 columnas con `items-center` y Link en nombre (Intento 3).
- [x] Implementar mejoras UI/UX: Refactorizar `RowTournament` a 4 columnas desktop, logos en col 2, fix leveltime wrap (Intento 4).
- [x] Revisión visual final de `RowTournament` (móvil y desktop).
- [x] Analizar página de listado `/eventos` y componente `RowEvent`.
- [x] Implementar mejoras UI/UX: Refactorizar `RowEvent` con estilo similar a `RowTournament` (3 columnas desktop, Link en nombre, clases estándar).
- [x] Implementar mejoras UI/UX: Ajustar `RowEvent` con logos desktop horizontales y mismo tamaño.
- [x] Implementar mejoras UI/UX: Mejorar layout de detalles (casino/tour) en móvil en `RowEvent`.
- [x] Revisión visual de `RowEvent`.
- [x] Analizar página de listado `/casinos` y componente `CardCasino`.
- [x] Refactorizar `CardCasino` usando Shadcn UI.
- [x] Configurar `next.config.mjs` para dominio de imágenes.
- [x] Corregir problema de layout="fill" en `next/image` para `CardCasino`.
- [x] Revisión visual y ajuste final de `CardCasino` (incluye color de fondo).
- [x] Analizar página de listado `/circuitos` y componente `CardTour`.
- [x] Corregir H1 en `circuitos/page.tsx`.
- [x] Refactorizar `CardTour` usando Shadcn UI y `next/image` (sin favoritos).
- [x] Actualizar uso de `next/image` (prop `fill`, clase `object-contain`) en `CardTour` y `CardCasino`.
- [x] Añadir prop `sizes` a `next/image` en `CardTour` y `CardCasino`.
- [x] Analizar página de detalle de Torneo (`/torneos/[slug]`).
- [x] Refactorizar detalles de torneo con `<dl>`.
- [x] Solucionar error linter de `CardCasino` async.
- [x] Refactorizar detalles de torneo con grid de `<Card>` e iconos.
- [x] Refactorizar cabecera, fecha/hora y descripción de detalle de torneo con `<Card>`.
- [x] Revisión visual final de detalle de Torneo.
- [x] Analizar página de detalle de Evento (`/eventos/[slug]`).
- [x] Añadir Card de encabezado a detalle de Evento (nombre, fechas, logos).
- [x] Envolver lista de torneos de detalle de Evento en Card.
- [x] Eliminar columna lateral redundante en detalle de Evento.
- [x] Revisión visual final y ajustes de detalle de Evento.
- [x] Revisar layout grid en `/casinos/page.tsx` (Decidido OK por ahora).
- [x] Investigar warning persistente de `next/image` con `fill` (Decidido ignorar por ahora).
- [x] Analizar `CardEvent` (Decidido OK por ahora).
- [x] Reestructurar página principal (`page.tsx`): ocultar secciones vacías, cards secundarias al final, mensaje amigable si no hay contenido.
- [x] Revisión de CardEvent y CardTour para confirmar uso de <img>
- [x] Reemplazo de next/image por <img> en CardCasino
- [x] Implementar prop `hideDate` en `RowTournament` para ocultar fecha y agrandar hora.
- [x] Modificar `page.tsx` para mostrar fecha en títulos y ocultarla en `RowTournament`.
- [x] Refactorizar layout de `casinos/[slug]/page.tsx` similar a `eventos/[slug]/page.tsx`.
- [x] Mejorar cabecera de `casinos/[slug]/page.tsx` (color fondo, mostrar `content`).
- [x] Reajustar layout cabecera `casinos/[slug]/page.tsx` (logo derecha, content markdown bajo título).
- [x] Crear función API `getNextEventsByCasino`.
- [x] Corregir función API `getNextEventsByCasino` (tipo ID y nombre columna).
- [x] Añadir sección 'Próximos Eventos' a `casinos/[slug]/page.tsx`.
- [x] Reordenar secciones en `casinos/[slug]/page.tsx` (Eventos antes que Torneos).
- [x] Optimizar padding móvil en `RowTournament.tsx`.
- [x] Refactorizar `middleware.ts` para evitar llamadas excesivas a `getSession` y definir rutas públicas.
- [x] Ajustar layout cabecera `casinos/[slug]/page.tsx` para móviles.
- [x] **Definir APIs:** Crear funciones Supabase para obtener posts (`getPosts`, `getPostBySlug`), categorías (`getCategories`), tags (`getTags`) y comentarios (`getCommentsByPostId`).
- [x] **Página Listado:** Crear ruta `/noticias` y componente `page.tsx` para mostrar posts.
- [x] **Página Detalle:** Crear ruta `/noticias/[slug]` y componente `page.tsx` para mostrar post y comentarios.
- [x] **Componentes UI:** Crear `PostCard`, `CommentSection`, `CategoryBadge`, `Tag`.
- [x] **Filtrado:** Añadir filtros por categoría/tag al listado `/noticias`.
- [x] **Implementar funcionalidad de añadir comentarios** (Server Action, formulario, manejo auth/anon).
- [x] **Añadir paginación al listado de noticias** (`getPosts` y UI en `NoticiasPage`).
- [x] **Crear páginas de archivo para categorías** (`/noticias/categoria/[slug]`).
- [x] **Crear páginas de archivo para tags** (`/noticias/tag/[slug]`).
- [x] **Añadir sección de noticias al menú de navegación principal.**
- [x] **Optimizar SEO y Metadatos**: Mejorar metadatos Open Graph, Twitter Cards, Canonical URLs y Structured Data (JSON-LD) en todas las páginas interiores:
  - [x] Casinos: Open Graph completo, Structured Data Casino
  - [x] Noticias: Structured Data NewsArticle
  - [x] Torneos: Open Graph completo
  - [x] Eventos: Open Graph completo, Structured Data Event
  - [x] Circuitos: Open Graph completo, Structured Data Organization

## In Progress Tasks

- [ ] Revisar/Mejorar formularios (Login/Registro).
- [ ] Revisión visual y de props para asegurar consistencia entre los tres componentes
- [ ] Añadir comentarios aclaratorios en el código
- [ ] Probar los componentes en diferentes tamaños de pantalla
- [ ] **Componentes UI:** Crear `CommentSection`, `CategoryBadge`, `Tag`.
- [ ] Implementar funcionalidad de añadir comentarios (requiere autenticación).

## Future Tasks

- [ ] Refinar `requirements.md`.
- [ ] Refinar `user-structure.md`.
- [ ] Añadir documentación de componentes/APIs.
- [ ] Funcionalidades para usuarios registrados.
- [ ] Mantener Changelog.
- [ ] Documentar en overview.md la decisión de usar <img> por simplicidad y consistencia
- [ ] **Filtrado:** Añadir filtros por categoría/tag al listado.
- [ ] Añadir paginación al listado de noticias.
- [ ] Crear páginas de archivo para tags (`/noticias/tag/[slug]`).
- [ ] Añadir sección de noticias al menú de navegación principal.

## Implementation Plan

1.  **Análisis y Discusión:** Identificar puntos débiles UI/UX. ✅ (Layout, Nav, Listados T/E/C)
2.  **Propuesta:** Sugerir cambios. ✅ (Layout Centrado, Estética Nav, Refactor Rows, Refactor CardCasino, Reestructuración Home)
3.  **Implementación Iterativa:** Aplicar cambios. ✅ (Layout, Nav, Rows, CardCasino, Home, RowTournament `hideDate`, Páginas Detalle Casino/Evento, Padding `RowTournament`)
4.  **Revisión:** Validar mejoras. ⏳ (Pendiente revisión formularios y consistencia visual)

- Se ha completado el refactor de `CardCasino` y `CardTour` usando Shadcn UI.
- Se ha actualizado el uso de `next/image` a la API moderna.
- Se corrigió el título H1 en la página de circuitos.
- Se ha reestructurado la página principal para ocultar secciones vacías y mejorar la jerarquía visual.
- Se ha añadido la prop `hideDate` a `RowTournament` y se ha usado en la home.
- Se ha refactorizado la página de detalle del casino para parecerse a la del evento, mejorando la cabecera (color, markdown, layout) y añadiendo la sección de próximos eventos.
- Se ha optimizado el padding móvil en `RowTournament`.
- **Nota:** Queda pendiente un warning de `next/image` en `CardTour`.
- **Próximo paso:** Decidido por el usuario.

### Relevant Files

- `src/components/layout/header.tsx` ✅
- `src/components/layout/navigation.tsx` ✅ (Enlace Noticias añadido)
- `src/components/layout/footer.tsx` ✅
- `src/app/layout.tsx` ✅
- `src/app/torneos/page.tsx` ✅ (Analizado)
- `src/components/tournament/RowTournament.tsx` ✅ (Prop `hideDate` implementada, Padding móvil optimizado)
- `src/app/globals.css`
- `src/components/`
- `src/app/**/page.tsx`
- `tailwind.config.ts`
- `src/app/eventos/page.tsx` ✅ (Analizado)
- `src/components/event/RowEvent.tsx` ✅ (Refactorizado v2 + user tweaks)
- `src/app/casinos/page.tsx` ✅ (Analizado)
- `src/components/casino/CardCasino.tsx` ✅ (Refactorizado v2 + user tweaks, <img>)
- `src/app/circuitos/page.tsx` ✅ (Analizado, H1 corregido)
- `src/components/tour/CardTour.tsx` ✅ (Refactorizado v2 + user tweaks, <img>)
- `next.config.mjs` ✅
- `src/app/page.tsx` ✅ (Reestructurado)
- `src/app/torneos/[slug]/page.tsx` ✅ (Refactorizado v2)
- `src/app/eventos/[slug]/page.tsx` ✅ (Refactorizado v2)
- `src/app/casinos/[slug]/page.tsx` ✅ (Refactorizado v2, Próximos eventos añadidos)
- `src/lib/supabase/queries/events.ts` ✅ (Función `getNextEventsByCasino` creada y corregida)
- `src/middleware.ts` ✅ (Refactorizado)
- `src/lib/supabase/queries/posts.ts` ✅ (API posts: `getPosts`, `getPostBySlug`)
- `src/lib/supabase/queries/categories.ts` ✅ (API categories: `getCategories`)
- `src/lib/supabase/queries/tags.ts` ✅ (API tags: `getTags`)
- `src/lib/supabase/queries/comments.ts` ✅ (API comments: `getCommentsByPostId`)
- `src/app/noticias/page.tsx` ✅ (Página listado, usa `PostCard`)
- `src/app/noticias/[slug]/page.tsx` ✅ (Página detalle + JSON-LD NewsArticle)
- `src/components/news/PostCard.tsx` ✅ (Componente Card para listado, usa `CategoryBadge`)
- `src/components/news/CommentSection.tsx` ✅ (Componente para mostrar comentarios)
- `src/components/news/CategoryBadge.tsx` ✅ (Componente Badge para categorías)
- `src/components/news/Tag.tsx` ✅ (Componente Badge para tags)
- `src/actions/blog.ts` ✅ (Server Action `addComment`)
- `src/components/news/NewCommentForm.tsx` ✅ (Formulario cliente para añadir comentarios)
- `src/components/news/PaginationControls.tsx` ✅ (Controles UI de paginación)
- `src/app/noticias/categoria/[slug]/page.tsx` ✅ (Página archivo categorías + Metadata)
- `src/app/noticias/tag/[slug]/page.tsx` ✅ (Página archivo tags + Metadata)
- `src/components/layout/navigation.tsx` ✅ (Enlace Noticias añadido)
- `src/app/casinos/[slug]/page.tsx` ✅ (Open Graph + JSON-LD Casino)
- `src/app/torneos/[slug]/page.tsx` ✅ (Open Graph completo)
- `src/app/eventos/[slug]/page.tsx` ✅ (Open Graph + JSON-LD Event)
- `src/app/circuitos/[slug]/page.tsx` ✅ (Open Graph + JSON-LD Organization)

## Feature: Sección de Noticias

Implementar una sección para mostrar artículos, noticias o posts, con capacidad de filtrado y visualización de detalles y comentarios.

## Completed Tasks

- [x] **Definir APIs:** Crear funciones Supabase para obtener posts (`getPosts`, `getPostBySlug`), categorías (`getCategories`), tags (`getTags`) y comentarios (`getCommentsByPostId`).
- [x] **Página Listado:** Crear ruta `/noticias` y componente `page.tsx` para mostrar posts.

## In Progress Tasks

- [ ] **Componentes UI:** Crear componentes reutilizables (ej. `CardPost`, `CommentSection`, `CategoryBadge`, `Tag`).

## Future Tasks

- [ ] **Filtrado:** Añadir filtros por categoría/tag al listado.
- [ ] Implementar funcionalidad de añadir comentarios (requiere autenticación).
- [ ] Añadir paginación al listado de noticias.
- [ ] Crear páginas de archivo para tags (`/noticias/tag/[slug]`).
- [ ] Añadir sección de noticias al menú de navegación principal.

## Implementation Plan

1.  **Definir APIs:** Crear funciones en `src/lib/supabase/queries/` para interactuar con las tablas `posts`, `categories`, `tags`, `comments`.
2.  **Página Listado:** Crear `src/app/noticias/page.tsx`. Mostrará una lista de posts usando un nuevo componente `PostCard`.
3.  **Página Detalle:** Crear `src/app/noticias/[slug]/page.tsx`. Mostrará el contenido completo del post y una sección de comentarios (`CommentSection`).
4.  **Componentes UI:** Desarrollar `PostCard`, `CommentSection`, `CategoryBadge`, `Tag` en `src/components/news/`.
5.  **Integración y Estilos:** Conectar las páginas con las APIs y aplicar estilos consistentes con el resto de la aplicación.
6.  **(Fase 2) Filtrado y Paginación:** Implementar la lógica de filtrado y paginación en la página de listado.
7.  **(Fase 2) Comentarios:** Añadir formulario para nuevos comentarios (requiere manejo de sesión de usuario).
8.  **(Fase 2) Archivos:** Crear páginas dinámicas para categorías y tags.
9.  **Navegación:** Añadir enlace a `/noticias` en `Navigation`.

### Relevant Files

- `src/lib/supabase/queries/posts.ts` (API posts)
- `src/lib/supabase/queries/categories.ts` (API categories)
- `src/lib/supabase/queries/tags.ts` (API tags)
- `src/lib/supabase/queries/comments.ts` (API comments)
- `src/app/noticias/page.tsx` (Página listado)
- `src/app/noticias/[slug]/page.tsx` (Página detalle)
- `src/components/news/PostCard.tsx`
- `src/components/news/CommentSection.tsx`
- `src/components/news/CategoryBadge.tsx`
- `src/components/news/Tag.tsx`
- `src/actions/blog.ts` (Server Action `addComment`)
- `src/components/news/NewCommentForm.tsx` (Formulario cliente para añadir comentarios)
- `src/components/news/PaginationControls.tsx` (Controles UI de paginación)
- `src/app/noticias/categoria/[slug]/page.tsx` ✅ (Página archivo categorías + Metadata)
- `src/app/noticias/tag/[slug]/page.tsx` ✅ (Página archivo tags + Metadata)
