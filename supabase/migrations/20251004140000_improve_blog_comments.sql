-- Migration: Mejorar sistema de comentarios del blog
-- Description: Añadir user_id, updated_at y RLS policies a blog_comments
-- Date: 2025-10-04
-- Author: Fran Moreno

-- 1. Añadir columna user_id (si no existe)
ALTER TABLE public.blog_comments 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Añadir columna updated_at (si no existe)
ALTER TABLE public.blog_comments 
ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT now();

-- 3. Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_comments_user_id ON public.blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON public.blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON public.blog_comments(created_at);

-- 4. Habilitar Row Level Security (RLS)
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

-- 5. Política: Todos pueden ver comentarios (lecturas públicas)
CREATE POLICY IF NOT EXISTS "blog_comments_select_public"
    ON public.blog_comments
    FOR SELECT
    TO public
    USING (true);

-- 6. Política: Usuarios autenticados pueden insertar comentarios
CREATE POLICY IF NOT EXISTS "blog_comments_insert_authenticated"
    ON public.blog_comments
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = user_id OR 
        (user_id IS NULL AND author_name IS NOT NULL)
    );

-- 7. Política: Solo el propietario puede actualizar su comentario
CREATE POLICY IF NOT EXISTS "blog_comments_update_own"
    ON public.blog_comments
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 8. Política: Solo el propietario puede eliminar su comentario
CREATE POLICY IF NOT EXISTS "blog_comments_delete_own"
    ON public.blog_comments
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- 9. Otorgar permisos explícitos
GRANT SELECT ON public.blog_comments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_comments TO authenticated;

-- 10. Crear función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION public.update_blog_comments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 11. Crear trigger para updated_at
DROP TRIGGER IF EXISTS trigger_blog_comments_updated_at ON public.blog_comments;
CREATE TRIGGER trigger_blog_comments_updated_at
    BEFORE UPDATE ON public.blog_comments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_blog_comments_updated_at();

-- 12. Comentarios para documentación
COMMENT ON TABLE public.blog_comments IS 'Comentarios de los posts del blog. Soporta usuarios autenticados y anónimos.';
COMMENT ON COLUMN public.blog_comments.user_id IS 'ID del usuario autenticado (null para comentarios anónimos)';
COMMENT ON COLUMN public.blog_comments.author_name IS 'Nombre del autor para comentarios anónimos (null si user_id existe)';
COMMENT ON COLUMN public.blog_comments.updated_at IS 'Fecha y hora de la última actualización del comentario';

