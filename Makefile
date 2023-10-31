# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://git.datapunt.amsterdam.nl/Datapunt/python-best-practices/blob/master/dependency_management/
#
# VERSION = 2020.01.29
.PHONY: app manifests

dc = docker-compose
run = $(dc) run --rm
ENVIRONMENT ?= local
VERSION ?= latest
HELM_ARGS = manifests/chart \
	-f manifests/values.yaml \
	-f manifests/env/${ENVIRONMENT}.yaml \
	--set image.tag=${VERSION} \
	--set image.registry=${REGISTRY}

help:                               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:                              ## Build docker image
	$(dc) build

app:                                ## Run app
	$(run) --service-ports web

test: build                         ## Execute tests
	$(run) unittest $(ARGS)

clean:                              ## Clean docker stuff
	$(dc) down -v --remove-orphans

trivy:                              ## Detect image vulnerabilities
	trivy image --ignore-unfixed nginxinc/nginx-unprivileged:mainline-alpine-slim

push:                               ## Push image to docker hub
	$(dc) push

update-chart:
	rm -rf manifests/chart
	git clone --branch 1.9.0 --depth 1 git@github.com:Amsterdam/helm-application.git manifests/chart
	rm -rf manifests/chart/.git

manifests:
	@helm template hior $(HELM_ARGS) $(ARGS)

deploy: manifests
	helm upgrade --install hior $(HELM_ARGS) $(ARGS)