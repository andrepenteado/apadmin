VERSAO_APP := $(shell mvn help:evaluate -Dexpression=project.version -q -DforceStdout --file backend/pom.xml)

build:
	echo $(GITHUB_TOKEN) | docker login ghcr.io --username andrepenteado --password-stdin
	cd ./frontend/ && ng build --configuration=production --output-path=dist/production && cd ../
	mvn -U clean package -DskipTests --file backend/pom.xml
	docker build -f .docker/dockerfiles/backend -t ghcr.io/andrepenteado/apadmin-backend -t ghcr.io/andrepenteado/apadmin-backend:$(VERSAO_APP) .
	docker build -f .docker/dockerfiles/frontend -t ghcr.io/andrepenteado/apadmin-frontend -t ghcr.io/andrepenteado/apadmin-frontend:$(VERSAO_APP) .
	docker push ghcr.io/andrepenteado/apadmin-backend
	docker push ghcr.io/andrepenteado/apadmin-backend:$(VERSAO_APP)
	docker push ghcr.io/andrepenteado/apadmin-frontend
	docker push ghcr.io/andrepenteado/apadmin-frontend:$(VERSAO_APP)
	cd ./frontend/ && ng build --configuration=localhost --output-path=dist/localhost && cd ../
	docker build -f .docker/dockerfiles/frontend --build-arg AMBIENTE=localhost -t ghcr.io/andrepenteado/apadmin-frontend:dev .
	docker push ghcr.io/andrepenteado/apadmin-frontend:dev
	docker logout ghcr.io

start:
	docker compose -f .docker/composes/docker-compose.yml up -d

stop:
	docker compose -f .docker/composes/docker-compose.yml down

log:
	docker compose -f .docker/composes/docker-compose.yml logs -f

update:
	echo $(GITHUB_TOKEN) | docker login ghcr.io --username andrepenteado --password-stdin
	$(MAKE) stop
	docker image pull postgres:16
	docker image pull ghcr.io/andrepenteado/apadmin-backend
	docker image pull ghcr.io/andrepenteado/apadmin-frontend
	docker logout ghcr.io
	$(MAKE) start
