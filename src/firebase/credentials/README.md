# Credenciales de Firebase

Este directorio contiene ejemplos y recomendaciones para manejar las credenciales de Firebase.

Nunca guardes credenciales secretas en el repositorio público. Para Vite (proyecto actual) usa variables de entorno con el prefijo `VITE_`.

Pasos recomendados:

1. Crea un archivo local `.env` o `.env.local` en la raíz del proyecto (no lo subas al repo).
2. Añade las variables usando el prefijo `VITE_`, por ejemplo:

   VITE_FIREBASE_API_KEY=tu_api_key_aqui
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id

3. Reinicia el servidor de desarrollo (`npm run dev`).

Si prefieres, puedes copiar `credentials.example.js` y crear un `credentials.js` local (asegúrate de añadirlo a `.gitignore`).
