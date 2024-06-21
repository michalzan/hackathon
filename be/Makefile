#!/usr/bin/make
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/

.PHONY: export-dependencies
.SILENT: export-dependencies
export-dependencies: ## Export Python dependencies to requirements.txt for Docker
	poetry export --without-hashes --format=requirements.txt > requirements.txt

.PHONY: run-dev
.SILENT: run-dev
run-dev:
	fastapi dev api.py

.PHONY: build
.SILENT: build
build:
	make export-dependencies && docker build .
