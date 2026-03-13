# The Perfect Shot - Backend API

Backend API for astrophotography and landscape photography planning application.

## Tech Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL (Docker)
- **Language**: TypeScript
- **Package Manager**: pnpm

## Prerequisites

- Node.js 22+
- pnpm
- Docker & Docker Compose

## Setup

1. **Install dependencies**:

```bash
pnpm install
```

2. **Start PostgreSQL database**:

```bash
docker compose up -d
```

The database will be available at `localhost:6381`.

3. **Generate Prisma client and run migrations**:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

4. **Start the development server**:

```bash
pnpm start:dev
```

The API will be available at `http://localhost:3000/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Users
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update current user profile

### Locations
- `GET /api/locations` - List all curated locations
- `GET /api/locations/:id` - Get location details
- `POST /api/locations` - Create a new location (admin only)
- `PATCH /api/locations/:id` - Update location (admin only)
- `DELETE /api/locations/:id` - Delete location (admin only)

### Photos
- `GET /api/photos` - List user's photos
- `GET /api/photos/:id` - Get photo details
- `POST /api/photos` - Upload a new photo
- `PATCH /api/photos/:id` - Update photo metadata
- `DELETE /api/photos/:id` - Delete a photo

### Shoot Plans
- `GET /api/shoot-plans` - List user's shoot plans
- `GET /api/shoot-plans/:id` - Get shoot plan details
- `POST /api/shoot-plans` - Create a new shoot plan
- `PATCH /api/shoot-plans/:id` - Update shoot plan
- `DELETE /api/shoot-plans/:id` - Delete shoot plan

### Weather Forecasts
- `GET /api/locations/:id/forecasts` - Get forecasts for a location
- `GET /api/locations/:id/forecasts/best` - Get best times for astrophotography

### Celestial Events
- `GET /api/celestial-events` - List all celestial events
- `GET /api/celestial-events/:id` - Get celestial event details
- `POST /api/celestial-events` - Create celestial event (admin only)

## Environment Variables

Create a `.env` file in the root directory:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:6381/the-perfect-shot?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"
```

## Building for Production

```bash
pnpm build
pnpm start:prod
```
