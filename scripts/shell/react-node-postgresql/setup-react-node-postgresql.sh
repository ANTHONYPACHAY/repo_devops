#!/bin/bash

# Variables
NODE_VERSION="14.x"
POSTGRES_USER="student"
POSTGRES_PASSWORD="password"
POSTGRES_DB="studentdb"

# Actualizar paquetes
sudo apt-get update

# Instalación de Node.js y React
curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g create-react-app

# Crear un nuevo proyecto React
npx create-react-app my-react-app

# Instalación y configuración de PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib
sudo service postgresql start
sudo -u postgres psql -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;"
sudo -u postgres psql -c "ALTER USER $POSTGRES_USER CREATEDB;"

# Información de finalización
echo "Instalación y configuración completas."
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "React app creada en 'my-react-app'."
echo "Base de datos PostgreSQL '$POSTGRES_DB' creada con el usuario '$POSTGRES_USER'."
