# The Perfect Shot - Core API 🌌

> **The Backbone for Astrophotography Planning.**

The Perfect Shot is a high-performance backend API designed to solve the "Time & Place" problem for astrophotographers and landscape enthusiasts. It orchestrates weather data, celestial event tracking, and secure cloud storage to ensure photographers never miss a critical window.

## 🚀 Business Vision

Timing is everything in professional photography. A 10-minute window of clear skies or a specific lunar phase can be the difference between a masterpiece and a missed opportunity. This API provides the reliable infrastructure needed to:
- **Predict**: Combine location-based weather with celestial events.
- **Organize**: Curate shooting locations with historical and forecasted data.
- **Scale**: Handle high-resolution media through secure, direct-to-cloud storage flows.

## 🏗️ Architectural Decisions

Built with a focus on **type-safety**, **modularity**, and **scalability**:

- **NestJS (Node.js)**: Chosen for its modular architecture and enterprise-grade dependency injection, facilitating clean separation of concerns (Weather vs. Photos vs. Locations).
- **Prisma & PostgreSQL**: Ensures a strictly typed database layer with highly efficient migration management.
- **Direct-to-Cloud Storage Strategy**: Implemented a **Presigned URL** system for DigitalOcean Spaces (S3-compatible). This offloads heavy file uploads from the API server directly to the cloud, significantly reducing infrastructure overhead and latency for the end-user.
- **JWT Authentication**: Secure, stateless auth flow using passport-jwt for cross-service compatibility.

## 🛠️ Technical Deep Dive

### Storage Service Abstraction
The `StorageModule` implements a generic S3-compatible interface. This allows for easy swapping between DigitalOcean Spaces, AWS S3, or Minio without changing business logic in the `PhotosModule`.

### Proactive Data Orchestration
The API doesn't just store data; it curates it. The `WeatherModule` is designed to ingest multi-source data and provide specialized scores (like the "Clear Sky Score") tailored for long-exposure photography.

---

## 🚦 Getting Started

### Prerequisites
- Node.js 22+
- pnpm
- Docker (for PostgreSQL)

### Setup Instructions

1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Infrastructure**:
   ```bash
   docker compose up -d
   ```
   *Database runs at `localhost:6381`.*

3. **Database Preparation**:
   ```bash
   pnpm prisma generate
   pnpm prisma migrate dev --name init
   ```

4. **Run Development Server**:
   ```bash
   pnpm start:dev
   ```

---

## 📡 API Reference

Explore the full interactive documentation at `http://localhost:7000/api/docs` (Swagger).

### Core Domains:
| Module | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth/*` | Secure registration and JWT-based session management. |
| **Locations** | `/api/locations` | Curated spots with Bortle Scale and elevation data. |
| **Weather** | `/api/locations/:id/forecasts` | Deep-sky specific weather metrics and "Best Time" prediction. |
| **Events** | `/api/celestial-events` | Tracking meteor showers, eclipses, and lunar phases. |
| **Photos** | `/api/photos` | Managed upload flow with presigned S3 URLs and metadata tracking. |

## 📦 Environment Variables

Create a `.env` file in the root:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:6381/the-perfect-shot?schema=public"
JWT_SECRET="your-secret-key"
DO_SPACES_ACCESS_KEY_ID="xxx"
DO_SPACES_SECRET_ACCESS_KEY="xxx"
DO_SPACES_REGION="nyc3"
DO_SPACES_ENDPOINT="https://nyc3.digitaloceanspaces.com"
DO_SPACES_BUCKET="astro-bucket"
```
