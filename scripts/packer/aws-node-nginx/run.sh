#!/bin/bash

# Establece la opción para detener el script si hay errores
set -e

# Muestra un mensaje de inicio
echo "Ejecutando proyecto..."

# Muestra el estado de PM2 y busca la línea que indica si está 'active (running)'
pm2 list

# Cambia al directorio de la aplicación Node.js
cd /var/www/my-mean-app/node_app/

# Inicia la aplicación Node.js con PM2
sudo pm2 start index.js --force

# Realiza una solicitud de prueba a la aplicación en el puerto 3000
curl http://localhost:3000

# Muestra la lista de aplicaciones
pm2 status

# Imprime un mensaje indicando que la aplicación MEAN está instalada y funcionando correctamente
echo 'Aplicación MEAN instalada y funcionando exitosamente.'
