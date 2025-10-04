# Migraciones de Base de Datos

Este directorio contiene todas las migraciones SQL para Supabase, organizadas cronológicamente.

## 📋 Convención de Nombres

Las migraciones siguen el formato:

```
YYYYMMDDHHMMSS_descripcion_de_la_migracion.sql
```

Ejemplo: `20251004110741_create_tournament_stars.sql`

## 🚀 Cómo Ejecutar Migraciones

### Opción 1: Supabase Dashboard (Recomendado para producción)

1. Ve a tu proyecto en https://supabase.com
2. Navega a **SQL Editor** en el menú lateral
3. Clic en **New query**
4. Copia y pega el contenido del archivo de migración
5. Clic en **Run** (esquina inferior derecha)
6. Verifica que se ejecutó correctamente

### Opción 2: Supabase CLI

```bash
# Aplicar todas las migraciones pendientes
npx supabase db push

# O aplicar una migración específica
npx supabase db execute --file supabase/migrations/NOMBRE_DE_ARCHIVO.sql
```

### Opción 3: Script automatizado

```bash
# Ejecutar todas las migraciones en orden
for file in supabase/migrations/*.sql; do
    echo "Ejecutando: $file"
    npx supabase db execute --file "$file"
done
```

## 📝 Crear Nueva Migración

Para crear una nueva migración, usa este template:

```bash
# Generar timestamp automático
TIMESTAMP=$(date +"%Y%m%d%H%M%S")
FILENAME="supabase/migrations/${TIMESTAMP}_nombre_descriptivo.sql"

# Crear archivo
cat > $FILENAME << 'EOF'
-- Migration: Título descriptivo
-- Description: Descripción detallada de lo que hace esta migración
-- Date: YYYY-MM-DD
-- Author: Tu nombre

-- Tu SQL aquí
EOF
```

O simplemente copia este comando:

```bash
touch supabase/migrations/$(date +"%Y%m%d%H%M%S")_nombre_descriptivo.sql
```

## 📚 Lista de Migraciones

| Fecha      | Archivo                                      | Descripción                                           |
| ---------- | -------------------------------------------- | ----------------------------------------------------- |
| 2025-10-04 | `20251004110741_create_tournament_stars.sql` | Crea tabla tournament_stars para favoritos de torneos |

## ✅ Checklist de Migración

Antes de crear una migración, verifica:

- [ ] La migración es **idempotente** (puede ejecutarse múltiples veces sin errores)
- [ ] Usa `IF EXISTS` / `IF NOT EXISTS` donde sea apropiado
- [ ] Incluye comentarios explicativos
- [ ] Define políticas de RLS si crea tablas nuevas
- [ ] Crea índices necesarios para performance
- [ ] Otorga permisos adecuados con `GRANT`
- [ ] Incluye header con descripción y fecha
- [ ] Testea en desarrollo antes de aplicar en producción

## 🔄 Rollback

Para hacer rollback de una migración, crea una nueva migración que deshaga los cambios:

```sql
-- Migration: Rollback create_tournament_stars
-- Description: Elimina la tabla tournament_stars
-- Date: YYYY-MM-DD

DROP TABLE IF EXISTS public.tournament_stars CASCADE;
```

## 📖 Mejores Prácticas

1. **Una migración por feature/cambio**: Mantén las migraciones pequeñas y enfocadas
2. **No modifiques migraciones aplicadas**: Siempre crea una nueva migración para cambios
3. **Usa transacciones cuando sea posible**: Envuelve cambios relacionados en transacciones
4. **Documenta bien**: Incluye comentarios explicando el "por qué", no solo el "qué"
5. **Testea en desarrollo primero**: Siempre prueba migraciones en un entorno de desarrollo
6. **Backups**: Haz backup antes de ejecutar migraciones en producción

## 🔗 Recursos

- [Supabase Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
