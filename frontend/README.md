# Club Frontón — Frontend (React + Tailwind)

Interfaz para la gestión de jugadores y partidos del club. Construida con React, Vite, Tailwind CSS, React Router y Axios. Consume la API REST del backend NestJS.

## Configuración

Copia `.env.example` a `.env` y ajusta la URL del backend si es necesario:

```bash
cp .env.example .env
```

## Instalación y ejecución

```bash
npm install
npm run dev
```

Por defecto corre en `http://localhost:5173` y espera que el backend esté disponible en `http://localhost:3000` (configurable con `VITE_API_URL`).

## Páginas

- `/login` — inicio de sesión (usa el usuario sembrado por el backend)
- `/` — dashboard con estadísticas generales
- `/jugadores` — listado de jugadores, con acceso a crear/editar/eliminar
- `/jugadores/nuevo` y `/jugadores/:id/editar` — formulario de jugador
- `/partidos` — listado de partidos (2 contra 2, ligados a jugadores), con acceso a crear/editar/eliminar
- `/partidos/nuevo` y `/partidos/:id/editar` — formulario de partido

Todas las rutas excepto `/login` están protegidas: sin sesión iniciada redirigen al login.
