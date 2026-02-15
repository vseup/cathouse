.PHONY: help dev dev-detached up down down-volumes build clean logs logs-api logs-client logs-db db-migrate db-seed ps restart restart-api restart-client

help: ## Show help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

dev: ## Start development environment
	docker compose --env-file .env.dev up --build

dev-detached: ## Start development environment in background
	docker compose --env-file .env.dev up --build -d

up: dev-detached db-migrate db-seed

down: ## Stop all services
	docker compose down

down-volumes: ## Stop all services and remove volumes (deletes data!)
	docker compose down -v

build: ## Build all images
	docker compose build

clean: ## Remove all containers, networks, and images
	docker compose down -v --rmi all

logs: ## Show logs from all services
	docker compose logs -f

logs-api: ## Show API logs
	docker compose logs -f api-dev

logs-client: ## Show client logs
	docker compose logs -f client-dev

logs-db: ## Show database logs
	docker compose logs -f postgres

db-migrate: ## Run database migrations (development)
	docker compose --env-file .env.dev exec api-dev npx prisma migrate dev

db-seed: ## Seed database (development)
	docker compose --env-file .env.dev exec api-dev npx prisma db seed

ps: ## Show running containers
	docker compose ps

restart: ## Restart all services
	docker compose restart

restart-api: ## Restart API service
	docker compose --env-file .env.dev restart api-dev

restart-client: ## Restart client service
	docker compose --env-file .env.dev restart client-dev
