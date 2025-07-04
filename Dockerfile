 # Stage 1: Build the React application
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Set environment variable to production during build
ENV NODE_ENV=production

# Copy package definition files to leverage Docker cache
COPY package*.json ./

# Install dependencies with cache to speed up builds (ensure BuildKit enabled)
ENV HUSKY=0
RUN --mount=type=cache,target=/root/.npm \
    npm install --legacy-peer-deps

# Copy the rest of the project files
COPY . .

# Build the app (Vite outputs to dist folder)
RUN npm run build

# Stage 2: Serve the built app using Nginx
FROM nginx:alpine-slim

# Create a non-root user to run Nginx (improves security)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy built files from the builder stage to Nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration (make sure nginx.conf exists in your project)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]