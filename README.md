# Turbo Starter

A modern full-stack boilerplate with **Elysia.js** backend and **Next.js** frontend, powered by **Bun** and **Turborepo**.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo>
cd turbo-starter
make setup

# Access applications
# Backend: http://localhost:3000
# Dashboard: http://localhost:3001
```

## 🛠️ Tech Stack

**Backend:**

- Elysia.js + Bun runtime
- Prisma ORM + PostgreSQL
- Better Auth
- S3 Storage
- OpenAPI docs

**Frontend:**

- Next.js 15 + React 19
- Mantine UI components
- React Query + TanStack
- i18n internationalization
- TypeScript

**Dev Tools:**

- Turborepo monorepo
- Biome linting/formatting
- Docker + Docker Compose
- Husky git hooks

## 📚 Docker commands

```bash
# Main
make setup      # Full setup
make up         # Start services
make down       # Stop services

# Development
make dev-up     # Start Redis only
make logs       # View logs

# Database
make migrate    # Run migrations
make seed       # Seed database
make studio     # Prisma Studio

# Cleanup
make clean-all  # Remove everything
```

## 🌐 Services

- **Backend API:** http://localhost:3000
- **Dashboard:** http://localhost:3001
