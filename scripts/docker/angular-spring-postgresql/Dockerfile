# Etapa 1: Construcción de la aplicación Angular
FROM node:14 as build-angular
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build --prod

# Etapa 2: Construcción de la aplicación Spring Boot
FROM maven:3.6.3-jdk-11 as build-spring
WORKDIR /app
COPY backend/pom.xml backend/pom.xml
RUN mvn dependency:go-offline
COPY backend/src /app/src
RUN mvn clean package -DskipTests

# Etapa 3: Configuración de PostgreSQL
FROM postgres:13 as db
ENV POSTGRES_DB=your_db
ENV POSTGRES_USER=your_user
ENV POSTGRES_PASSWORD=your_password
COPY db/init.sql /docker-entrypoint-initdb.d/

# Etapa 4: Configuración final
FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=build-spring /app/target/backend-0.0.1-SNAPSHOT.jar backend.jar
COPY --from=build-angular /app/dist/frontend /app/public
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "backend.jar"]
