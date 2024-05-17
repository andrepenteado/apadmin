VERSAO_APP := $(shell mvn help:evaluate -Dexpression=project.version -q -DforceStdout --file backend/pom.xml)
#VERSAO_FRONTEND := $(shell cd frontend && npm pkg get version | sed 's/"//g')

build:
	echo $(GITHUB_TOKEN) | docker login ghcr.io --username andrepenteado --password-stdin
	cd ./frontend/ && ng build --configuration=production --output-path=dist/production && cd ../
	mvn -U clean package --file backend/pom.xml -DskipTests
	docker build -f .docker/dockerfiles/backend -t ghcr.io/andrepenteado/apadmin/backend -t ghcr.io/andrepenteado/apadmin/backend:$VERSAO .
	docker build -f .docker/dockerfiles/frontend -t ghcr.io/andrepenteado/apadmin/frontend -t ghcr.io/andrepenteado/apadmin/frontend:$VERSAO .
	docker push ghcr.io/andrepenteado/apadmin/backend
	docker push ghcr.io/andrepenteado/apadmin/backend:$VERSAO
	docker push ghcr.io/andrepenteado/apadmin/frontend
	docker push ghcr.io/andrepenteado/apadmin/frontend:$VERSAO
	cd ./frontend/ && ng build --configuration=localhost --output-path=dist/localhost && cd ../
	docker build -f .docker/dockerfiles/frontend --build-arg AMBIENTE=localhost -t ghcr.io/andrepenteado/apadmin/frontend:dev .
	docker push ghcr.io/andrepenteado/apadmin/frontend:dev
	docker logout ghcr.io

update:
	echo $(GITHUB_TOKEN) | docker login ghcr.io --username andrepenteado --password-stdin
#	$(MAKE) stop
	docker image pull postgres:16
	docker image pull ghcr.io/andrepenteado/apadmin/backend
	docker image pull ghcr.io/andrepenteado/apadmin/frontend
	docker logout ghcr.io
#	$(MAKE) start

start-dev:
	docker compose -f .docker/postgresql.yml up -d
	mvn -f backend/pom.xml clean spring-boot:run -Dspring-boot.run.profiles=dev
