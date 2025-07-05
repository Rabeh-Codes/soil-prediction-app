# ---------- Stage 1: Build the app ----------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app
# install wget
RUN apk add --no-cache wget
# Copy only dependency metadata
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire app source
COPY . .

# Build for production
RUN npm run build


# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine

# Clean default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files to Nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]