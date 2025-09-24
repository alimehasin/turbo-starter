# Use Bun's official image
FROM oven/bun:latest

# Specify Args
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_STORAGE_BASE_URL

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/dashboard/package.json ./apps/dashboard/
COPY configs/ ./configs/

# Install dependencies using lockfile for exact versions
RUN bun install

# Copy source code
COPY . .

# Pass build-time env
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_STORAGE_BASE_URL=$NEXT_PUBLIC_STORAGE_BASE_URL

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
