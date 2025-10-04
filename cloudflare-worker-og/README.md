# Torneos Poker Live - OG Image Generator Worker

Cloudflare Worker que genera imágenes Open Graph dinámicas con fondos de color personalizados.

## Instalación

```bash
cd cloudflare-worker-og
npm install
```

## Desarrollo local

```bash
npm run dev
```

El worker estará disponible en `http://localhost:8787`

## Despliegue

```bash
npm run deploy
```

Esto desplegará el worker en Cloudflare.

✅ **Worker desplegado en:** `https://torneospokerlive-og.edgefranmoreno.workers.dev`

## Uso

### Parámetros de Query String

- `name`: Nombre del casino/torneo/evento (requerido)
- `logo`: URL del logo (opcional)
- `color`: Color de fondo en hex (ej: `%23ffffff` para #ffffff)
- `subtitle`: Texto adicional (buy-in, fechas, etc)
- `type`: Tipo de imagen (`casino`, `torneo`, `evento`, `circuito`)

### Ejemplos de URL

**Casino:**

```
https://torneospokerlive-og.edgefranmoreno.workers.dev/?type=casino&name=Casino%20Gran%20V%C3%ADa&logo=https://cdn.torneospokerlive.com/logos/granvia.png&color=%23000000&subtitle=Torneos%20Poker%20Live
```

**Torneo:**

```
https://torneospokerlive-og.edgefranmoreno.workers.dev/?type=torneo&name=Bounty%20Especial&logo=https://cdn.torneospokerlive.com/logos/granvia.png&color=%231a1a1a&subtitle=150%E2%82%AC
```

**Evento:**

```
https://torneospokerlive-og.edgefranmoreno.workers.dev/?type=evento&name=Madrid%20Poker%20Festival&logo=https://cdn.torneospokerlive.com/logos/mpf.png&color=%23ffffff&subtitle=15-20%20Oct%202024
```

## Actualizar Next.js

Después del despliegue, actualiza las URLs en los metadatos de Next.js para apuntar a tu worker.

## Notas

- El worker genera SVG por simplicidad
- Carga automáticamente la fuente **Inter** desde Google Fonts (se cachea en memoria)
- Para PNG usa `resvg-wasm` (requiere configuración adicional)
- Las imágenes se cachean por 1 año
- Compatible con Facebook, Twitter, WhatsApp, etc.
- El worker es gratis hasta 100,000 requests/día en el plan gratuito de Cloudflare
