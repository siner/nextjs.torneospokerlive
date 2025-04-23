# Gestión de Tareas

## Feature: Mejora de Usabilidad y Estética (Layout y Navegación)

Mejorar la experiencia de usuario y el diseño visual de la aplicación, aplicando un layout centrado consistente y mejorando la navegación.

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

## In Progress Tasks

- [ ] Evaluar y mejorar otros aspectos estéticos de la aplicación (ej: páginas de listado/detalle).
- [ ] Implementar mejoras estéticas identificadas.

## Future Tasks

- [ ] Refinar `requirements.md`.
- [ ] Refinar `user-structure.md`.
- [ ] Añadir documentación de componentes/APIs.
- [ ] Funcionalidades para usuarios registrados.
- [ ] Mantener Changelog.

## Implementation Plan

1.  **Análisis y Discusión:** Identificar puntos débiles UI/UX. ✅ (Navegación, Header, Footer, Layout)
2.  **Propuesta:** Sugerir cambios. ✅ (Refactorizar Nav, Espaciado, Iconos, Footer, Logo, Layout Centrado, Estética Nav)
3.  **Implementación Iterativa:** Aplicar cambios. ✅ (Nav, Header, Footer, Layout, Estética Nav)
4.  **Revisión:** Validar mejoras. ⏳ (Pendiente revisión y siguientes pasos)

### Relevant Files

- `src/components/layout/header.tsx` ✅
- `src/components/layout/navigation.tsx` ✅
- `src/components/layout/footer.tsx` ✅
- `src/app/layout.tsx` ✅
- `src/app/globals.css`
- `src/components/`
- `src/app/**/page.tsx`
- `tailwind.config.ts`
- `project-docs/TASKS.md` ✅
