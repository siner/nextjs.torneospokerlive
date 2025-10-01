# Especificaciones Técnicas

## Pila Tecnológica

- **Framework Principal:** Next.js (~14.2)
- **Lenguaje:** TypeScript (~5)
- **UI:** React (~18), Shadcn/ui (Radix UI + Tailwind CSS), Lucide Icons
- **Estilos:** Tailwind CSS (~3.3), `tailwind-merge`, `clsx`, `tailwindcss-animate`
- **Backend & Base de Datos:** Supabase (Auth, SSR Helpers, JS Client)
- **Manejo de Tablas:** TanStack Table (~8.15)
- **Manejo de Fechas:** `date-fns`, `react-day-picker`
- **Componentes UI:** `cmdk` (Command Menu), Varios componentes de Radix UI
- **Monitoreo de Errores:** Sentry
- **Envío de Emails:** Resend
- **Procesamiento Markdown:** `remark`, `remark-html`
- **Linting:** ESLint (con config de Next.js)
- **Hosting (probable):** Vercel

## Métodos de Desarrollo

- Desarrollo individual.
- Se utiliza el flujo de trabajo **Gitflow** para la gestión de ramas y versiones.

## Estándares de Codificación

- Se siguen los estándares definidos por la configuración de ESLint (`eslint-config-next`) y Prettier (si está configurado).
- _(Considerar añadir guías de estilo específicas si es necesario)._

## Diseño de Base de Datos

- **Proveedor:** Supabase (PostgreSQL).
- **Esquemas Principales:**
  - `public`: Contiene las tablas específicas de la aplicación.
  - `auth`: Gestiona la autenticación y usuarios (propio de Supabase Auth).
  - `storage`: Gestiona el almacenamiento de archivos (propio de Supabase Storage, si se usa).
- **Tablas Principales (Esquema `public`):**
  - `Casino`: Información sobre los casinos (nombre, slug, logo, contenido, etc.).
  - `Tour`: Información sobre los circuitos (nombre, slug, logo).
  - `Event`: Información sobre los eventos (nombre, slug, fechas, `tourId`, `casinoId`).
  - `Tournament`: Información sobre los torneos (nombre, slug, fecha, hora, buyin, fee, `casinoId`, `eventId`, etc.).
  - `user`: Tabla de perfiles de usuario (nombre, username, rol, avatar, etc.). Vinculada a `auth.users`.
  - `casino_stars`: Tabla de relación para los casinos favoritos de los usuarios (vincula `user.id` y `Casino.id`).
  - **Tablas para Noticias:**
    - `blog_posts`: Contenido de los artículos (título, slug, contenido, fecha, `author_id`, etc.).
    - `blog_categories`: Categorías para los posts (nombre, slug).
    - `blog_tags`: Etiquetas para los posts (nombre, slug).
    - `blog_post_categories`: Tabla de relación N:M entre `blog_posts` y `blog_categories`.
    - `blog_post_tags`: Tabla de relación N:M entre `blog_posts` y `blog_tags`.
    - `blog_comments`: Comentarios de los posts (contenido, fecha, `post_id`, `user_id`).

_(Nota: Esto se basa en los nombres de las tablas. Se pueden añadir detalles de columnas y relaciones si es necesario)._

## APIs/Funciones Backend Requeridas (Supabase Queries)

- `getPosts(page, limit, category?, tag?)`: Obtiene lista paginada de posts, opcionalmente filtrada.
- `getPostBySlug(slug)`: Obtiene un post específico por su slug, incluyendo autor, categorías, tags.
- `getCategories()`: Obtiene la lista de todas las categorías.
- `getTags()`: Obtiene la lista de todas las tags.
- `getCommentsByPostId(postId)`: Obtiene los comentarios para un post específico.
- _(Futuro)_ `createComment(postId, content, userId)`: Añade un nuevo comentario.
