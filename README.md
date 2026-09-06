# Tarea 2 — Club Frontón

Sistema de gestión para un club de frontón: administración de jugadores y registro de partidos (2 contra 2). Dos proyectos independientes que se comunican por REST:

- [`backend/`](./backend) — API REST en NestJS + TypeORM + PostgreSQL, con autenticación JWT.
- [`frontend/`](./frontend) — SPA en React + Vite + Tailwind CSS, consumida con Axios.

## Puesta en marcha rápida

1. **Base de datos**: crea el usuario y la base en tu PostgreSQL local (ver [backend/README.md](./backend/README.md)).
2. **Backend**:
   ```bash
   cd backend
   cp .env.example .env   # ajusta credenciales si aplica
   npm install
   npm run start:dev
   ```
   Queda escuchando en `http://localhost:3000`. Al arrancar siembra un usuario demo (`admin@clubfronton.com` / `admin123`, nombre "Henrique Alvarez") y, si no hay jugadores, 4 jugadores de ejemplo.
3. **Frontend**:
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm run dev
   ```
   Queda escuchando en `http://localhost:5173`.

Inicia sesión en el frontend con el usuario sembrado para acceder al dashboard, jugadores y partidos.

Para el paso a paso detallado (requisitos, configuración de PostgreSQL, variables de entorno, verificación) ver [`4. Guía de instalación, configuración y ejecución del proyecto.md`](<./4. Guía de instalación, configuración y ejecución del proyecto.md>).

## Historial de desarrollo

Este repositorio sigue GitFlow (`main` / `develop` / `feature/*`): cada recurso (auth, jugadores, partidos, tanto en backend como frontend) se desarrolló en su propia rama con commits incrementales, mergeada a `develop` vía pull request.
