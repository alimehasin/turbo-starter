FROM oven/bun:latest AS base


# =================================
# ========== Build stage ==========
# =================================
FROM base AS builder

# Set working directory
WORKDIR /app
COPY . .
RUN bun add -g turbo
RUN turbo prune @repo/backend --docker


# =====================================
# ========== Installer stage ==========
# =====================================
FROM base AS installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN bun install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN bun db:generate
RUN bun run build


# ==================================
# ========== Runner stage ==========
# ==================================
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 bunuser
RUN adduser --system --uid 1001 bunuser
USER bunuser

# Copy the necessary files for the backend
COPY --from=installer /app/apps/backend/dist ./

CMD ["bun", "index.js"]
