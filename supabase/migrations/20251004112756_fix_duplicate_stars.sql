-- Migración para arreglar duplicados en tablas de favoritos y añadir constraints

-- ========================================
-- PARTE 1: Limpiar duplicados en casino_stars
-- ========================================

-- Eliminar duplicados manteniendo solo el registro más reciente de cada combinación user_id + casino_id
DELETE FROM public.casino_stars
WHERE id NOT IN (
    SELECT MAX(id)
    FROM public.casino_stars
    GROUP BY user_id, casino_id
);

-- Añadir constraint UNIQUE a casino_stars si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_user_casino'
    ) THEN
        ALTER TABLE public.casino_stars
        ADD CONSTRAINT unique_user_casino UNIQUE (user_id, casino_id);
    END IF;
END $$;

-- ========================================
-- PARTE 2: Limpiar duplicados en tournament_stars (por si acaso)
-- ========================================

-- Eliminar duplicados manteniendo solo el registro más reciente de cada combinación user_id + tournament_id
DELETE FROM public.tournament_stars
WHERE id NOT IN (
    SELECT MAX(id)
    FROM public.tournament_stars
    GROUP BY user_id, tournament_id
);

-- Verificar que existe la constraint UNIQUE en tournament_stars
-- (Debería existir de la migración 20251004110741_create_tournament_stars.sql)
-- Si no existe, crearla
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_user_tournament'
    ) THEN
        ALTER TABLE public.tournament_stars
        ADD CONSTRAINT unique_user_tournament UNIQUE (user_id, tournament_id);
    END IF;
END $$;

-- ========================================
-- PARTE 3: Crear índices para mejorar rendimiento (si no existen)
-- ========================================

-- Índices para casino_stars
CREATE INDEX IF NOT EXISTS idx_casino_stars_user_id_casino_id 
    ON public.casino_stars(user_id, casino_id);

CREATE INDEX IF NOT EXISTS idx_casino_stars_created_at 
    ON public.casino_stars(created_at DESC);

-- Índices para tournament_stars (algunos pueden existir ya)
CREATE INDEX IF NOT EXISTS idx_tournament_stars_user_id_tournament_id 
    ON public.tournament_stars(user_id, tournament_id);

-- Comentarios
COMMENT ON CONSTRAINT unique_user_casino ON public.casino_stars 
    IS 'Evita que un usuario marque el mismo casino como favorito múltiples veces';

COMMENT ON CONSTRAINT unique_user_tournament ON public.tournament_stars 
    IS 'Evita que un usuario marque el mismo torneo como favorito múltiples veces';

-- Verificación final
DO $$
DECLARE
    casino_dupes INTEGER;
    tournament_dupes INTEGER;
BEGIN
    -- Contar duplicados restantes en casino_stars
    SELECT COUNT(*) INTO casino_dupes
    FROM (
        SELECT user_id, casino_id, COUNT(*) as cnt
        FROM public.casino_stars
        GROUP BY user_id, casino_id
        HAVING COUNT(*) > 1
    ) AS dupes;
    
    -- Contar duplicados restantes en tournament_stars
    SELECT COUNT(*) INTO tournament_dupes
    FROM (
        SELECT user_id, tournament_id, COUNT(*) as cnt
        FROM public.tournament_stars
        GROUP BY user_id, tournament_id
        HAVING COUNT(*) > 1
    ) AS dupes;
    
    IF casino_dupes > 0 OR tournament_dupes > 0 THEN
        RAISE WARNING 'Todavía existen duplicados: casino_stars=%, tournament_stars=%', casino_dupes, tournament_dupes;
    ELSE
        RAISE NOTICE 'Migración completada exitosamente. No hay duplicados.';
    END IF;
END $$;
