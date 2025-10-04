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
- [x] **Imágenes OG dinámicas**: Crear Cloudflare Worker para generar imágenes Open Graph con fondos de color personalizados
  - [x] Crear Worker con satori para generación de SVG
  - [x] Helper en Next.js para generar URLs del worker
  - [x] Integrar en metadatos de casinos, torneos, eventos y circuitos
  - [x] Desplegar worker en Cloudflare (✅ https://torneospokerlive-og.edgefranmoreno.workers.dev)
  - [x] Cargar logos como base64 para que funcione con satori
  - [x] Soporte para múltiples logos (eventos con casino + circuito)
  - [x] Marca de agua con logo de Torneos Poker Live
  - [x] Calcular contraste de texto según color de fondo
  - [x] Invertir logo de marca de agua en fondos oscuros
  - [x] Excluir directorio del worker en tsconfig y .cfignore

### Formularios de Login/Registro (Completado)

- [x] Mejorar textos a castellano consistente (Login → Iniciar sesión)
- [x] Añadir redirección automática tras registro exitoso (2 segundos)
- [x] Corregir nombre de función en registro/page.tsx
- [x] Mejorar responsive en móviles (padding, altura mínima)
- [x] Mejorar descripción y enlaces entre formularios

### Revisión y Consistencia de Componentes (Completado)

- [x] Limpiar comentarios innecesarios en CardTour
- [x] Eliminar atributo sizes innecesario en CardTour
- [x] Refactorizar RowTour para consistencia con otros Rows
- [x] RowTour ahora usa mismo patrón que RowTournament y RowEvent (border-b, hover:bg-accent, tooltips, logos con backgroundColor)
- [x] Verificar componentes sin errores de linting

## Completed Tasks

- [x] Añadir comentarios aclaratorios en el código (No necesario)
- [x] Probar los componentes en diferentes tamaños de pantalla (Probado por el usuario)
- [x] Sistema de migraciones SQL organizado por fecha (supabase/migrations/)
- [x] Rediseño completo de páginas de ajustes/perfil
  - Dashboard con estadísticas en `/ajustes`
  - Perfil movido a `/ajustes/perfil`
  - Navegación mejorada con iconos
  - Estados vacíos atractivos con SVG
  - Contadores y badges para destacar información
- [x] Botón de favoritos añadido a página de detalle de casino
- [x] Nuevo diseño de estrellas de favoritos (amarillo dorado)
- [x] Mejoras de accesibilidad en componentes Star (button, aria-labels, tooltips)

## In Progress Tasks

Ninguna tarea en progreso.

## Próximas Funcionalidades Propuestas

Ver documento completo en: `project-docs/MEJORAS-PROPUESTAS.md`

### Alta Prioridad:

- [x] **Favoritos de Torneos** - Marcar torneos específicos como favoritos ✅ COMPLETADO
  - Componente TournamentStar creado
  - Integrado en página de detalle de torneo
  - Página `/ajustes/mis-torneos` con RowTournament y tabs Próximos/Pasados
  - Filtro "Mis Torneos" en página `/torneos`
  - Soporte en calendario
  - Enlace en header dropdown
- [x] **Rediseño de Páginas de Ajustes/Perfil** - Mejoras UI/UX ✅ COMPLETADO
  - Dashboard con estadísticas (favoritos, próximos torneos)
  - Menú lateral mejorado con iconos (User, Star, Trophy, LayoutDashboard)
  - Acciones rápidas para navegar por la web
  - Estados vacíos mejorados con CTAs
  - Contadores de items en listados
  - Estructura reorganizada: /ajustes (dashboard), /ajustes/perfil, /ajustes/mis-casinos, /ajustes/mis-torneos
- [x] **Mejoras en Visualización de Favoritos** ✅ COMPLETADO
  - Reemplazadas DataTables por componentes visuales
  - Búsqueda en tiempo real
  - Migración para eliminar duplicados
- [x] **Favoritos de Eventos y Circuitos** - Extender sistema de favoritos ✅ COMPLETADO
  - Tablas event_stars y tour_stars en Supabase
  - Componentes EventStar y TourStar
  - Páginas /ajustes/mis-eventos y /ajustes/mis-circuitos
  - Integración completa en navegación y dashboard
  - 5 tarjetas de estadísticas en dashboard
- [x] **Filtrado y Búsqueda Avanzada** - Filtros por buy-in, fecha, casino, evento ✅ COMPLETADO
  - Componente TournamentFilters con UI de Shadcn
  - Filtros por buy-in (mín/máx), casino, evento, fechas (desde/hasta)
  - Persistencia en localStorage
  - Indicadores visuales con badges de filtros activos
  - Optimización: solo eventos futuros/presentes en dropdown
  - Optimización: solo casinos con torneos disponibles en dropdown
  - Botón "Limpiar todo" para resetear filtros
  - Integrado en página `/torneos` con TorneosClient
  - Query params en URL para compartir búsquedas filtradas
  - Sincronización bidireccional entre URL y estado de filtros
  - **Filtros contextuales:**
    - CasinoTorneosClient: filtros en vista de casino (oculta filtro de casino)
    - EventoTorneosClient: filtros en vista de evento (oculta filtro de evento)
    - Props hideCasinoFilter/hideEventFilter en TournamentFilters
    - Contador de resultados filtrados en título
- [x] **Compartir en RRSS** - Botones de compartir torneos/eventos/noticias ✅ COMPLETADO
  - Componente ShareButtons reutilizable
  - Soporte para Twitter, WhatsApp, Telegram y copiar enlace
  - Formato optimizado por red social (emojis, saltos de línea, negrita)
  - Descripciones concisas con separador •
  - Integrado en todas las páginas de detalle (torneos, eventos, casinos, circuitos, noticias)
  - Dropdown menu con tooltips
  - **Fix visibilidad:** filtro invert en fondos oscuros (text-color #ffffff)
- [x] **Comentarios en Noticias** - Sistema completo de comentarios ✅ COMPLETADO
  - Migración SQL con user_id, updated_at y RLS policies
  - Componente Comment con avatares y edición inline
  - Funciones updateComment y deleteComment en actions
  - AlertDialog para confirmar eliminación
  - Contador de comentarios en PostCard
  - Solo propietarios pueden editar/eliminar
  - Indicador "editado" en comentarios modificados
  - Query optimizada con JOIN a tabla user
  - Scroll automático a sección de comentarios
- [x] **Sistema Universal de Comentarios** - Torneos, Casinos, Eventos, Circuitos ✅ COMPLETADO
  - Tabla 'comments' polimórfica con entity_type y entity_id
  - Enum entity_type: tournament, casino, event, tour
  - Componentes reutilizables: UniversalComment, UniversalCommentSection, UniversalNewCommentForm
  - Actions genéricas: addUniversalComment, updateUniversalComment, deleteUniversalComment
  - Query genérica: getCommentsByEntity(entityType, entityId)
  - Integrado en todas las páginas de detalle
  - Mantiene blog_comments por retrocompatibilidad
  - Validación 3-2000 caracteres
- [ ] **Sistema de Notificaciones** - In-app y por email

### Media Prioridad:

- [ ] **Dashboard de Usuario** - Vista personalizada centralizada
- [ ] **Calendario Descargable** - Export a Google Calendar/iCal

### Baja Prioridad (Quick Wins):

- [ ] **Estadísticas Públicas** - Torneos más populares, tendencias
- [ ] **Histórico de Torneos** - Ver torneos pasados
- [ ] **Modo Oscuro** - Toggle de tema
- [ ] **PWA** - App instalable y notificaciones push

## Future Tasks (Documentación)

- [ ] Refinar `requirements.md` tras implementar nuevas features
- [ ] Refinar `user-structure.md`
- [ ] Añadir documentación de componentes/APIs
- [ ] Mantener Changelog

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
- Se ha limpiado `CardTour` eliminando comentarios y atributos innecesarios.
- Se ha refactorizado `RowTour` para que sea consistente con `RowTournament` y `RowEvent`.
- **Componentes ahora consistentes:** Todos los componentes Row* y Card* siguen el mismo patrón de diseño.

### Relevant Files

- `src/components/layout/header.tsx` ✅
- `src/components/layout/navigation.tsx` ✅ (Enlace Noticias añadido)
- `src/components/layout/footer.tsx` ✅
- `src/app/layout.tsx` ✅
- `src/app/torneos/page.tsx` ✅ (Analizado)
- `src/components/tournament/RowTournament.tsx` ✅ (Prop `hideDate` implementada, Padding móvil optimizado)
- `src/components/tour/CardTour.tsx` ✅ (Limpiado y optimizado)
- `src/components/tour/RowTour.tsx` ✅ (Refactorizado para consistencia)
- `src/components/event/RowEvent.tsx` ✅
- `src/components/casino/CardCasino.tsx` ✅
- `src/app/login/page.tsx` ✅ (Mejorado responsive y textos)
- `src/app/login/form-login.tsx` ✅ (Textos en castellano)
- `src/app/registro/page.tsx` ✅ (Mejorado responsive y textos)
- `src/app/registro/form-register.tsx` ✅ (Redirección automática)
- `src/app/globals.css`
- `tailwind.config.ts`
- `src/app/eventos/page.tsx` ✅ (Analizado)
- `src/app/casinos/page.tsx` ✅ (Analizado)
- `src/app/circuitos/page.tsx` ✅ (Analizado, H1 corregido)
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
- `src/app/torneos/[slug]/page.tsx` ✅ (Open Graph completo + OG Image dinámica)
- `src/app/eventos/[slug]/page.tsx` ✅ (Open Graph + JSON-LD Event + OG Image dinámica)
- `src/app/circuitos/[slug]/page.tsx` ✅ (Open Graph + JSON-LD Organization + OG Image dinámica)
- `src/lib/og-image.ts` ✅ (Helper para generar URLs de imágenes OG)
- `cloudflare-worker-og/` ✅ (Worker para generación dinámica de imágenes OG)

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
