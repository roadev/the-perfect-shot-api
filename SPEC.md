# The Perfect Shot - Backend API Specification

## 1. Project Overview

- **Project Name**: The Perfect Shot API
- **Type**: RESTful API Backend for Astrophotography & Landscape Photography Planning
- **Core Functionality**: Help photographers plan shoots by providing optimal times, locations, weather conditions, and celestial event information
- **Target Users**: Astrophotographers, landscape photographers, photography enthusiasts

## 2. Technical Stack

- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL (via Docker Compose, port 6381)
- **Language**: TypeScript
- **Authentication**: JWT-based auth with bcrypt password hashing

## 3. API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and receive JWT token |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users/me | Get current user profile |
| PATCH | /users/me | Update current user profile |

### Locations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /locations | List all curated locations |
| GET | /locations/:id | Get location details |
| POST | /locations | Create a new location (admin only) |
| PATCH | /locations/:id | Update location (admin only) |
| DELETE | /locations/:id | Delete location (admin only) |

### Photos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /photos | List user's photos |
| GET | /photos/:id | Get photo details |
| POST | /photos | Upload a new photo |
| PATCH | /photos/:id | Update photo metadata |
| DELETE | /photos/:id | Delete a photo |

### Shoot Plans
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /shoot-plans | List user's shoot plans |
| GET | /shoot-plans/:id | Get shoot plan details |
| POST | /shoot-plans | Create a new shoot plan |
| PATCH | /shoot-plans/:id | Update shoot plan |
| DELETE | /shoot-plans/:id | Delete shoot plan |

### Weather Forecasts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /locations/:id/forecasts | Get forecasts for a location |
| GET | /locations/:id/forecasts/best | Get best times for astrophotography |

### Celestial Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /celestial-events | List all celestial events |
| GET | /celestial-events/:id | Get celestial event details |
| POST | /celestial-events | Create celestial event (admin only) |

## 4. Database Models

### User
- id (UUID, primary key)
- email (unique)
- passwordHash
- role (USER | ADMIN)
- createdAt, updatedAt

### Location
- id (UUID, primary key)
- name
- latitude, longitude
- elevation (optional)
- bortleScale (1-9 light pollution scale)
- createdAt, updatedAt

### Photo
- id (UUID, primary key)
- imageUrl
- celestialTarget (optional)
- cameraMetadata (JSON, optional)
- userId, locationId (foreign keys)
- createdAt

### ShootPlan
- id (UUID, primary key)
- targetDate
- notes (optional)
- userId, locationId (foreign keys)
- createdAt, updatedAt

### WeatherForecast
- id (UUID, primary key)
- date
- cloudCover (0-100%)
- seeing (optional, float)
- skyScore (optional, 0-100)
- locationId (foreign key)
- retrievedAt
- Unique: [locationId, date]

### CelestialEvent
- id (UUID, primary key)
- name
- startDate, peakDate, endDate
- createdAt

## 5. Acceptance Criteria

1. **Authentication**: Users can register and login with JWT tokens
2. **CRUD Operations**: All entities support full CRUD operations
3. **Authorization**: Admin-only routes protected
4. **Data Integrity**: Prisma schema enforces relationships and constraints
5. **Weather Forecasts**: Can retrieve forecasts for locations
6. **Best Times**: Can find optimal astrophotography times based on sky score
7. **Docker Setup**: PostgreSQL runs on port 6381 via Docker Compose
