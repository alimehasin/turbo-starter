# Turbo Starter

<p align="center">
  A modern, full-stack TypeScript monorepo starter built with Turborepo, Bun, Next.js, Elysia, and Prisma.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#development-workflow">Development Workflow</a> •
  <a href="#applications">Applications</a> •
  <a href="#packages">Packages</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

## Features

- 🏎️ **Turborepo**: High-performance monorepo build system for efficient code sharing and execution
- 🔄 **Full TypeScript**: End-to-end type safety across all packages and applications
- 🐎 **Bun**: Ultra-fast JavaScript runtime and package manager (v1.2.17)
- 🧩 **Modular Architecture**: Well-organized codebase with clear separation of concerns
- 📊 **Admin Dashboard**: Next.js + Mantine UI powered admin interface with tRPC
- 🌐 **Website**: Next.js + Tailwind CSS public-facing website
- ⚡ **Backend API**: High-performance Elysia.js backend with Swagger documentation
- 🗄️ **Database Integration**: Prisma ORM with PostgreSQL support
- 🔍 **Code Quality**: Biome for formatting and linting
- 🌍 **i18n Support**: Complete internationalization setup for multi-language applications
- 🎨 **UI Components**: Mantine UI for dashboard, shadcn/ui for website
- 📁 **File Storage**: Integrated file storage system
- 🔐 **Authentication**: JWT-based authentication system
- 🧪 **Testing Setup**: Ready-to-use testing infrastructure
- 🐳 **Docker Support**: Docker Compose for local development
- 📦 **Package Management**: Bun workspaces for efficient dependency management

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.17 or later)
- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/alimehasin/turbo-starter.git
cd turbo-starter
```

2. **Install dependencies**

```bash
bun install
```

3. **Set up environment variables**

```bash
bun run scripts:init:env
```

This will guide you through setting up the necessary environment variables for all applications.

4. **Start the PostgreSQL database**

```bash
docker-compose up -d
```

5. **Run database migrations and seed data**

```bash
bun run db:migrate:dev
bun run db:seed
bun run storage:seed
```

6. **Start all development servers**

```bash
bun run dev
```

This will start:

- Backend API on http://localhost:3000
- Admin Dashboard on http://localhost:3001
- Website on http://localhost:3002

## Project Structure

```
turbo-starter/
├── apps/                   # Application code
│   ├── backend/            # Elysia.js API server with Swagger docs
│   ├── dashboard/          # Next.js + Mantine admin interface
│   └── website/            # Next.js + Tailwind CSS public website
├── packages/               # Shared packages
│   ├── db/                 # Database client, schema & migrations (Prisma)
│   ├── storage/            # File storage utilities and client
│   └── utils/              # Shared utilities, schemas, and types
├── configs/                # Shared TypeScript configurations
│   └── typescript/         # Base, Next.js, and React library configs
├── scripts/                # Development and maintenance scripts
└── docker-compose.yml      # Local PostgreSQL setup
```

## Applications

### 🖥️ Backend (`apps/backend`)

- **Framework**: Elysia.js (High-performance web framework)
- **Features**:
  - Swagger API documentation
  - JWT authentication
  - CORS handling
  - Cron job support
  - Type-safe routes
- **Port**: 3001
- **Docs**: http://localhost:3001/swagger

### 📊 Dashboard (`apps/dashboard`)

- **Framework**: Next.js 15 with App Router
- **UI**: Mantine UI components
- **Features**:
  - Admin interface
  - tRPC for type-safe API calls
  - Data tables with filtering/sorting
  - File upload and management
  - Multi-language support (i18n)
  - Dark/light theme
- **Port**: 3000

### 🌐 Website (`apps/website`)

- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS + shadcn/ui components
- **Features**:
  - Public-facing website
  - tRPC integration
  - Multi-language support (i18n)
  - Theme switching
  - Responsive design
- **Port**: 3002

## Packages

### 🗄️ Database (`packages/db`)

- Prisma ORM setup
- Database schema definitions
- Migration management
- Seed scripts

### 📁 Storage (`packages/storage`)

- File storage client
- Upload utilities
- Asset management

### 🛠️ Utils (`packages/utils`)

- Shared TypeScript utilities
- Common schemas and types
- Helper functions

## Development Workflow

### Available Commands

**Development:**

- `bun run dev` - Start all applications in development mode
- `bun run build` - Build all applications for production
- `bun run start` - Start all applications in production mode

**Code Quality:**

- `bun run format` - Format code with Biome
- `bun run lint` - Lint code with Biome
- `bun run check` - Run Biome format + lint + check
- `bun run typecheck` - Type check all packages

**Database Operations:**

- `bun run db:generate` - Generate Prisma client
- `bun run db:migrate:dev` - Create and apply migrations in development
- `bun run db:migrate:deploy` - Apply migrations in production
- `bun run db:migrate:reset` - Reset database and apply all migrations
- `bun run db:seed` - Seed database with initial data
- `bun run db:studio` - Open Prisma Studio

**Internationalization:**

- `bun run i18n:parse` - Extract translatable strings from code

**Utilities:**

- `bun run storage:seed` - Seed storage with sample files
- `bun run scripts:init:env` - Initialize environment variables
- `bun run scripts:cleanup` - Clean up generated files
- `bun run scripts:reinstall` - Reinstall all dependencies

### Tech Stack Details

**Frontend:**

- **Dashboard**: Next.js 15, React 19, Mantine UI, tRPC, React Query
- **Website**: Next.js 15, React 19, Tailwind CSS, shadcn/ui, tRPC

**Backend:**

- **API**: Elysia.js, JWT authentication, Swagger docs, CORS
- **Database**: PostgreSQL, Prisma ORM
- **Storage**: Custom file storage solution

**Development:**

- **Monorepo**: Turborepo for build orchestration
- **Runtime**: Bun for package management and execution
- **Linting**: Biome for formatting and linting
- **TypeScript**: Full type safety across all packages

## Environment Variables

Each application has its own environment configuration:

- **Backend**: `apps/backend/.env`
- **Dashboard**: `apps/dashboard/.env`
- **Website**: `apps/website/.env`
- **Database**: `packages/db/.env`

Use `bun run scripts:init:env` to set up all required environment variables interactively.

## Best Practices

- 🏗️ **Architecture**: Keep shared code in `packages/`, app-specific code in `apps/`
- 🔒 **Type Safety**: Use TypeScript throughout, leverage tRPC for API calls
- 📝 **Commits**: Follow conventional commit format
- 🧪 **Testing**: Write tests for shared utilities and critical business logic
- 🌍 **Internationalization**: Use the i18n setup for multi-language support
- 📦 **Dependencies**: Keep dependencies updated, use workspace references

## Deployment

This starter is designed to be platform-agnostic and can be deployed to:

- **Vercel**: Ideal for Next.js applications (dashboard, website)
- **Railway/Render**: Great for the Elysia.js backend
- **Docker**: All applications include Docker support
- **VPS/Cloud**: Direct deployment with PM2 (ecosystem.config.js included)

### Production Build

```bash
bun run build
```

Each application will be built and optimized for production.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contributors

We welcome new contributors!

<a href="https://github.com/alimehasin/turbo-starter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=alimehasin/turbo-starter" />
</a>

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Built with ❤️ by the Turbo Starter community
</p>
