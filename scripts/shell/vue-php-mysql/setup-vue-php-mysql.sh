#!/bin/bash

# Variables
MYSQL_USER="student"
MYSQL_PASSWORD="password"
MYSQL_DATABASE="studentdb"

# Actualizar paquetes
sudo apt-get update

# Instalación de Node.js y Vue CLI
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g @vue/cli

# Crear un nuevo proyecto Vue
vue create my-vue-app -d

# Instalación de PHP
sudo apt-get install -y php libapache2-mod-php php-mysql

# Instalación y configuración de MySQL
sudo apt-get install -y mysql-server
sudo service mysql start
sudo mysql -e "CREATE USER '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';"
sudo mysql -e "CREATE DATABASE $MYSQL_DATABASE;"
sudo mysql -e "GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Ajuste de permisos y configuración inicial
sudo usermod -aG www-data $USER

# Información de finalización
echo "Instalación y configuración completas."
echo "Node.js version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "Vue app creada en 'my-vue-app'."
echo "Base de datos MySQL '$MYSQL_DATABASE' creada con el usuario '$MYSQL_USER'."
