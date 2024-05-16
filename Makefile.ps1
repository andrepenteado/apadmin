param(
    [Parameter()]
    [string]$exec
)

switch($exec) {
    "build-all" {
        Get-Content 'Z:\Nuvem\Documentos\Particular\token-github.txt' | docker login ghcr.io --username andrepenteado --password-stdin
        Get-Content 'C:\Users\André Penteado\Documents\Particular\token-github.txt' | docker login ghcr.io --username andrepenteado --password-stdin
        cd ./frontend/ && ng build --configuration=production --output-path=dist/production && cd ../
        $VERSAO = mvn help:evaluate '-Dexpression=project.version' '-q' '-DforceStdout' '-f' './backend/pom.xml'
        mvn -U clean package -DskipTests -f ./backend/pom.xml
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
    }
    Default {
        "`nInforme o parâmetro: -exec <target>`n"
    }
}
