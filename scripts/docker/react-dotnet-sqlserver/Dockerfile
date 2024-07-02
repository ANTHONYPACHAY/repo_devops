# Etapa 1: Construcción de la aplicación React
FROM node:14 as build-react
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etapa 2: Construcción de la aplicación .NET Core
FROM mcr.microsoft.com/dotnet/sdk:5.0 as build-dotnet
WORKDIR /app
COPY backend/*.csproj ./
RUN dotnet restore
COPY backend/ .
RUN dotnet publish -c Release -o out

# Etapa 3: Configuración de SQL Server
FROM mcr.microsoft.com/mssql/server:2019-latest as db
ENV SA_PASSWORD=YourPassword123
ENV ACCEPT_EULA=Y
COPY db/init.sql /usr/src/app/

# Etapa 4: Configuración final
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-dotnet /app/out .
COPY --from=build-react /app/build /app/public
EXPOSE 80
ENTRYPOINT ["dotnet", "backend.dll"]
