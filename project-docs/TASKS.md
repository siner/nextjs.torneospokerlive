# Gestión de Tareas

## Feature: Mejora de Usabilidad y Estética (Layout, Navegación, Listados)

Mejorar la experiencia de usuario y el diseño visual de la aplicación.

## Completed Tasks

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

## In Progress Tasks

- [ ] Revisar/Mejorar formularios (Login/Registro).
- [ ] Revisión visual y de props para asegurar consistencia entre los tres componentes
- [ ] Añadir comentarios aclaratorios en el código
- [ ] Probar los componentes en diferentes tamaños de pantalla

## Future Tasks

- [ ] Refinar `requirements.md`.
- [ ] Refinar `user-structure.md`.
- [ ] Añadir documentación de componentes/APIs.
- [ ] Funcionalidades para usuarios registrados.
- [ ] Mantener Changelog.
- [ ] Documentar en overview.md la decisión de usar <img> por simplicidad y consistencia

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
- `src/components/layout/navigation.tsx` ✅
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
- `src/components/event/CardEvent.tsx`
- `src/app/casinos/page.tsx` ✅ (Analizado)
- `src/components/casino/CardCasino.tsx` ✅ (Refactorizado)
- `project-docs/TASKS.md` ✅
- `src/app/circuitos/page.tsx` ✅ (Analizado y H1 corregido)
- `src/components/tour/CardTour.tsx` ✅ (Refactorizado, `next/image` actualizado)
- `src/app/page.tsx` ✅ (Fechas en títulos, hideDate en RowTournament)
- `src/app/casinos/[slug]/page.tsx` ✅ (Eventos antes que Torneos)
- `src/lib/api.ts` ✅ (Corregida `getNextEventsByCasino`)
