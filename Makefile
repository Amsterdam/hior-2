# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://git.datapunt.amsterdam.nl/Datapunt/python-best-practices/blob/master/dependency_management/
#
# VERSION = 2020.01.29
.PHONY: app

dc = docker compose
run = $(dc) run --rm

help:                               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:                              ## Build docker image
	$(dc) build

push: build                         ## Push prod image to Amsterdam registry
	$(dc) push

app:                                ## Run app
	$(run) --service-ports dev

dev:						        ## Run the development app
	$(run) --service-ports dev

test: build                         ## Execute tests
	$(run) test $(ARGS)

clean:                              ## Clean docker stuff
	$(dc) down -v --remove-orphans

trivy:                              ## Detect image vulnerabilities
	trivy image --ignore-unfixed nginxinc/nginx-unprivileged:mainline-alpine-slim

push:                               ## Push image to docker hub
	$(dc) push

csv-update:
	$(run) csv-update $(ARGS)

requirements:                       ## Upgrade dependencies
	$(run) upgrade $(ARGS)
