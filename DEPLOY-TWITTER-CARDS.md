# Deploy Twitter Cards Fix

## Orden de despliegue

### 1. Desplegar Cloudflare Worker (CRÍTICO)

```bash
cd cloudflare-worker-og
npm run deploy
```

**Validar el worker:**

```bash
curl -I "https://og.torneospokerlive.com?name=Test&type=evento"
```

Debe responder con `Content-Type: image/png` (no `image/svg+xml`)

### 2. Desplegar NextJS

```bash
# Volver al directorio raíz
cd ..

# Build y deploy (según tu pipeline)
npm run build
```

### 3. Validar Twitter Cards

Una vez desplegado todo:

1. **Validador de Twitter:** https://cards-dev.twitter.com/validator
2. **URLs de prueba:**

   - https://www.torneospokerlive.com/eventos/888-noche-de-poker-el-festival-alicante-octubre-2025
   - https://www.torneospokerlive.com/torneos/[cualquier-slug]
   - https://www.torneospokerlive.com/casinos/[cualquier-slug]

3. **Probar compartir en Twitter** para verificar preview

## Notas importantes

⚠️ **Twitter cachea agresivamente las preview cards:**

- Puede tardar 5-10 minutos en actualizar
- Usar el validador de Twitter para forzar recarga
- Si sigue sin funcionar, añadir `?v=2` al final de la URL al compartir

⚠️ **Orden de despliegue importante:**

- Primero el Worker (para que las imágenes sean PNG)
- Luego NextJS (para los metadatos actualizados)

## Verificación rápida

```bash
# Verificar que la imagen es PNG
curl -I "https://og.torneospokerlive.com?name=Test&type=evento&subtitle=Test" | grep "Content-Type"

# Debería mostrar: Content-Type: image/png
```
