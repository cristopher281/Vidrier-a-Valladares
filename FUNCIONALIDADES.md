# Documentación de Funcionalidades - Vidriería Valladares

> **Última actualización:** Diciembre 2024  
> **Versión:** 2.0 con integración Firebase

---

## 📋 Índice

1. [Resumen General](#resumen-general)
2. [Funcionalidades para Usuarios](#funcionalidades-para-usuarios)
3. [Funcionalidades para Administradores](#funcionalidades-para-administradores)
4. [Integración con Firebase](#integración-con-firebase)
5. [Persistencia de Datos](#persistencia-de-datos)
6. [Arquitectura del Sistema](#arquitectura-del-sistema)

---

## Resumen General

**Vidriería Valladares** es una aplicación web moderna para la gestión y exhibición de productos de vidriería y carpintería. La aplicación cuenta con un frontend desarrollado en **React** con **Vite**, integrado con **Firebase** para almacenamiento de imágenes y configuración.

### Tecnologías Utilizadas

- **Frontend**: React 18, React Router DOM
- **Estilos**: CSS personalizado con diseño moderno y responsivo
- **Backend/Servicios**: Firebase (Storage, Firestore, Auth)
- **Persistencia**: Firestore (nube) con sincronización en tiempo real
- **Iconos**: React Icons (Material Design)

---

## Funcionalidades para Usuarios

### 1. **Página Principal (Home)**

#### Componentes Principales:
- **Hero Section**: Banner principal con llamado a la acción
- **Why Choose Us**: Sección de razones para elegir la empresa
- **Featured Products**: Productos destacados de ambas categorías (vidrio y madera)
- **Testimonials**: Testimonios de clientes

#### Funcionalidades:
- ✅ Navegación intuitiva entre secciones
- ✅ Visualización de productos destacados dinámicos
- ✅ Diseño responsive para todos los dispositivos
- ✅ Animaciones y transiciones suaves

---

### 2. **Catálogo de Productos de Vidrio**

**Ruta:** `/catalog`

#### Funcionalidades:
- ✅ **Búsqueda en tiempo real**: Busca por nombre o descripción
- ✅ **Filtrado por categorías**: 
  - Vidrio templado
  - Vidrio laminado
  - Espejos
  - Mamparas
  - Todo
- ✅ **Vista de tarjetas**: Cada producto muestra:
  - Imagen
  - Nombre
  - Precio
  - Stock disponible
  - Categoría
- ✅ **Modal de detalles**: Al hacer clic en un producto se abre un modal con:
  - Imagen ampliada
  - Descripción completa
  - Información de precio y stock
  - Categoría
- ✅ **Contador de resultados**: Muestra cuántos productos coinciden con los filtros

#### Productos de Ejemplo:
- Vidrio templado 8mm
- Espejo 6mm
- Mampara de baño
- Vidrio laminado 10mm

---

### 3. **Catálogo de Productos de Madera**

**Ruta:** `/wood-products`

#### Funcionalidades:
- ✅ **Hero Section temático**: Diseño especial con tema de carpintería
- ✅ **Búsqueda en tiempo real**: Busca por nombre o descripción
- ✅ **Filtrado por categorías específicas**:
  - Puertas
  - Ventanas
  - Escritorios
  - Muebles
  - A Medida
  - Todo
- ✅ **Vista de tarjetas con diseño personalizado**: Tema madera
- ✅ **Modal de detalles**: Información completa del producto
- ✅ **Badges informativos**:
  - Madera de Primera Calidad
  - Diseños Personalizados
  - Instalación Profesional

#### Productos de Ejemplo:
- Puerta Principal de Caoba
- Ventana de Madera Doble Hoja
- Escritorio Ejecutivo
- Librero Modular
- Closet Empotrado
- Mesa de Juntas Personalizada

---

### 4. **Solicitar Presupuesto**

**Ruta:** `/quote`

#### Funcionalidades:
- ✅ **Formulario completo de cotización** con campos:
  - **Información de contacto**:
    - Nombre completo *
    - Teléfono *
    - Email *
  - **Detalles del producto**:
    - Tipo de producto (select con opciones)
    - Dimensiones (ancho x alto en cm)
    - Cantidad *
    - ¿Necesita instalación? *
    - Urgencia (Normal/Urgente/Flexible)
    - Detalles adicionales (textarea)
- ✅ **Validación de campos**: Campos requeridos marcados con *
- ✅ **Mensajes de confirmación**: Retroalimentación visual al enviar
- ✅ **Panel informativo lateral**:
  - Cómo funciona el proceso (3 pasos)
  - Beneficios del servicio
  - Información de contacto directo
- ✅ **Diseño moderno**: Inputs flotantes y layout en grid

---

### 5. **Página de Contacto**

**Ruta:** `/contact`

#### Funcionalidades:
- ✅ **Formulario de contacto** con:
  - Nombre completo
  - Email
  - Teléfono
  - Mensaje
- ✅ **Información de contacto completa**:
  - 📍 **Dirección**: Link directo a Google Maps
  - 📞 **Teléfono**: +505 57079251
  - 📧 **Email**: vallecristopher102@gmail.com
  - ⏰ **Horario**: Lun-Vie 8:00-5:00, Sábados 9:00-4:00
- ✅ **Botón de WhatsApp**: Link directo a chat (+505 81663656)
- ✅ **Mapa integrado**: Google Maps embebido con la ubicación exacta
- ✅ **Iconos de Material Design**: Para mejor UX

---

### 6. **Navegación y Layout**

#### Navbar:
- ✅ Logo de la empresa
- ✅ Enlaces a todas las secciones:
  - Inicio
  - Catálogo
  - Productos de Madera
  - Presupuesto
  - Contacto
  - Admin (para administradores)
- ✅ Diseño responsive con menú hamburguesa en móviles

#### Footer:
- ✅ Información de la empresa
- ✅ Enlaces rápidos
- ✅ Datos de contacto
- ✅ Derechos de autor

---

## Funcionalidades para Administradores

### 1. **Sistema de Autenticación**

**Ruta:** `/admin`

#### Funcionalidades:
- ✅ **Login protegido** con credenciales:
  - Usuario: `admin`
  - Contraseña: `admin`
- ✅ **Persistencia de sesión**: Usa localStorage (`vv_auth`)
- ✅ **Protección de rutas**: Solo accesible con sesión activa
- ✅ **Botón de cerrar sesión**: Limpia la sesión y redirecciona
- ✅ **Diseño profesional**: Card centrada con animaciones

---

### 2. **Dashboard Administrativo**

**Ruta:** `/admin` (página principal)

#### Métricas Visualizadas:
1. **📦 Total Productos**: Cuenta total de productos de vidrio
2. **⚠️ Bajo Stock**: Productos con menos de 10 unidades
3. **💵 Valor Total**: Suma del precio × stock de todos los productos
4. **🚚 Materiales Crudos**: Total de materias primas
5. **⚠️ Materiales Bajo Stock**: Materias primas bajo mínimo

#### Funcionalidades:
- ✅ **Métricas en tiempo real**: Se actualizan automáticamente
- ✅ **Cards clicables**: Navegan a la sección correspondiente
- ✅ **Código de colores**:
  - Verde: Todo bien
  - Rojo/Amarillo: Alertas de stock bajo
- ✅ **Iconos descriptivos**: Cada métrica tiene su ícono

---

### 3. **Gestión de Productos de Vidrio**

**Ruta:** `/admin/inventory` o `/admin/products`

#### Funcionalidades:
- ✅ **Tabla completa de productos** con columnas:
  - Imagen (thumbnail)
  - Nombre
  - Categoría
  - Precio
  - Stock
  - Destacado (toggle)
  - Acciones (Editar/Eliminar)
- ✅ **Crear nuevo producto**:
  - Formulario con drag & drop para imágenes
  - Campos: nombre, precio, stock, categoría, descripción
  - Checkbox para marcar como "Destacado"
  - Compresión automática de imágenes
  - **Subida a Firebase Storage**
- ✅ **Editar producto existente**:
  - Pre-carga datos del producto
  - Permite cambiar la imagen
  - Actualización en tiempo real
- ✅ **Eliminar producto**: Con confirmación
- ✅ **Toggle de producto destacado**: Activa/desactiva desde la tabla
- ✅ **Búsqueda y filtros**: Encuentra productos rápidamente
- ✅ **Vista previa de imagen**: Antes de guardar

#### Compresión de Imágenes:
- ✅ Comprime automáticamente a 800px de ancho
- ✅ Mantiene aspect ratio
- ✅ Genera preview en tiempo real
- ✅ Sube a Firebase Storage en formato optimizado

---

### 4. **Gestión de Productos de Madera**

**Ruta:** `/admin/wood-products`

#### Funcionalidades:
- ✅ **Tabla completa de productos de madera**
- ✅ **CRUD completo** (Crear, Leer, Actualizar, Eliminar)
- ✅ **Formulario específico para productos de madera**:
  - Campos personalizados para carpintería
  - Categorías: Puertas, Ventanas, Escritorios, Muebles, A Medida
  - Misma funcionalidad de subida de imágenes
- ✅ **Toggle de producto destacado**
- ✅ **Integración con Firebase Storage**

---

### 5. **Gestión de Materias Primas**

**Ruta:** `/admin/materials`

#### Funcionalidades:
- ✅ **Tabla de materiales** con columnas:
  - Nombre
  - Categoría
  - Cantidad
  - Unidad (láminas, metros, unidades, etc.)
  - Stock Mínimo
  - Estado (alerta si está bajo stock mínimo)
  - Acciones
- ✅ **Crear nueva materia prima**:
  - Nombre
  - Categoría
  - Cantidad actual
  - Unidad de medida
  - Stock mínimo (para alertas)
  - Descripción
- ✅ **Editar materia prima**
- ✅ **Eliminar materia prima**
- ✅ **Alertas de stock bajo**: Visual cuando cantidad < stock mínimo
- ✅ **Búsqueda**: Por nombre, categoría o descripción

#### Materiales de Ejemplo:
- Vidrio templado 6mm
- Aluminio natural
- Vidrio laminado 10mm
- Aluminio negro
- Vidrio espejo 4mm
- Silicón para vidrio

---

### 6. **Navegación Administrativa**

#### AdminSidebar:
- ✅ **Dashboard**: Vista general
- ✅ **Inventario (Vidrio)**: Gestión de productos de vidrio
- ✅ **Productos de Madera**: Gestión de carpintería
- ✅ **Materiales**: Gestión de materias primas
- ✅ **Configuración**: Placeholder para futuras configuraciones

#### Header Administrativo:
- ✅ **Botón "Ver Tienda"**: Navega al frontend público
- ✅ **Botón "Cerrar Sesión"**: Cierra sesión de admin

---

## Integración con Firebase

### 1. **Configuración de Firebase**

**Archivo:** `src/firebase/config.js`

#### Funcionalidades:
- ✅ **Inicialización automática** de Firebase App
- ✅ **Sistema de credenciales flexible** (3 niveles de prioridad):
  1. **Archivo local**: `src/firebase/credentials/credentials.js` (desarrollo local)
  2. **Variables de entorno Vite**: `VITE_FIREBASE_*` (producción/CI)
  3. **Valores hardcodeados**: Fallback para desarrollo rápido
- ✅ **Servicios exportados**:
  - `app`: Firebase App instance
  - `db`: Firestore database
  - `auth`: Firebase Authentication
  - `analytics`: Google Analytics (solo en browser)

#### Configuración Actual:
```javascript
{
  apiKey: "AIzaSyATQXjmo0xv7-YOuIkHEddGO-q4CLgGrM8",
  authDomain: "vidrieria-d59d3.firebaseapp.com",
  projectId: "vidrieria-d59d3",
  storageBucket: "vidrieria-d59d3.firebasestorage.app",
  messagingSenderId: "983598785830",
  appId: "1:983598785830:web:bf756e911e407ffdcbcde7",
  measurementId: "G-2T9PFQ2WDH"
}
```

---

### 2. **Firebase Storage - Subida de Imágenes**

**Archivo:** `src/firebase/storage.js`

#### Funciones Disponibles:

##### `uploadBase64(base64Data, path)`
- **Descripción**: Sube una imagen en formato Data URL (base64)
- **Parámetros**:
  - `base64Data`: String en formato `data:image/...;base64,...`
  - `path`: Ruta en Storage, ej: `products/imagen1.jpg`
- **Retorna**: URL pública de descarga
- **Uso**: Perfecto para imágenes comprimidas en canvas

##### `uploadFile(file, path)`
- **Descripción**: Sube un archivo File/Blob directamente
- **Parámetros**:
  - `file`: Objeto File o Blob
  - `path`: Ruta en Storage
- **Retorna**: URL pública de descarga
- **Uso**: Para archivos sin procesar

#### Flujo de Subida en ProductForm:
1. Usuario selecciona imagen (drag & drop o file input)
2. Imagen se convierte a base64
3. Se comprime a 800px de ancho
4. Se muestra preview
5. Al guardar, se sube a Firebase Storage
6. Se obtiene URL pública
7. URL se guarda en el producto (localStorage/Firestore)

---

### 3. **Estructura de Almacenamiento**

#### Firebase Storage:
```
products/
  ├── vidrio_templado_8mm_1234567890.jpg
  ├── espejo_6mm_1234567891.jpg
  └── puerta_caoba_1234567892.jpg
```

#### Convenciones de Nombres:
- Formato: `{nombre_seguro}_{timestamp}.{ext}`
- Caracteres permitidos: `a-z, 0-9, -, _`
- Ejemplo: `mampara_de_bano_1734567890.jpg`

---

## Persistencia de Datos

### 1. **Firestore (Base de Datos en la Nube)**

✅ **IMPLEMENTADO** - La aplicación ahora usa **Firestore** para persistencia en la nube con sincronización en tiempo real.

#### Colecciones de Firestore:

##### `products` (Productos de Vidrio)
**Estructura de documento:**
```json
{
  "name": "Vidrio templado 8mm",
  "category": "Vidrio templado",
  "price": 120,
  "stock": 25,
  "img": "https://firebasestorage.googleapis.com/...",
  "description": "Descripción del producto",
  "featured": true
}
```
*Nota: El `id` es generado automáticamente por Firestore*

##### `woodProducts` (Productos de Madera)
**Estructura:** Similar a productos de vidrio, con campos específicos para carpintería

##### `rawMaterials` (Materias Primas)
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

#### Características de Firestore:
- ✅ **Sincronización en tiempo real**: Los cambios se reflejan instantáneamente
- ✅ **Acceso multi-dispositivo**: Los datos están en la nube
- ✅ **Migración automática**: Los datos de localStorage se migran automáticamente
- ✅ **Respaldo automático**: Firebase mantiene backups

#### localStorage (Solo para sesión)
- **Key:** `vv_auth` - Estado de autenticación
- **Valor:** `"1"` cuando está autenticado

---

### 2. **Contextos de React**

#### ProductContext:
- ✅ Gestiona estado de productos de vidrio
- ✅ **Sincronización con Firestore**: Usa `onSnapshot` para actualizaciones en tiempo real
- ✅ Funciones CRUD: `addProduct, updateProduct, deleteProduct, toggleFeatured`
- ✅ Búsqueda: `search`
- ✅ Estados: `loading, error` para manejo de carga
- ✅ Calculados: `lowStock, getFeaturedProducts`

#### WoodProductContext:
- ✅ Gestiona estado de productos de madera
- ✅ **Sincronización con Firestore**: Actualizaciones automáticas
- ✅ Funciones CRUD: `addWoodProduct, updateWoodProduct, deleteWoodProduct, toggleFeaturedWood`
- ✅ Búsqueda: `searchWoodProducts`
- ✅ Estados: `loading, error`
- ✅ Calculados: `lowStockWood, getFeaturedWoodProducts`

#### RawMaterialsContext:
- ✅ Gestiona estado de materias primas
- ✅ **Sincronización con Firestore**: Actualizaciones en tiempo real
- ✅ Funciones CRUD: `addMaterial, updateMaterial, deleteMaterial`
- ✅ Búsqueda: `search`
- ✅ Estados: `loading, error`
- ✅ Calculados: `lowStock`

---

## Arquitectura del Sistema

### Estructura de Carpetas

```
src/
├── components/
│   ├── admin/
│   │   ├── Dashboard.jsx
│   │   ├── InventoryTable.jsx
│   │   ├── ProductForm.jsx
│   │   ├── WoodProductForm.jsx
│   │   ├── RawMaterialForm.jsx
│   │   ├── RawMaterialsTable.jsx
│   │   └── WoodInventoryTable.jsx
│   ├── catalog/
│   │   ├── CategoryFilter.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   ├── SearchBar.jsx
│   │   └── WoodProductCard.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── WhyChooseUs.jsx
│   │   └── Testimonials.jsx
│   └── layout/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── AdminSidebar.jsx
├── context/
│   ├── ProductContext.jsx
│   ├── WoodProductContext.jsx
│   └── RawMaterialsContext.jsx
├── firebase/
│   ├── config.js
│   ├── storage.js
│   ├── firestore.js (helpers CRUD)
│   ├── FIREBASE_DOC.md
│   ├── FIRESTORE_RULES.md
│   └── credentials/
│       ├── README.md
│       ├── credentials.example.js
│       └── credentials.js (local, gitignored)
├── pages/
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── WoodProducts.jsx
│   ├── Quote.jsx
│   ├── Contact.jsx
│   ├── About.jsx
│   └── Admin.jsx
├── utils/
│   ├── storage.js
│   └── migrateToFirestore.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

---

### Rutas de la Aplicación

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | Home | Página principal |
| `/catalog` | Catalog | Catálogo de productos de vidrio |
| `/wood-products` | WoodProducts | Catálogo de productos de madera |
| `/quote` | Quote | Solicitar presupuesto |
| `/contact` | Contact | Información de contacto |
| `/about` | About | Acerca de la empresa |
| `/admin` | Admin | Dashboard administrativo |
| `/admin/products` | InventoryTable | Gestión de productos de vidrio |
| `/admin/inventory` | InventoryTable | Alias de products |
| `/admin/wood-products` | WoodInventoryTable | Gestión de productos de madera |
| `/admin/materials` | RawMaterialsTable | Gestión de materias primas |
| `/admin/config` | Placeholder | Configuración (próximamente) |

---

## Mejoras Futuras Recomendadas

### 1. ~~**Migrar a Firestore**~~ ✅ COMPLETADO
- ✅ Implementar persistencia en nube - **HECHO**
- ✅ Sincronización en tiempo real - **HECHO**
- ✅ Backup automático - **HECHO**
- ✅ Acceso multi-dispositivo - **HECHO**

### 2. **Autenticación Real con Firebase Auth**
- ✅ Login seguro con email/password
- ✅ Roles de usuario (admin, empleado, etc.)
- ✅ Recuperación de contraseña

### 3. **Barra de Progreso en Subida de Imágenes**
- ✅ Usar `uploadBytesResumable`
- ✅ Mostrar porcentaje de subida
- ✅ Cancelar subida si es necesario

### 4. **Optimizaciones de Performance**
- ✅ Lazy loading de imágenes
- ✅ Code splitting por rutas
- ✅ Service Worker para PWA

### 5. **Integración de Pagos**
- ✅ Carrito de compras
- ✅ Pasarela de pago (Stripe, PayPal, etc.)
- ✅ Sistema de órdenes

---

## Seguridad y Buenas Prácticas

### ⚠️ Importante

1. **Nunca subir credenciales al repositorio**:
   - ✅ `credentials.js` está en `.gitignore`
   - ✅ Usar variables de entorno en producción

2. **Configurar reglas de Firestore**:
   ```javascript
   // Ejemplo de reglas básicas
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{product} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Configurar reglas de Storage**:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /products/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

4. **Validación en frontend y backend**:
   - ✅ Validar formularios en el cliente
   - ✅ Validar datos en Cloud Functions
   - ✅ Sanitizar inputs

---

## Contacto y Soporte

Para más información sobre el desarrollo de esta aplicación, contactar a:

- **Email**: vallecristopher102@gmail.com
- **Teléfono**: +505 57079251
- **WhatsApp**: +505 81663656

---

**Vidriería Valladares** - Sistema de Gestión Web v2.0  
*Documentación generada el 17 de Diciembre, 2024*
