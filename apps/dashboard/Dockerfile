# Use Bun's official image
FROM oven/bun:latest AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/dashboard/package.json ./apps/dashboard/
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

# Build the application
WORKDIR /app/apps/dashboard
RUN bun run build

# Production image
FROM base AS runner
WORKDIR /app/apps/dashboard

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bunuser

# Copy built application
COPY --from=builder --chown=bunuser:nodejs /app/apps/dashboard/.next ./.next
COPY --from=builder --chown=bunuser:nodejs /app/apps/dashboard/package.json ./package.json
COPY --from=builder --chown=bunuser:nodejs /app/apps/dashboard/next.config.ts ./next.config.ts
COPY --from=builder --chown=bunuser:nodejs /app/apps/dashboard/src ./src
COPY --from=builder --chown=bunuser:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER bunuser

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["bun", "run", "start"]
