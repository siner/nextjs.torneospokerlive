-- Script completo para arreglar permisos de tournament_stars
-- Ejecutar todo de una vez en el SQL Editor de Supabase

-- PASO 1: Deshabilitar temporalmente RLS para limpieza
ALTER TABLE public.tournament_stars DISABLE ROW LEVEL SECURITY;

-- PASO 2: Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Users can view their own favorite tournaments" ON public.tournament_stars;
DROP POLICY IF EXISTS "Users can insert their own favorite tournaments" ON public.tournament_stars;
DROP POLICY IF EXISTS "Users can delete their own favorite tournaments" ON public.tournament_stars;
DROP POLICY IF EXISTS "Authenticated users can view tournament_stars" ON public.tournament_stars;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.tournament_stars;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.tournament_stars;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.tournament_stars;

-- PASO 3: Volver a habilitar RLS
ALTER TABLE public.tournament_stars ENABLE ROW LEVEL SECURITY;

-- PASO 4: Crear nuevas políticas con nombres únicos

-- Política de lectura: Permitir a todos los usuarios autenticados leer
-- (necesario para JOINs en queries de Supabase)
CREATE POLICY "tournament_stars_select_authenticated"
    ON public.tournament_stars
    FOR SELECT
    TO authenticated
    USING (true);

-- Política de inserción: Solo pueden insertar si el user_id coincide con el usuario autenticado
CREATE POLICY "tournament_stars_insert_own"
    ON public.tournament_stars
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Política de eliminación: Solo pueden eliminar sus propios registros
CREATE POLICY "tournament_stars_delete_own"
    ON public.tournament_stars
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- PASO 5: Verificar que se crearon correctamente
-- (Descomentar para ver el resultado en el SQL Editor)
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE tablename = 'tournament_stars';

-- PASO 6: Otorgar permisos explícitos a usuarios autenticados
GRANT SELECT, INSERT, DELETE ON public.tournament_stars TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.tournament_stars_id_seq TO authenticated;

-- PASO 7: Verificar la estructura de la tabla
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'tournament_stars'
-- ORDER BY ordinal_position;

