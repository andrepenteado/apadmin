# Stage 1 - Angular
FROM node:18 AS angular
WORKDIR /frontend
COPY /frontend/ /frontend/
RUN npm --prefix ./frontend install
RUN npm --prefix ./frontend run build --omit=dev

# Stage 2 - Build
FROM maven:3-amazoncorretto-21-debian AS build
WORKDIR /backend/
COPY /backend/ /backend/
COPY --from=angular /frontend/backend/src/main/resources/static/ /backend/src/main/resources/static/
RUN mvn -U clean package --file /backend/pom.xml -DskipTests

# Stage 3 - Deploy
FROM amazoncorretto:21
WORKDIR /apadmin
COPY --from=build /backend/target/apadmin.jar /apadmin/apadmin.jar
ENTRYPOINT [ "java", "-jar", "/apadmin.jar" ]
EXPOSE 8080
