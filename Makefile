TTY := $(shell [ -t 0 ] && echo "it" || echo "")
DOCKER_EXEC = docker exec -$(TTY)

rebuild-full: down
	@echo "🚀 Starting full rebuild process..."
	@which node >/dev/null || (echo "❌ Node.js not installed!"; exit 1)
	@test -f package.json || (echo "❌ package.json missing!"; exit 1)
	@if [ -d "node_modules" ]; then \
		sudo chown -R $(shell whoami):$(shell id -gn) node_modules || true; \
		sudo chmod -R 755 node_modules || true; \
	fi
	@rm -rf node_modules .npmcache package-lock.json
	@npm install --no-audit --legacy-peer-deps --prefer-offline || (echo "❌ Dependency installation failed"; exit 1)
	@DOCKER_BUILDKIT=1 docker build -f docker/Dockerfile.dev --no-cache --pull -t soil-app-dev .
	@docker run -d -p 3000:3000 \
		-v $(PWD):/usr/src/app \
		-v soil-app-node_modules:/usr/src/app/node_modules \
		--name soil-prediction-dev \
		soil-app-dev
	@echo "✅ Rebuild completed successfully!"

rebuild-cached:
	@docker build -f docker/Dockerfile.dev -t soil-app-dev .
	@docker restart soil-prediction-dev || true
	@echo "✅ Rebuild completed (cached)!"

build-prod:
	@docker build -f docker/Dockerfile.prod -t soil-app-prod .
	@echo "✅ Production image built"

run-prod:
	@docker run -d -p 8080:80 --name soil-app-prod soil-app-prod
	@echo "✅ Production container running at http://localhost:8080"

install:
	@$(DOCKER_EXEC) soil-prediction-dev npm install $(pkgs) --legacy-peer-deps --no-audit
	@echo "✅ Packages installed: $(pkgs)"

check:
	@$(DOCKER_EXEC) soil-prediction-dev npm list $(pkg)

audit:
	@$(DOCKER_EXEC) soil-prediction-dev npm audit fix --force

dev:
	@$(DOCKER_EXEC) soil-prediction-dev npm run dev

test:
	@$(DOCKER_EXEC) soil-prediction-dev npm run test

down:
	@docker stop soil-prediction-dev || true
	@docker rm soil-prediction-dev || true
	@docker volume rm soil-app-node_modules || true
	@echo "🛑 Containers stopped and removed"

logs:
	@docker logs -f soil-prediction-dev

sh:
	@$(DOCKER_EXEC) soil-prediction-dev sh

restart:
	@docker restart soil-prediction-dev
	@echo "🔄 Container restarted"

clean:
	@docker system prune -af
	@echo "🧹 Docker system cleaned!"

help:
	@echo "Usage:"
	@echo "  make rebuild-full"
	@echo "  make rebuild-cached"
	@echo "  make build-prod"
	@echo "  make run-prod"
	@echo "  make install pkgs='pkg1 pkg2'"
	@echo "  make check pkg=react"
	@echo "  make audit"
	@echo "  make dev"
	@echo "  make test"
	@echo "  make down"
	@echo "  make logs"
	@echo "  make sh"
	@echo "  make restart"
	@echo "  make clean"
	@echo "  make help"