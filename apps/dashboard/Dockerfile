# Use Bun's official image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/dashboard/package.json ./apps/dashboard/
COPY configs/ ./configs/

# Install dependencies using lockfile for exact versions
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
WORKDIR /app/apps/dashboard
RUN bun run build

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 bunuser

# Change ownership of app directory
RUN chown -R bunuser:nodejs /app

# Switch to non-root user
USER bunuser

# Expose port
EXPOSE 3001

# Start the application
CMD ["bun", "run", "start"]
