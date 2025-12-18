# Documentación: Firebase (configuración y uso)

Este documento resume los cambios realizados para integrar Firebase en el proyecto y explica cómo usar la configuración, credenciales locales, Storage y la integración de subida de imágenes desde el formulario de administración.

## Archivos clave añadidos/modificados

- `src/firebase/config.js` — inicializa Firebase, exporta `app`, `analytics`, `db`, `auth`. Prefiere (en orden): `src/firebase/credentials/credentials.js` (local), variables Vite (`import.meta.env.VITE_...`), y valores _fallback_. ([src/firebase/config.js](src/firebase/config.js#L1))
- `src/firebase/storage.js` — helpers `uploadBase64(base64, path)` y `uploadFile(file, path)` que suben a Firebase Storage y devuelven la URL pública. ([src/firebase/storage.js](src/firebase/storage.js#L1))
- `src/firebase/credentials/credentials.js` — archivo local con credenciales (creado y añadido a `.gitignore`). No subir. ([src/firebase/credentials/credentials.js](src/firebase/credentials/credentials.js#L1))
- `src/firebase/credentials/credentials.example.js` — ejemplo de formato.
- `.env.example` — plantilla con variables Vite (`VITE_FIREBASE_*`) para producción/CI.
- `src/components/admin/ProductForm.jsx` — ahora sube la imagen comprimida al guardar usando `uploadBase64`, y envía la URL resultante en el payload.

## Flujo de inicialización (qué hace `config.js`)

1. Construye un objeto `firebaseConfig` usando `import.meta.env.VITE_...` y valores hardcodeados como fallback.
2. Intenta importar dinámicamente `./credentials/credentials.js` (ruta `src/firebase/credentials/credentials.js`).
   - Si existe y exporta `firebaseCredentials`, sus valores sobreescriben el config.
   - Si no existe, sigue con env vars / fallback.
3. Inicializa `app = initializeApp(firebaseConfig)` y exporta `db`, `auth`, y `analytics` (si está disponible en el entorno).

Esto permite desarrollo local cómodo (archivo `credentials.js`) y despliegues seguros mediante variables de entorno.

## Uso de credenciales (recomendado)

- Local: puedes usar `src/firebase/credentials/credentials.js` (ya existe en este repo como archivo local y está en `.gitignore`). Úsalo solo en tu máquina.
- Producción / CI: configura las variables de entorno en el servidor con los nombres de `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. Copia `.env.example` a `.env.local` para desarrollo local si prefieres usar env vars.

## Subida de imágenes (Storage)

- `src/firebase/storage.js` exporta:
  - `uploadBase64(base64Data, path)` — sube `data_url` (resultante de `canvas.toDataURL`) y devuelve la URL.
  - `uploadFile(file, path)` — sube `File`/`Blob` y devuelve la URL.

Ejemplo de uso:

```js
import { uploadBase64 } from '../firebase/storage'
const url = await uploadBase64(dataUrl, `products/${safeName}_${Date.now()}.jpg`)
```

## Integración en `ProductForm.jsx`

- El formulario sigue generando un `preview` comprimido (data URL) con `compressImage` (cliente).
- Al enviar (`Guardar`), si `form.img` es una data URL se hace:
  - `uploadBase64(form.img, path)` → obtiene `imgUrl` (descargable públicamente)
  - Sustituye `form.img` por `imgUrl` en el payload que se pasa a `onSave(payload)`.

Esto asegura que las imágenes subidas por el admin queden almacenadas en Firebase Storage y los productos guarden la URL accesible.

## Seguridad y buenas prácticas

- Nunca subir `src/firebase/credentials/credentials.js` ni archivos `.env` con secretos al repositorio.
- En entornos públicos/producción, usa variables de entorno en el proveedor (Vercel, Netlify, Docker, etc.).
- Revisa las reglas de Firestore y Storage en Firebase Console para permitir solo las operaciones que desees (por ejemplo, bloquear escritura desde clientes si no hay auth).
- Para operaciones sensibles (creación/edición masiva), considera usar Cloud Functions con permisos restringidos.

## Pruebas rápidas

1. Ejecuta la app: `npm run dev`.
2. Ve a `/admin` → Nuevo Producto → sube imagen → Guardar.
3. Confirma en Firebase Console → Storage que el archivo existe y en Firestore (o el almacenamiento de productos actual) que `img` contiene la URL.

## ✅ Implementación de Firestore (COMPLETADA)

La aplicación ahora usa **Firestore** para persistencia en la nube en lugar de localStorage.

### Archivos implementados:

- `src/firebase/firestore.js` — helpers para operaciones CRUD en Firestore ([firestore.js](src/firebase/firestore.js))
- `src/utils/migrateToFirestore.js` — utilidad para migrar datos de localStorage ([migrateToFirestore.js](src/utils/migrateToFirestore.js))
- Contextos actualizados: `ProductContext`, `WoodProductContext`, `RawMaterialsContext` — ahora usan Firestore con sincronización en tiempo real

### Colecciones en Firestore:

- `products` — Productos de vidrio
- `woodProducts` — Productos de madera  
- `rawMaterials` — Materias primas

### Funcionalidades:

✅ **Sincronización en tiempo real** — Los cambios en Firestore se reflejan automáticamente en la UI  
✅ **Migración automática** — Los datos de localStorage se migran automáticamente la primera vez  
✅ **Estado de carga** — Cada contexto expone `loading` y `error` para manejar estados  
✅ **Operaciones CRUD** — Todas las operaciones (crear, leer, actualizar, eliminar) funcionan con Firestore  

### Configuración requerida:

⚠️ **IMPORTANTE**: Debes configurar las reglas de seguridad en Firebase Console para que funcione. Ver [FIRESTORE_RULES.md](src/firebase/FIRESTORE_RULES.md) para instrucciones.

## Posibles mejoras (siguientes pasos)

- ~~Implementar Firestore para persistencia~~ ✅ **COMPLETADO**
- Mostrar barra de progreso durante la subida (usar `uploadBytesResumable`)
- Implementar Firebase Authentication (reemplazar login básico actual)
- Manejo de errores visibles en UI y reintentos
- Optimizar compresión en web worker si el rendimiento es un problema

---

**Última actualización:** Diciembre 2024 — Firestore implementado