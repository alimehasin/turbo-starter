# Turbo Starter - Docker Setup

A full-stack application with backend (Elysia/Bun) and dashboard (Next.js) services.

## 🚀 Quick Start

```bash
# Setup and start everything
make setup

# Access your applications
# Dashboard: http://localhost:3001
# Backend API: http://localhost:3000
```

## 📋 Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## 🛠️ Setup

1. **Copy environment file:**

   ```bash
   make setup-env
   ```

2. **Edit `.env` with your values:**

   ```env
   DATABASE_URL=postgresql://user:password@your-db-host:5432/your-db-name
   STORAGE_ACCESS_KEY=your-access-key
   STORAGE_SECRET_KEY=your-secret-key
   STORAGE_BUCKET_NAME=your-bucket-name
   ```

3. **Build and start:**
   ```bash
   make setup
   ```

## 📚 Commands

### Main Commands

```bash
make setup      # Full setup (env + build + up)
make build      # Build Docker images
make up         # Start all services
make down       # Stop all services
make logs       # View logs
```

### Development

```bash
make dev-up     # Start only Redis
make dev-down   # Stop dev services
```

### Database

```bash
make migrate    # Run migrations
make seed       # Seed database
make studio     # Open Prisma Studio
```

### Cleanup

```bash
make clean      # Clean Docker resources
make clean-all  # Remove everything
```

### Utility

```bash
make ps         # Show running containers
make restart    # Restart all services
```

## 🌐 Services

- **Backend API:** http://localhost:3000 (Elysia/Bun)
- **Dashboard:** http://localhost:3001 (Next.js)
- **Redis:** Port 6379 (Caching)

## 🔍 Troubleshooting

```bash
# Check status
make ps

# View logs
make logs

# Clean and rebuild
make clean-all
make build
```

## 🎯 Quick Reference

- **Start:** `make setup`
- **Stop:** `make down`
- **Rebuild:** `make clean-all && make build`
- **Check:** `make ps`
- **Debug:** `make logs`
