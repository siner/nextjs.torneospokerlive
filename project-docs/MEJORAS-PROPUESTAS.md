# Mejoras Propuestas para Torneos Poker Live

## 🚀 Mejoras de Alta Prioridad

### 1. **Favoritos de Torneos** (Usuario Registrado)

**Descripción:** Permitir marcar torneos específicos como favoritos, igual que con casinos.

**Beneficios:**

- Los usuarios pueden seguir torneos específicos que les interesan
- Recibir recordatorios antes del inicio
- Vista personalizada de "Mis Torneos"

**Implementación:**

- Tabla `user_favorite_tournament` en base de datos
- Componente `TournamentStar` similar a `CasinoStar`
- Filtro en `/torneos?mytournaments=true`
- Página `/ajustes/mis-torneos`

**Estimación:** 2-3 horas

---

### 2. **Favoritos de Eventos y Circuitos** (Usuario Registrado)

**Descripción:** Extender el sistema de favoritos a eventos y circuitos.

**Beneficios:**

- Seguimiento completo del ecosistema de poker
- Vista unificada de todo lo que sigue el usuario
- Mejor experiencia de usuario registrado

**Implementación:**

- Tablas `user_favorite_event` y `user_favorite_tour`
- Componentes `EventStar` y `TourStar`
- Páginas `/ajustes/mis-eventos` y `/ajustes/mis-circuitos`

**Estimación:** 3-4 horas

---

### 3. **Sistema de Notificaciones** (Usuario Registrado)

**Descripción:** Notificar a usuarios sobre:

- Torneos favoritos que empiezan pronto
- Nuevos torneos en casinos favoritos
- Nuevos eventos en circuitos favoritos

**Beneficios:**

- Engagement del usuario
- Valor añadido claro para registro
- Fidelización

**Implementación Fase 1 (In-App):**

- Tabla `notifications` en base de datos
- Componente `NotificationBell` en header
- Página `/notificaciones`
- Sistema de generación automática de notificaciones

**Implementación Fase 2 (Email):**

- Integración con servicio de email (Resend, SendGrid)
- Preferencias de notificaciones en perfil
- Templates de emails

**Estimación:**

- Fase 1: 4-5 horas
- Fase 2: 3-4 horas adicionales

---

### 4. **Filtrado y Búsqueda Avanzada** (Todos los usuarios)

**Descripción:** Mejorar la búsqueda actual con filtros avanzados.

**Torneos:**

- Por rango de buy-in
- Por tipo (Freezeout, Rebuy, Knockout)
- Por fecha/rango de fechas
- Por garantizado

**Eventos:**

- Por duración
- Por buy-in promedio
- Por circuito

**Casinos:**

- Por ubicación/provincia
- Por servicios disponibles

**Beneficios:**

- Mejor experiencia de búsqueda
- Usuarios encuentran lo que buscan más rápido
- Útil tanto para anónimos como registrados

**Implementación:**

- Componente `AdvancedFilters` reutilizable
- Query params para filtros
- Persistencia de filtros en localStorage

**Estimación:** 4-5 horas

---

### 5. **Comentarios en Noticias** (Usuario Registrado)

**Descripción:** Permitir a usuarios registrados comentar en noticias.

**Beneficios:**

- Comunidad más activa
- Feedback directo
- Más razones para registrarse

**Implementación:**

- Ya existe modelo de comentarios en DB
- Componente `CommentForm` para añadir comentarios
- Sistema de moderación básico
- Editar/eliminar propios comentarios

**Estimación:** 3-4 horas

---

## 🔄 Mejoras de Media Prioridad

### 6. **Dashboard de Usuario** (Usuario Registrado)

**Descripción:** Página principal personalizada tras login con:

- Próximos torneos en casinos favoritos
- Torneos favoritos próximos
- Eventos activos en circuitos favoritos
- Resumen de actividad

**Beneficios:**

- Vista centralizada personalizada
- Mejor retención de usuarios
- Experiencia más pro

**Implementación:**

- Ruta `/dashboard` o modificar `/ajustes`
- Componentes de resumen
- Queries optimizadas

**Estimación:** 4-5 horas

---

### 7. **Compartir en Redes Sociales** (Todos los usuarios)

**Descripción:** Botones para compartir:

- Torneos específicos
- Eventos
- Noticias

**Beneficios:**

- Marketing orgánico
- Más tráfico
- Visibilidad

**Implementación:**

- Componente `ShareButtons`
- Integración con Twitter, Facebook, WhatsApp
- Ya tienen buenos OG images!

**Estimación:** 2-3 horas

---

### 8. **Calendario Personalizado Descargable** (Usuario Registrado)

**Descripción:** Exportar calendario de torneos a Google Calendar, iCal, etc.

**Beneficios:**

- Utilidad muy práctica
- Feature diferenciador
- Valor premium

**Implementación:**

- Generación de archivos .ics
- Botón "Añadir a mi calendario" en torneos
- Export masivo de torneos favoritos

**Estimación:** 3-4 horas

---

## 💡 Mejoras de Baja Prioridad (Quick Wins)

### 9. **Estadísticas Públicas**

- Torneos más populares
- Casinos con más actividad
- Gráficos de tendencias

**Estimación:** 2-3 horas

### 10. **Histórico de Torneos**

- Ver torneos pasados
- Estadísticas históricas
- Resultados (si disponibles)

**Estimación:** 2-3 horas

### 11. **Modo Oscuro**

- Toggle en settings
- Persistencia de preferencia

**Estimación:** 1-2 horas

### 12. **PWA - Progressive Web App**

- Instalable en móvil
- Funciona offline (básico)
- Notificaciones push

**Estimación:** 3-4 horas

---

## 📋 Orden Sugerido de Implementación

**Sprint 1 - Favoritos Completos:**

1. Favoritos de Torneos
2. Favoritos de Eventos y Circuitos
3. Dashboard de Usuario

**Sprint 2 - Engagement:** 4. Notificaciones (Fase 1 - In-App) 5. Comentarios en Noticias 6. Compartir en RRSS

**Sprint 3 - Búsqueda y Utilidades:** 7. Filtrado Avanzado 8. Calendario Descargable 9. Notificaciones (Fase 2 - Email)

**Sprint 4 - Extras:** 10. Estadísticas Públicas 11. Histórico de Torneos 12. Modo Oscuro / PWA

---

## ⚡ Quick Win Inmediato (30 min)

**Mejorar página de perfil actual:**

- Añadir estadísticas: cuántos casinos tiene favoritos
- Último acceso
- Mejorar diseño de `/ajustes`
