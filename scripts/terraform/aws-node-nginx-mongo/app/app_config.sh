#!/usr/bin/env bash
sleep 30

# Install node js
curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install build-essential -y

# Install pm2
sudo npm install -g pm2

# Install NGINX
sudo apt update -y
sudo apt-get install nginx -y
systemctl enable nginx
sudo rm /etc/nginx/sites-enabled/default
sudo mv /tmp/node /etc/nginx/sites-available/node
sudo ln -s /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node
# sudo systemctl restart nginx
service nginx restart

# Setup firewall
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
ufw enable


# Configure pm2 to run app on startup
mkdir -p ~/code/app-dist
mv /tmp/hello.js ~/code/app-dist/hello.js
cd  ~/code/app-dist/

# Instalar dotenv y mongodb npm packages
sudo npm init -y # Crea un package.json si no existe
sudo npm install dotenv mongodb express
sudo apt-get install -y mongodb-clients

#Iniciar el Node.js
sudo pm2 start hello.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list

sudo shutdown -r now
exit 0