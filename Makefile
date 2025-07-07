# 🚀 Enhanced Makefile for Docker/NPM Projects

# 📦 Full rebuild with clean state (use when dependencies are broken)
rebuild-full: down
	@echo "🚀 Starting full rebuild process..."
	
	@echo "1️⃣ Checking prerequisites..."
	@which node || (echo "❌ Node.js not installed!" && exit 1)
	@test -f package.json || (echo "❌ package.json missing!" && exit 1)
	
	@echo "2️⃣ Cleaning up..."
	@rm -rf node_modules
	@rm -f package-lock.json
	
	@echo "3️⃣ Installing dependencies..."
	@npm install --silent --no-audit --legacy-peer-deps || \
		(echo "❌ Dependency installation failed" && exit 1)
	
	@echo "4️⃣ Building Docker containers..."
	@DOCKER_BUILDKIT=1 docker-compose build --no-cache --pull || \
		(echo "❌ Docker build failed" && exit 1)
	
	@echo "5️⃣ Starting services..."
	@docker-compose up -d
	@echo "✅ Rebuild completed successfully! 🎉"

# 🔄 Rebuild using cache (recommended for daily use)
rebuild-cached:
	@echo "♻️ Rebuilding with cache..."
	@docker-compose build --pull --build-arg BUILDKIT_INLINE_CACHE=1
	@docker-compose up -d
	@echo "✅ Rebuild completed (cached)!"

# 📥 Install packages in container (supports multiple packages)
# Usage: make install pkgs="react-helmet-async react-error-boundary"
install:
	@docker exec -it soil-prediction-dev npm install $(pkgs) --legacy-peer-deps --no-audit
	@echo "✅ Packages installed: $(pkgs)"

# 🔍 Check specific dependency version
# Usage: make check pkg=react
check:
	@docker exec -it soil-prediction-dev npm list $(pkg)

# 🛠️ Audit and fix dependencies
audit:
	@docker exec -it soil-prediction-dev npm audit fix --force

# 🧹 Stop and clean all containers
down:
	@docker-compose down --remove-orphans
	@echo "🛑 Containers stopped and removed"

# 📜 Tail container logs (with follow)
logs:
	@docker-compose logs -f --tail=100

# 💻 Enter development container shell
sh:
	@docker exec -it soil-prediction-dev sh

# 🏷️ Show help message
help:
	@echo "Usage:"
	@echo "  make rebuild-full    # Full clean rebuild"
	@echo "  make rebuild-cached  # Faster cached rebuild"
	@echo "  make install pkgs='pkg1 pkg2' # Install packages"
	@echo "  make check pkg=react # Check package version"
	@echo "  make audit          # Fix vulnerabilities"
	@echo "  make logs           # View container logs"
	@echo "  make sh             # Enter container shell"