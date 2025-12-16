# 🪟 Vidriería Valladares

<div align="center">

**Sistema Web Profesional para Gestión de Vidriería**

[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## 📖 Descripción

Sistema web moderno y completo para la gestión integral de una vidriería, incluyendo catálogo de productos, inventario, presupuestos y panel de administración. Diseñado con React y Vite para ofrecer una experiencia rápida y fluida.

## ✨ Características

### Para Clientes
- 🏠 **Página Principal** - Hero section con productos destacados
- 📦 **Catálogo Completo** - Sistema de búsqueda y filtrado de productos
- 🏢 **Sobre Nosotros** - Misión, visión e información de la empresa
- 📞 **Contacto** - Formulario y mapa de ubicación integrado
- 💰 **Solicitud de Presupuestos** - Formulario detallado para cotizaciones

### Para Administradores
- 📊 **Dashboard** - Vista general con estadísticas clave
- ✏️ **Gestión de Productos** - CRUD completo con carga de imágenes
- 📦 **Control de Inventario** - Seguimiento de stock en tiempo real
- ⚠️ **Alertas de Stock Bajo** - Notificaciones automáticas
- 📸 **Sistema de Imágenes** - Carga, compresión y optimización automática

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** v16 o superior
- **npm** v7 o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/vidrieria-valladares.git

# Navegar al directorio
cd vidrieria-valladares

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## � Estructura del Proyecto

```
vidrieria-valladares/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/          # Imágenes y recursos
│   ├── components/      # Componentes reutilizables
│   │   ├── admin/       # Componentes del panel admin
│   │   ├── layout/      # Headers, footers, sidebars
│   │   └── ui/          # Componentes UI genéricos
│   ├── context/         # Context API (estado global)
│   ├── pages/           # Páginas principales
│   ├── styles/          # Estilos globales
│   ├── utils/           # Funciones auxiliares
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Punto de entrada
├── vercel.json          # Configuración de Vercel
└── package.json         # Dependencias y scripts
```

## �️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.2.0 | Framework UI |
| **Vite** | 5.0.0 | Build tool y dev server |
| **React Router DOM** | 6.14.1 | Enrutamiento SPA |
| **LocalStorage API** | - | Persistencia de datos |

## 🔐 Panel de Administración

### Acceso
1. Navega a `/admin` o haz clic en el enlace **🔐 Admin** en el footer
2. Ingresa las credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `admin`

> ⚠️ **Importante:** Cambiar las credenciales por defecto en producción

### Funcionalidades

| Característica | Descripción |
|----------------|-------------|
| **Dashboard** | Estadísticas generales del inventario |
| **Productos** | Crear, editar, eliminar productos con imágenes |
| **Inventario** | Control de stock y alertas automáticas |
| **Imágenes** | Drag & drop con compresión automática |

## 🌐 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Página principal |
| `/catalog` | Catalog | Catálogo completo de productos |
| `/about` | About | Información de la empresa |
| `/contact` | Contact | Formulario de contacto |
| `/quote` | Quote | Solicitud de presupuesto |
| `/admin` | Admin | Dashboard administrativo |
| `/admin/products` | Products | Gestión de productos |
| `/admin/inventory` | Inventory | Control de inventario |

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run preview      # Vista previa del build local

# Linting
npm run lint         # Ejecuta ESLint
```

## 🚀 Deployment en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Push a GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Conectar con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Click en **"New Project"**
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración de Vite
   - Click en **"Deploy"**

### Opción 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Configuración Automática

El archivo `vercel.json` ya está configurado para:
- ✅ Manejar rutas de SPA correctamente
- ✅ Redirigir todas las rutas a `index.html`
- ✅ Optimizar el build para producción

## � Almacenamiento de Datos

Actualmente, la aplicación utiliza **localStorage** para persistencia de datos:

| Clave | Contenido |
|-------|-----------|
| `products` | Array de productos |
| `inventory` | Datos de inventario |
| `adminSession` | Sesión de administrador |

> 📝 **Nota:** Los datos se almacenan localmente en el navegador del usuario

## 🎨 Características de Imágenes

El sistema incluye funcionalidades avanzadas de gestión de imágenes:

1. **Carga Múltiple** - Drag & drop o selección de archivos
2. **Compresión Automática** - Las imágenes se redimensionan a 800px de ancho
3. **Almacenamiento Base64** - Conversión automática para localStorage
4. **Vista Previa** - Visualización antes de guardar
5. **Optimización** - Compresión sin pérdida significativa de calidad

## � Seguridad

> ⚠️ **Advertencia de Producción**

Para un entorno de producción real, se recomienda:

- [ ] Implementar backend con base de datos real
- [ ] Usar autenticación JWT o OAuth
- [ ] Implementar HTTPS
- [ ] Validación de datos en servidor
- [ ] Rate limiting para APIs
- [ ] Encriptación de contraseñas con bcrypt

## �️ Roadmap

### Versión 1.1
- [ ] Backend con Node.js + Express
- [ ] Base de datos PostgreSQL o MongoDB
- [ ] Autenticación JWT
- [ ] API REST completa

### Versión 1.2
- [ ] Sistema de notificaciones por email
- [ ] Galería múltiple de imágenes por producto
- [ ] Sistema de categorías dinámico
- [ ] Filtros avanzados en catálogo

### Versión 2.0
- [ ] Pasarela de pago integrada
- [ ] Sistema de pedidos online
- [ ] Panel de analytics
- [ ] App móvil (React Native)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 📧 Contacto

**Vidriería Valladares**
- 📍 Ubicación: [Ver en Google Maps](https://maps.app.goo.gl/bv6KR1iiPvWNz6rG8)
- 📞 Teléfono: [Tu teléfono]
- 📧 Email: [Tu email]

---

<div align="center">

**Hecho con ❤️ para Vidriería Valladares** 🪟✨

</div>
