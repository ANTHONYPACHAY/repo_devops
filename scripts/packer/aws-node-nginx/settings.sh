#!/bin/bash

# Establece la opción para detener el script si hay errores
set -e

# Muestra un mensaje de inicio
echo "Empezando configuraciones finales..."

# Elimina el enlace simbólico llamado default
sudo rm /etc/nginx/sites-enabled/default

# Copia el archivo de configuración de Nginx a la ubicación correcta
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/default

# Crea un enlace simbólico para activar la configuración en Nginx
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default 

# Ajusta los permisos del archivo de configuración de Nginx
sudo chmod 644 /etc/nginx/sites-available/default

# Reinicia Nginx para aplicar los cambios en la configuración
sudo systemctl restart nginx

# Instala PM2 si no está instalado
sudo npm install -g pm2

# Inicia el pm2 en segundo plano con privilegios de administrador
sudo pm2 startup

# Muestra el estado de PM2 y busca la línea que indica si está 'active (running)'
pm2 status

# Muestra un mensaje de inicio
echo "Configuraciones finalizadas..."