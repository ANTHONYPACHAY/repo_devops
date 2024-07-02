Instrucciones para `setup-node-nginx.json`

Este archivo de configuración de Packer crea una imagen de máquina virtual preconfigurada que incluye un entorno de desarrollo con Node.js y Nginx.

### Contenido del setup-node-nginx.json:

1. **Variables**
   - `aws_access_key`: Clave de acceso de AWS (se obtiene del entorno).
   - `aws_secret_key`: Clave secreta de AWS (se obtiene del entorno).

2. **Builders**
   - `type`: Tipo de builder (`amazon-ebs` en este caso).
   - `access_key` y `secret_key`: Claves de acceso de AWS.
   - `region`: Región de AWS.
   - `source_ami`: ID de la AMI base.
   - `instance_type`: Tipo de instancia de AWS (`t2.micro`).
   - `ssh_username`: Nombre de usuario para la conexión SSH.
   - `ami_name`: Nombre de la AMI creada.
   - `subnet_id`: ID de la subred de AWS.

3. **Provisioners**
   - `file`: Copia archivos locales a la instancia.
     - `source`: Archivo fuente en la máquina local.
     - `destination`: Ubicación de destino en la instancia.
   - `shell`: Ejecuta comandos shell en la instancia.
     - `inline`: Lista de comandos shell.

### Archivos utilizados:

1. **install.sh:**

```sh
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

2. **settings.sh:**

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

3. **settings.sh:**

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

### Pasos para ejecutar el setup-node-nginx.json:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del archivo de configuración en un archivo llamado `setup-node-nginx.json`.

2. **Configurar las variables de entorno de AWS:**
   - Asegúrate de que las variables de entorno `AWS_ACCESS_KEY_USER` y `AWS_SECRET_KEY_USER` estén configuradas en tu terminal.

3. **Ejecutar Packer:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para iniciar el proceso de creación de la imagen:
     ```sh
     packer build setup-node-nginx.json
     ```

### Modificaciones posibles:

1. **Usuario y Contraseña de MongoDB:**
   - Cambia el nombre del usuario y la contraseña de MongoDB en el script de provisionamiento.

2. **Proyecto Node.js:**
   - Cambia el nombre del proyecto Node.js en el script de provisionamiento.

3. **ID de la subred:**
   - Cambia el ID de la subred en la configuración del builder:
     ```json
     "subnet_id": "nuevo_subnet_id"
     ```

4. **Tipo de instancia:**
   - Cambia el tipo de instancia en la configuración del builder:
     ```json
     "instance_type": "nuevo_tipo_instancia"
     ```

5. **Región de AWS:**
   - Cambia la región en la configuración del builder:
     ```json
     "region": "nueva_region"
     ```

### Requisitos previos:

- **Instalación de Packer:**
  - Packer debe estar instalado en tu sistema. Si no está instalado, sigue estas instrucciones para instalarlo:
    - Descarga e instala Packer desde [Packer Downloads](https://www.packer.io/downloads).

- **Configuración de las credenciales de AWS:**
  - Asegúrate de que las credenciales de AWS están configuradas en tu sistema. Puedes configurarlas utilizando el AWS CLI:
    ```sh
    aws configure
    ```

### Descripción de cada tarea:

1. **Configuración de la instancia de AWS:**
   - Utiliza `amazon-ebs` como builder para crear una AMI basada en Ubuntu 18.04.
   - Configura la instancia con 4096 MB de memoria y 2 CPUs.
   - Utiliza las claves de acceso de AWS y la región especificada para crear la AMI.

2. **Provisioning de la instancia:**
   - Actualiza los paquetes del sistema utilizando `apt-get update`.
   - Descarga e instala Node.js utilizando el script de configuración de NodeSource.
   - Instala Angular CLI globalmente utilizando npm.
   - Instala JDK y Spring Boot utilizando SDKMAN.
   - Instala PostgreSQL y las herramientas contribuidas utilizando `apt-get install`.
   - Inicia el servicio de MySQL y lo configura para que se inicie automáticamente al arrancar el sistema.
   - Configura MySQL creando un nuevo usuario y una nueva base de datos, y otorgando los permisos necesarios.

### Solución de problemas comunes:

1. **Error al crear la AMI:**
   - Asegúrate de que Packer está correctamente instalado y configurado en tu sistema.
   - Verifica que las credenciales de AWS están configuradas correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a Internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con `sudo` en el script de provisionamiento.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
