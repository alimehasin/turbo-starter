# Turbo Starter

<p align="center">
  A modern, full-stack TypeScript monorepo starter built with Turborepo, Bun, React, Next.js, and Prisma.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#development-workflow">Development Workflow</a> •
  <a href="#best-practices">Best Practices</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

## Features

- 🏎️ **Turborepo**: High-performance monorepo build system for efficient code sharing and execution
- 🔄 **Full TypeScript**: End-to-end type safety across all packages and applications
- 🐎 **Bun**: Ultra-fast JavaScript runtime and package manager
- 🧩 **Modular Architecture**: Well-organized codebase with clear separation of concerns
- 📊 **Dashboard**: Next.js-powered admin interface
- 🖥️ **Backend API**: Type-safe backend service
- 🗄️ **Database Integration**: Prisma ORM with PostgreSQL support
- 🔍 **Code Quality**: Biome for formatting and linting
- 🧪 **Testing Setup**: Ready-to-use testing infrastructure
- 🔄 **CI/CD Ready**: Configured with best practices for continuous integration
- 📦 **Versioning**: Integrated with Changesets for version management
- 🌍 **i18n Support**: Internationalization scaffolding for multi-language applications
- 🐳 **Docker Support**: Docker Compose for local development

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.4 or later)
- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

1. Clone the repository

```bash
git clone https://github.com/alimehasin/turbo-starter.git
cd turbo-starter
```

2. Install dependencies

```bash
bun install
```

3. Set up environment variables

```bash
bun run scripts:init:env
```

4. Start the PostgreSQL database

```bash
docker-compose up -d
```

5. Run database migrations

```bash
bun run db:migrate:dev
```

6. Start the development servers

```bash
bun run dev
```

## Project Structure

```
├── apps/                   # Application code
│   ├── backend/            # Backend API service
│   └── dashboard/          # Admin dashboard (Next.js)
├── packages/               # Shared packages
│   ├── db/                 # Database client & migrations (Prisma)
│   └── ... other packages
├── configs/                # Shared configuration files
└── scripts/                # Utility scripts
```

## Development Workflow

### Available Commands

- `bun run dev` - Start all applications in development mode
- `bun run build` - Build all applications
- `bun run test` - Run tests across all packages
- `bun run format` - Format code with Biome
- `bun run lint` - Lint code with Biome
- `bun run typecheck` - Type check all packages

### Database Operations

- `bun run db:migrate:dev` - Create and apply migrations in development
- `bun run db:migrate:deploy` - Apply migrations in production
- `bun run db:studio` - Open Prisma Studio to manage database
- `bun run db:generate` - Generate Prisma client

## Best Practices

- All packages used by one app should be in the same workspace
- An app should not use packages from other apps
- Keep shared code in the `packages/` directory
- Use TypeScript for type safety across the entire project
- Follow the conventional commit format for commit messages

## Environment Variables

- Development: Copy the appropriate `.env.example` files to `.env` in their respective directories
- Production: In production, environment variables should be set in the dashboard's `.env` file
- For database migrations in development, ensure variables are set in `packages/db/.env`

## Deployment

This starter can be deployed to various platforms. Refer to the documentation of each platform for specific deployment instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contributors

We welcome new contributors!

<a href="https://github.com/alimehasin/turbo-starter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=alimehasin/turbo-starter" />
</a>

## License

This project is licensed under the MIT License - see the LICENSE file for details.
