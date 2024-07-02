#!/bin/bash

# Establece la opción para detener el script si hay errores
set -e

# Muestra un mensaje de inicio
echo "Empezando instalaciones..."

# Instala las dependencias
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential libssl-dev git nginx nodejs npm

# Elimina el directorio existente antes de copiar
sudo rm -rf /var/www/my-mean-app

# Crea la estructura de directorios
sudo mkdir -p /var/www/my-mean-app/node_app

# Copia la aplicación Node.js
sudo cp -r /tmp/index.js /var/www/my-mean-app/node_app

# Crea un archivo package.json básico si no existe
echo '{"name": "my-mean-app", "version": "1.0.0", "main": "index.js", "scripts": {"start": "node index.js"}}' | sudo tee /var/www/my-mean-app/node_app/package.json

# Ajusta los permisos del directorio
sudo chown -R ubuntu:ubuntu /var/www/my-mean-app

# Imprime el PATH actual
echo $PATH

# Imprime información sobre el contenido de /var/www/my-mean-app
ls -la /var/www/my-mean-app

# Inicializa la aplicación
cd /var/www/my-mean-app/node_app
npm install
npm install express
nohup npm start > /dev/null 2>&1 &

# Muestra un mensaje de salida
echo "Finalizando instalaciones..."