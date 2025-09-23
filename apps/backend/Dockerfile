# Use Bun's official image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/backend/package.json ./apps/backend/
COPY configs/ ./configs/

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Generate Prisma client and build
WORKDIR /app/apps/backend
RUN bunx prisma generate && bun run build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 bunuser

# Change ownership of app directory
RUN chown -R bunuser:nodejs /app

# Switch to non-root user
USER bunuser

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["bun", "run", "start"]
