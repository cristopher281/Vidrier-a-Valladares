# Configuración de Reglas de Seguridad de Firestore

Este archivo contiene las reglas de seguridad que debes configurar en Firebase Console para que la aplicación funcione correctamente con Firestore.

## ⚠️ Importante

Antes de poder usar la aplicación, **DEBES configurar estas reglas en Firebase Console**. De lo contrario, las operaciones de lectura/escritura fallarán.

---

## 📋 Pasos para Configurar las Reglas

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **vidrieria-d59d3**
3. En el menú lateral, ve a **Build** → **Firestore Database**
4. Haz clic en la pestaña **Rules** (Reglas)
5. Copia y pega las reglas de abajo
6. Haz clic en **Publish** (Publicar)

---

## 🔒 Reglas Recomendadas para Producción

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Productos de vidrio - lectura pública, escritura solo autenticados
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Productos de madera - lectura pública, escritura solo autenticados
    match /woodProducts/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Materias primas - lectura pública, escritura solo autenticados
    match /rawMaterials/{materialId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Explicación:
- **`allow read: if true`** → Cualquier usuario puede ver los productos (necesario para el catálogo público)
- **`allow write: if request.auth != null`** → Solo usuarios autenticados pueden crear/editar/eliminar

> [!IMPORTANT]
> Para que la escritura funcione, deberás implementar Firebase Authentication.
> Actualmente la app usa autenticación básica con localStorage.

---

## 🚧 Reglas para Desarrollo (Temporales)

Si quieres probar la aplicación SIN configurar Firebase Auth, puedes usar estas reglas **SOLO PARA DESARROLLO**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ⚠️ ADVERTENCIA: Permite lectura y escritura a TODOS
    // SOLO USAR EN DESARROLLO - NUNCA EN PRODUCCIÓN
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> [!WARNING]
> **NUNCA uses estas reglas en producción**. Permiten que cualquier persona pueda modificar o eliminar datos.
> Úsalas solo durante el desarrollo y pruebas locales.

---

## 🔐 Reglas para Producción con Firebase Auth

Cuando implementes Firebase Authentication, usa estas reglas más restrictivas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Función helper para verificar si el usuario es admin
    function isAdmin() {
      return request.auth != null && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Productos de vidrio
    match /products/{productId} {
      allow read: if true;  // Lectura pública
      allow create, update, delete: if isAdmin();  // Solo admins
    }
    
    // Productos de madera
    match /woodProducts/{productId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Materias primas
    match /rawMaterials/{materialId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }
    
    // Colección de usuarios (necesaria para verificar roles)
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 📊 Estructura de Colecciones en Firestore

Después de configurar las reglas, tu Firestore tendrá estas colecciones:

### `products` (Productos de Vidrio)
```json
{
  "name": "Vidrio templado 8mm",
  "category": "Vidrio templado",
  "price": 120,
  "stock": 25,
  "img": "https://firebasestorage.googleapis.com/...",
  "description": "Vidrio templado de alta resistencia.",
  "featured": true
}
```

### `woodProducts` (Productos de Madera)
```json
{
  "name": "Puerta Principal de Caoba",
  "category": "Puertas",
  "price": 4500,
  "stock": 8,
  "img": "https://firebasestorage.googleapis.com/...",
  "description": "Puerta de madera de caoba maciza...",
  "featured": false
}
```

### `rawMaterials` (Materias Primas)
```json
{
  "name": "Vidrio templado 6mm",
  "category": "Vidrio",
  "quantity": 50,
  "unit": "láminas",
  "minStock": 20,
  "description": "Láminas de vidrio templado..."
}
```

---

## ✅ Verificación

Después de configurar las reglas:

1. Ejecuta la aplicación: `npm run dev`
2. Navega a `/admin`
3. Intenta crear un producto nuevo
4. Verifica en Firebase Console → Firestore que el documento se creó correctamente

---

## 🆘 Troubleshooting

### Error: "Missing or insufficient permissions"
**Solución:** Verifica que hayas publicado las reglas correctamente en Firebase Console.

### Error: "PERMISSION_DENIED"
**Solución:** 
- Para desarrollo: Usa las reglas temporales de desarrollo
- Para producción: Implementa Firebase Authentication

### Los datos no se sincronizan
**Solución:** Abre la consola del navegador (F12) y busca errores. Asegúrate de tener conexión a internet.

---

**Última actualización:** Diciembre 2024
