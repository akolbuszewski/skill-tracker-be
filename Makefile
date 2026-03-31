.PHONY: help up down restart logs api-shell psql generate generate-host generate-all migrate reset test build lint format studio

help:
	@echo "Common targets:"
	@echo "  make up         - start postgres + api (dev)"
	@echo "  make down       - stop containers"
	@echo "  make restart    - restart containers"
	@echo "  make logs       - tail api logs"
	@echo "  make api-shell  - shell inside api container"
	@echo "  make psql       - psql inside postgres container"
	@echo "  make generate   - prisma generate (in api container)"
	@echo "  make generate-host - prisma generate (on host, for IDE types)"
	@echo "  make generate-all  - generate in container + host"
	@echo "  make migrate    - prisma migrate dev (NAME=...)"
	@echo "  make reset      - prisma migrate reset (DANGEROUS)"
	@echo "  make test       - run jest on host"

up:
	docker compose up --build

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f api

api-shell:
	docker compose exec api sh

psql:
	docker compose exec postgres psql -U postgres -d skill_trainer

generate:
	docker compose exec api npm run db:generate

generate-host:
	npm run db:generate

generate-all: generate generate-host

migrate:
	docker compose exec api npm run db:migrate -- --name $(NAME)

reset:
	docker compose exec api npm run db:reset

studio:
	docker compose exec api npm run db:studio -- --hostname 0.0.0.0 --port 5555

test:
	npm test

build:
	npm run build

lint:
	npm run lint

format:
	npm run format
