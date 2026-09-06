# Club Frontón — Backend (NestJS)

API REST para la gestión de jugadores y partidos del club. Construida con NestJS, TypeORM y PostgreSQL. Autenticación con JWT (Passport) y autorización basada en rutas protegidas.

## Requisitos previos

- Node.js 20+
- Una instancia de PostgreSQL accesible (host/puerto/usuario/contraseña)

## Configurar la base de datos

Crea una base de datos y un usuario en tu PostgreSQL (ejemplo con `psql`):

```sql
CREATE USER fronton_user WITH PASSWORD 'fronton_pass';
CREATE DATABASE fronton_tarea2 OWNER fronton_user;
```

Copia `.env.example` a `.env` y ajusta las credenciales si usaste otras:

```bash
cp .env.example .env
```

Variables relevantes:

| Variable | Descripción |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME` | Conexión a PostgreSQL |
| `JWT_SECRET`, `JWT_EXPIRES_IN` | Firma y expiración del token |
| `SEED_USER_EMAIL`, `SEED_USER_PASSWORD` | Usuario demo creado automáticamente al arrancar |
| `CORS_ORIGIN` | Origen permitido (el frontend, por defecto `http://localhost:5173`) |

Las tablas se crean automáticamente al iniciar (`synchronize: true`), no se requieren migraciones manuales.

## Instalación y ejecución

```bash
npm install
npm run start:dev
```

Al arrancar, si no existe, se siembra un usuario con las credenciales de `SEED_USER_EMAIL` / `SEED_USER_PASSWORD` (por defecto `admin@clubfronton.com` / `admin123`, nombre "Henrique Alvarez"). Úsalo para iniciar sesión desde el frontend.

Además, si la tabla de jugadores está vacía, se siembran automáticamente 4 jugadores de ejemplo (Juan Pérez, Ana García, Carlos Rodríguez, María López) para que el dashboard y los listados no arranquen vacíos.

## Endpoints

### Auth
- `POST /auth/login` — recibe `{ email, password }`, devuelve `{ accessToken, user }`

### Jugadores (protegido, requiere `Authorization: Bearer <token>`)
- `GET /jugadores`
- `GET /jugadores/:id`
- `POST /jugadores`
- `PUT /jugadores/:id`
- `DELETE /jugadores/:id`

### Partidos (protegido, requiere `Authorization: Bearer <token>`)
- `GET /partidos`
- `GET /partidos/:id`
- `POST /partidos`
- `PUT /partidos/:id`
- `DELETE /partidos/:id`

Cada partido referencia 4 jugadores (equipo1Jugador1Id, equipo1Jugador2Id, equipo2Jugador1Id, equipo2Jugador2Id) — partidos de frontón 2 contra 2. Los tantos (`tantosEquipo1`, `tantosEquipo2`) están limitados a un rango de 0 a 16.
