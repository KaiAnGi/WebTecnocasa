# WebTecnocasa

Prototipo de página web inmobiliaria desarrollado como proyecto académico utilizando React en el frontend y Node.js/Express en el backend.

## 📋 Descripción

WebTecnocasa es una aplicación web full-stack diseñada para simular la plataforma inmobiliaria completa. El proyecto implementa funcionalidades esenciales para la gestión de propiedades, búsqueda avanzada de inmuebles y prácticas con API externas.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React.js** - Biblioteca para construcción de interfaces
- **JavaScript**, **CSS/Bootstrap**, **HTML**
- Vite - Build tool y dev server
- React Router - Navegación entre páginas
- Zustand - Gestión de estado
  
### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- Mongoose - ODM para MongoDB
- JWT - Autenticación basada en tokens
- bcrypt - Hash de contraseñas
- mailjet - emails de confirmacion
- captcha - sistema de verificación

## 📁 Estructura del Proyecto

<img width="342" height="391" alt="image" src="https://github.com/user-attachments/assets/aa5acac2-6946-4340-b331-4547960e4104" />

## ⚙️ Instalación y Configuración

### Requisitos Previos
- Node.js v16 o superior
- MongoDB instalado localmente o cuenta en MongoDB Atlas
- npm o yarn

## 🏠 Funcionalidades Principales

- ✅ Catálogo de propiedades inmobiliarias
- ✅ Búsqueda avanzada con barra de búsqueda dinámica
- ✅ Visualización detallada de propiedades
- ✅ Sistema de autenticación de usuarios
- ✅ Panel de administración para gestión de inmuebles
- ✅ Galería de imágenes de propiedades
- ✅ Mapas de ubicación (implementación de leaflet)

## 🌐 Endpoints de la API

### Autenticación
- `POST /api/confirmarEmail` - Obtener confirmacion via email
- `POST /api/actualizarPassword` - Modificar contraseña con captcha

### Propiedades
- `GET /api/casasDestacadas` - Listar las propiedades de pag principal
- `GET /api/buscarCasas` - Obtener propiedades en barra de búsqueda

### Clientes
- `POST /api/registroOlogin` - Registrar o loggear nuevo usuario en el mismo modal
- `DELETE /api/usuarios/me` - Borrar cuenta

## 🎨 Características del Frontend

- Diseño responsive adaptado a diferentes dispositivos
- Interfaz intuitiva y moderna
- Componentes reutilizables
- Gestión de estado eficiente
- Validación de formularios
- Experiencia de usuario optimizada

## 🔒 Seguridad

- Autenticación basada en JWT
- Contraseñas hasheadas con bcrypt
- Validación de datos en backend
- Protección de rutas privadas
- Variables de entorno para datos sensibles

## 🎓 Contexto del Proyecto

Este proyecto fue desarrollado como parte del módulo de Desarrollo de Aplicaciones Web (DAW) para demostrar competencias en:
- Desarrollo full-stack con stack MERN (MongoDB, Express, React, Node.js)
- Diseño e implementación de API RESTful
- Gestión de bases de datos NoSQL
- Autenticación y autorización de usuarios
- Responsive design y UX/UI

## 👤 Autor

**KaiAnguloGil**  
GitHub: [@KaiAnGi](https://github.com/KaiAnGi)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub

