# Requisitos y Características

## Requisitos del Sistema

- Aplicación web accesible desde navegadores modernos (desktop y móvil).
- Capacidad para manejar un número creciente de casinos, circuitos, eventos y torneos.
- Sistema de autenticación seguro para usuarios registrados.

## Descripción de Características

- **Consulta Pública de Información:**
  - Listado y vista detallada de Casinos.
  - Listado y vista detallada de Circuitos.
  - Listado y vista detallada de Eventos.
  - Listado y vista detallada de Torneos.
  - Funcionalidad de búsqueda/filtrado para encontrar entidades específicas.
- **Autenticación de Usuarios:**
  - Registro de nuevos usuarios.
  - Inicio de sesión (Login).
  - Cierre de sesión (Logout).
  - Recuperación de contraseña (Forgot Password).
- **Funcionalidad para Usuarios Registrados:**
  - Marcar/Guardar Casinos como favoritos.
  - Ver lista de casinos favoritos.
  - _(Futuro)_: Expandir funcionalidades (ej: guardar torneos favoritos, notificaciones, etc.).

## Reglas de Negocio

- Un **Evento** pertenece a un **Circuito** y agrupa varios **Torneos** que se juegan en un **Casino** específico durante un periodo de días.
- Toda la información del directorio (casinos, circuitos, eventos, torneos) es de acceso público y no requiere registro.
- El registro es necesario únicamente para acceder a funcionalidades personalizadas (actualmente, guardar casinos favoritos).

## Casos Límite

- _(Pendiente de definir a medida que se desarrolla y prueba)_
