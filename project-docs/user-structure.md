# Flujo de Usuarios y Estructura del Proyecto

## Recorrido del Usuario

**Flujo Principal (Usuario Anónimo):**

1.  El usuario accede a la página principal o una URL específica (ej: `/torneos`).
2.  Navega por las diferentes secciones (Casinos, Circuitos, Eventos, Torneos) usando el menú de navegación.
3.  Utiliza la función de búsqueda/filtrado para encontrar información específica.
4.  Selecciona una entidad (ej: un torneo) para ver su página de detalle.
5.  Consulta la información detallada.

**Flujo Opcional (Usuario Registrado):**

1.  El usuario accede a la página de Login.
2.  Introduce sus credenciales y se autentica.
3.  Navega por la web (como el usuario anónimo).
4.  En la página de detalle de un Casino, hace clic en "Guardar Favorito".
5.  Accede a su perfil o sección de "Favoritos" para ver los casinos guardados.
6.  Puede cerrar sesión.

**(Otros flujos incluyen Registro, Recuperación de Contraseña).**

## Flujo de Datos

**Lectura de Datos (Ej: Ver lista de torneos):**

1.  **Navegador:** El usuario solicita la página `/torneos`.
2.  **Next.js (Servidor):** El Server Component de la ruta `/torneos` se ejecuta.
3.  **Supabase Client (Servidor):** Se realiza una consulta a la base de datos Supabase (PostgreSQL) para obtener la lista de torneos (ej: `SELECT * FROM tournaments`).
4.  **Supabase:** Devuelve los datos solicitados.
5.  **Next.js (Servidor):** Renderiza el HTML de la página con los datos obtenidos.
6.  **Navegador:** Recibe y muestra el HTML.

**Escritura de Datos (Ej: Guardar casino favorito):**

1.  **Navegador:** El usuario (logueado) hace clic en "Guardar Favorito" en la página de un casino.
2.  **Client Component (Navegador):** Se dispara una llamada a una API Route de Next.js (ej: `POST /api/user/favorites/casinos`).
3.  **Next.js (API Route):**
    - Verifica la autenticación del usuario (usando Supabase Auth).
    - Valida la solicitud (ID del casino).
    - **Supabase Client (Servidor):** Ejecuta una consulta para insertar/actualizar la tabla de favoritos del usuario (ej: `INSERT INTO user_favorite_casinos (user_id, casino_id) VALUES (...)`).
4.  **Supabase:** Confirma la operación.
5.  **Next.js (API Route):** Devuelve una respuesta de éxito (o error) al navegador.
6.  **Navegador:** Actualiza la UI para reflejar el cambio (ej: el botón cambia a "Guardado").

## Estructura de Archivos del Proyecto

La estructura principal sigue las convenciones de Next.js con el App Router:

- **`src/`**: Contiene todo el código fuente de la aplicación.
  - **`app/`**: Núcleo de la aplicación (App Router).
    - **`(rutas)/`**: Directorios para las diferentes secciones/rutas:
      - `(auth)`: Rutas relacionadas con autenticación (`login`, `registro`, `forgot-password`, `reset-password`, `auth/callback`, etc.).
      - `torneos/`: Gestión o visualización de torneos.
      - `circuitos/`: Gestión o visualización de circuitos.
      - `eventos/`: Gestión o visualización de eventos.
      - `casinos/`: Gestión o visualización de casinos.
      - `buscar/`: Funcionalidad de búsqueda.
      - `ajustes/`: Configuración de usuario.
      - `contacto/`: Página de contacto.
      - `api/`: Endpoints de la API backend.
      - `noticias/`: Sección de noticias.
        - `[slug]/`: Detalle de un post.
        - `categoria/[slug]/`: Archivo de categoría. _(Futuro)_
        - `tag/[slug]/`: Archivo de tag. _(Futuro)_
    - `layout.tsx`: Layout principal de la aplicación.
    - `page.tsx`: Página de inicio.
    - `globals.css`: Estilos globales.
    - `not-found.tsx`: Página 404 personalizada.
    - `global-error.jsx`: Manejador de errores global.
    - Archivos de metadatos y SEO (`robots.txt`, `sitemap.ts`, `favicon.ico`, etc.).
  - **`components/`**: Componentes React reutilizables (UI, etc.).
    - `ui/`: Probablemente componentes de Shadcn/ui.
    - `(otros)`: Componentes específicos de la aplicación.
  - **`lib/`**: Utilidades, helpers, configuración de clientes (Supabase, etc.), tipos compartidos.
    - `supabase/`: Funciones específicas para interactuar con Supabase (queries, etc.).
- **`public/`**: Archivos estáticos.
- **Archivos de Configuración Raíz**: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `sentry.*.config.ts`, `.eslintrc.json`, `middleware.ts`.

_(Nota: Esta estructura es inferida. Puede requerir refinamiento)_.

**Flujo Usuario - Sección Noticias:**

1. El usuario accede a `/noticias` (a través del menú principal u otro enlace).
2. Ve un listado paginado de posts (mostrando título, extracto, autor, fecha, categorías/tags).
3. _(Opcional)_ El usuario hace clic en una categoría o tag para ir a la página de archivo correspondiente (ej. `/noticias/categoria/[slug]`).
4. El usuario hace clic en el título de un post para ir a la página de detalle (`/noticias/[slug]`).
5. En la página de detalle, lee el contenido completo del post.
6. Ve la sección de comentarios al final del post.
7. _(Opcional, Usuario Registrado)_ Escribe y envía un nuevo comentario.
