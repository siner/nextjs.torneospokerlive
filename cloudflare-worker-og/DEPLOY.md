# Guía de Despliegue - OG Image Worker

## Paso 1: Instalar dependencias

```bash
cd cloudflare-worker-og
npm install
```

## Paso 2: Autenticación Cloudflare

Si no lo has hecho antes:

```bash
npx wrangler login
```

Esto abrirá tu navegador para autenticarte con tu cuenta de Cloudflare.

## Paso 3: Desplegar el Worker

```bash
npm run deploy
```

Al finalizar verás algo como:

```
✨ Success! Uploaded to Cloudflare
 ⛅️ https://torneospokerlive-og.TU-SUBDOMAIN.workers.dev
```

**Anota esa URL**, la necesitarás en el siguiente paso.

## Paso 4: Configurar variable de entorno en Next.js

1. Crea o edita `.env.local` en la raíz del proyecto Next.js:

```bash
OG_WORKER_URL=https://torneospokerlive-og.edgefranmoreno.workers.dev
```

2. Actualiza también en tu plataforma de hosting (Cloudflare Pages, Vercel, etc.)

## Paso 5: Actualizar `og-image.ts`

✅ **Ya configurado** - El archivo `src/lib/og-image.ts` ya tiene la URL correcta:

```typescript
const OG_WORKER_URL =
  process.env.OG_WORKER_URL ||
  "https://torneospokerlive-og.edgefranmoreno.workers.dev";
```

## Paso 6: Rebuild y redeploy Next.js

```bash
npm run build
```

Y despliega en tu plataforma.

## Verificación

Prueba una URL manualmente:

```
https://torneospokerlive-og.edgefranmoreno.workers.dev/?type=casino&name=Gran%20V%C3%ADa&logo=https://cdn.torneospokerlive.com/logos/granvia.png&color=%23000000&subtitle=Torneos%20Poker%20Live
```

Deberías ver un SVG con el diseño de la imagen OG.

## Testing con Open Graph Debuggers

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Pega una URL de tu sitio (ej: `https://www.torneospokerlive.com/casinos/gran-via-madrid`) y verifica que la imagen se genera correctamente.

## Notas

- El worker usa SVG por simplicidad y compatibilidad
- Para PNG necesitas añadir `resvg-wasm` (más complejo)
- Las imágenes se cachean con max-age=1 año
- El worker es gratis hasta 100,000 requests/día en el plan gratuito de Cloudflare

## Troubleshooting

**Error: "Worker not found"**

- Verifica que el despliegue fue exitoso
- Confirma la URL del worker

**Imágenes no se ven en redes sociales**

- Limpia la caché en los debuggers de FB/Twitter
- Verifica que el logo sea accesible públicamente
- Revisa que los colores estén en formato hex correcto
