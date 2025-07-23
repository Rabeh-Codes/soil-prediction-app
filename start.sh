#!/bin/sh

# Enable strict mode for error handling
set -e

# Generate SCSS module type definitions in watch mode
npx typed-scss-modules src/styles --watch &

# Choose Vite config file based on environment (fallback to vite.config.ts)
CONFIG_FILE="vite.config.ts"
if [ -f vite.config.docker.ts ]; then
  CONFIG_FILE="vite.config.docker.ts"
fi

# Start the Vite development server with proper host/port settings for Docker
npx vite --config "$CONFIG_FILE" --host 0.0.0.0 --port 3000

# Prevent the container from exiting immediately by waiting for background processes
wait
