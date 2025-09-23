# Makefile for Docker management

.PHONY: help build up down logs clean dev-up dev-down migrate seed

# Default target
help:
	@echo "Available commands:"
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start all services"
	@echo "  down      - Stop all services"
	@echo "  logs      - Show logs for all services"
	@echo "  clean     - Clean up Docker resources"
	@echo "  dev-up    - Start development services (Redis only)"
	@echo "  dev-down  - Stop development services"
	@echo "  migrate   - Run database migrations"
	@echo "  seed      - Seed the database"
	@echo "  studio    - Open Prisma Studio"

# Production commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

# Development commands (using main compose file)
dev-up:
	docker-compose up -d redis

dev-down:
	docker-compose stop redis

# Database commands (requires external database)
migrate:
	@echo "Note: Database commands require an external database connection"
	@echo "Make sure your DATABASE_URL in .env points to a running database"
	docker-compose exec backend bunx prisma migrate deploy

migrate-dev:
	@echo "Note: Database commands require an external database connection"
	@echo "Make sure your DATABASE_URL in .env points to a running database"
	docker-compose exec backend bunx prisma migrate dev

seed:
	@echo "Note: Database commands require an external database connection"
	@echo "Make sure your DATABASE_URL in .env points to a running database"
	docker-compose exec backend bunx prisma db seed

studio:
	@echo "Note: Database commands require an external database connection"
	@echo "Make sure your DATABASE_URL in .env points to a running database"
	docker-compose exec backend bunx prisma studio

# Cleanup commands
clean:
	docker system prune -f
	docker volume prune -f

clean-all:
	docker-compose down -v
	docker system prune -a -f

# Utility commands
ps:
	docker-compose ps

restart:
	docker-compose restart

restart-backend:
	docker-compose restart backend

restart-dashboard:
	docker-compose restart dashboard

# Environment setup
setup-env:
	@if [ ! -f .env ]; then cp .env.example .env; fi
	@echo "Environment file created. Please edit .env with your actual values."

# Full setup
setup: setup-env build up
	@echo "Setup complete! Your application is running at:"
	@echo "  Dashboard: http://localhost:3001"
	@echo "  Backend API: http://localhost:3000"
	@echo "  API Docs: http://localhost:3000/docs"
	@echo ""
	@echo "Note: Database commands require an external database connection"
	@echo "Make sure your DATABASE_URL in .env points to a running database"
