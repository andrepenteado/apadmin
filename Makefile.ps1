param(
    [Parameter()]
    [string]$exec
)

switch($exec) {
    "build" {
        Get-Content 'C:\Users\André Penteado\Documents\Particular\token-github.txt' | docker login ghcr.io --username andrepenteado --password-stdin
        npm --prefix ./frontend run build --omit=dev -- "-c=production"
        $VERSAO = mvn help:evaluate '-Dexpression=project.version' '-q' '-DforceStdout' '--file backend/pom.xml'
        mvn -U clean package -DskipTests --file backend/pom.xml
        docker build -f .docker/Dockerfile.pipeline -t ghcr.io/andrepenteado/apadmin -t ghcr.io/andrepenteado/apadmin:$VERSAO .
        docker push ghcr.io/andrepenteado/apadmin
        docker push ghcr.io/andrepenteado/apadmin:$VERSAO
        docker logout ghcr.io
    }
    "start" {
        docker compose -f .docker/docker-compose.yml up -d
    }
    "stop" {
        docker compose -f .docker/docker-compose.yml down
    }
    "log" {
        docker compose -f .docker/docker-compose.yml logs -f
    }
    "update" {
        Get-Content 'C:\Users\André Penteado\Documents\Particular\token-github.txt' | docker login ghcr.io --username andrepenteado --password-stdin
        docker image pull postgres:16
        docker image pull ghcr.io/andrepenteado/apadmin
        docker logout ghcr.io
    }
    "start-backend-dev" {
        mvn -f backend/pom.xml clean spring-boot:run -Dspring-boot.run.profiles=dev
    }
    Default {
        "`nInforme o parâmetro: -exec <target>`n"
    }
}
