# Sistema de Administración de Estudiantes

Aplicación web para la administración de estudiantes mediante operaciones CRUD.

El proyecto está desarrollado utilizando React para el frontend y Node.js con Express para el backend.

## Tecnologías

### Frontend

- React
- JavaScript
- HTML
- CSS

### Backend

- Node.js
- Express.js
- CORS

## Arquitectura

El backend utiliza una arquitectura por capas:

Controller → Service → Repository

### Controller

Responsable de recibir las solicitudes HTTP y devolver las respuestas correspondientes.

### Service

Contiene la lógica de negocio y las validaciones.

### Repository

Administra el almacenamiento de los estudiantes.

Actualmente se utiliza un arreglo en memoria como almacenamiento.

## Funcionalidades

- Dashboard
- Listado de estudiantes
- Crear estudiantes
- Editar estudiantes
- Eliminar estudiantes
- Búsqueda de estudiantes
- Filtro por carrera
- Filtro por edad
- Paginación
- Validación de formularios
- Validación de datos en backend
- Notificaciones Toast
- Diseño responsive

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm

