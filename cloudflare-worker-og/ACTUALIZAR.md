# Actualización Worker OpenGraph - Twitter Cards

## Cambios realizados

Se ha actualizado el Cloudflare Worker para generar **imágenes PNG** en lugar de SVG, ya que Twitter no soporta SVG para las Twitter Cards.

### Archivos modificados:

1. **package.json** - Añadida dependencia `@resvg/resvg-wasm`
2. **src/index.ts** - Implementada conversión SVG → PNG
3. **wrangler.toml** - Añadida configuración para módulos WASM

### Metadatos mejorados en NextJS:

Se han actualizado los metadatos de Twitter Cards en:

- `/eventos/[slug]` - Descripción corta optimizada
- `/torneos/[slug]` - Descripción corta optimizada
- `/casinos/[slug]` - Descripción corta optimizada
- `/circuitos/[slug]` - Descripción corta optimizada

Todos ahora incluyen:

- `site: "@livetorneos"`
- `creator: "@livetorneos"`
- Descripciones cortas (< 200 caracteres)
- Formato de imagen correcto para Twitter

## Desplegar Worker

```bash
cd cloudflare-worker-og
npm run deploy
```

Después del despliegue:

1. Verificar que las imágenes OG se cargan correctamente: `https://og.torneospokerlive.com?name=Test&type=evento`
2. Validar Twitter Cards: https://cards-dev.twitter.com/validator
3. Forzar recarga de caché de Twitter compartiendo una URL actualizada

## Validación

Probar las Twitter Cards en:

- https://cards-dev.twitter.com/validator

Ejemplo de URLs para probar:

- https://www.torneospokerlive.com/eventos/888-noche-de-poker-el-festival-alicante-octubre-2025

## Notas

- Twitter cachea las preview cards agresivamente
- Puede tardar varios minutos en actualizar
- Si no se actualiza, usar el botón "Preview card" del validador de Twitter
