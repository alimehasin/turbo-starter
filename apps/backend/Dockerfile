# Use Bun's official image
FROM oven/bun:latest AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/backend/package.json ./apps/backend/
COPY configs/ ./configs/

# Install dependencies
RUN bun install

# Build the application
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate Prisma client
WORKDIR /app/apps/backend
RUN bunx prisma generate

# Build the application
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunuser

# Copy built application
COPY --from=builder --chown=bunuser:nodejs /app/apps/backend/dist ./dist
COPY --from=builder --chown=bunuser:nodejs /app/apps/backend/prisma ./prisma
COPY --from=builder --chown=bunuser:nodejs /app/apps/backend/package.json ./package.json
COPY --from=builder --chown=bunuser:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER bunuser

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["bun", "run", "start"]
