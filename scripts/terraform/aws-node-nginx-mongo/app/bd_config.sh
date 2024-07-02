#!/usr/bin/env bash
sleep 30

sudo apt-get update

# Install mongo
sudo apt-get install -y mongodb

mongo --eval 'db.createUser({user: "my_user", pwd: "my_password", roles: [{role: "readWrite", db: "my_db"}]})'

mongo my_db --eval 'db.createCollection("my_collection")'

# Ruta al archivo de configuración de MongoDB
CONFIG_FILE="/etc/mongodb.conf"

# Realiza una copia de seguridad del archivo de configuración original
sudo cp $CONFIG_FILE ${CONFIG_FILE}.bak

# Cambia '127.0.0.1' por '0.0.0.0' en la configuración de 'bindIp'
sudo sed -i 's/bind_ip = 127.0.0.1/bind_ip = 0.0.0.0/' $CONFIG_FILE

# Reinicia el servicio MongoDB para aplicar los cambios
sudo systemctl restart mongodb

log "Configuración de MongoDB actualizada y servicio reiniciado."

exit 0