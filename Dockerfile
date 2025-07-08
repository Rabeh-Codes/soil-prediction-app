# ---------- Stage 1: Build the app ----------
FROM node:18-alpine AS builder

# 1️⃣ Install system dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy dependency files first (optimize Docker caching)
COPY package.json package-lock.json ./

# 4️⃣ Install dependencies for production only
RUN npm ci --only=production --legacy-peer-deps --prefer-offline

# 5️⃣ Copy entire app source
COPY . .

# Build for production
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# 7️⃣ Clean default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# 8️⃣ Copy built app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# 9️⃣ Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🔟 Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# 1️⃣1️⃣ Expose HTTP port
EXPOSE 80

# 1️⃣2️⃣ Health check to ensure server is up
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost >/dev/null || exit 1

# 1️⃣3️⃣ Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]