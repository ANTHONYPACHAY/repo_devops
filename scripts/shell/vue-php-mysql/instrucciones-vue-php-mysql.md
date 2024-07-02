Instrucciones para `setup-vue-php-mysql.sh`

Este script automatiza la instalación y configuración de un entorno de desarrollo con Vue.js en el Frontend, PHP en el Backend y MySQL como Base de Datos.

### Contenido del script:

1. **Variables**
   - `$MYSQL_USER`: Nombre del usuario de MySQL.
   - `$MYSQL_PASSWORD`: Contraseña para el usuario de MySQL.
   - `$MYSQL_DATABASE`: Nombre de la base de datos que se va a crear.

2. **Actualización de Paquetes**
   - Actualiza los paquetes del sistema para asegurarse de que las instalaciones sean correctas.

3. **Instalación de Node.js y Vue CLI**
   - Instala Node.js utilizando el script de configuración de NodeSource.
   - Instala Vue CLI globalmente usando npm.

4. **Creación de un Nuevo Proyecto Vue**
   - Crea un nuevo proyecto Vue con configuración por defecto usando Vue CLI.

5. **Instalación de PHP**
   - Instala PHP y el módulo de Apache para PHP.

6. **Instalación y Configuración de MySQL**
   - Instala MySQL.
   - Configura MySQL creando un nuevo usuario y una base de datos.

7. **Información de Finalización**
   - Muestra información sobre las versiones instaladas y la configuración final.

### Pasos para ejecutar el script:

1. **Guardar el script:**
   - Guarda el contenido del script en un archivo llamado `setup-vue-php-mysql.sh`.

2. **Dar permisos de ejecución al script:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para dar permisos de ejecución al script:
     ```sh
     chmod +x setup-vue-php-mysql.sh
     ```

3. **Ejecutar el script:**
   - Ejecuta el siguiente comando para ejecutar el script:
     ```sh
     sudo ./setup-vue-php-mysql.sh
     ```

### Modificaciones posibles:

1. **Usuario de MySQL:**
   - Cambia la variable `$MYSQL_USER` para establecer un nombre de usuario diferente:
     ```sh
     MYSQL_USER="nuevoUsuario"
     ```

2. **Contraseña de MySQL:**
   - Cambia la variable `$MYSQL_PASSWORD` para establecer una contraseña segura:
     ```sh
     MYSQL_PASSWORD="TuContraseñaSegura"
     ```

3. **Nombre de la base de datos:**
   - Cambia la variable `$MYSQL_DATABASE` si deseas usar un nombre de base de datos diferente:
     ```sh
     MYSQL_DATABASE="nuevonombrebd"
     ```

### Requisitos previos:

- **Permisos de superusuario (sudo):**
  - El script debe ser ejecutado con permisos de superusuario para poder instalar y configurar los programas correctamente.

### Descripción de cada paso:

1. **Actualizar paquetes:**
   - Se utiliza `sudo apt-get update` para actualizar la lista de paquetes disponibles y sus versiones.

2. **Instalación de Node.js y Vue CLI:**
   - `curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -` descarga y ejecuta el script de configuración de NodeSource para instalar Node.js.
   - `sudo apt-get install -y nodejs` instala Node.js.
   - `sudo npm install -g @vue/cli` instala Vue CLI globalmente para permitir la creación de proyectos Vue.

3. **Creación de un nuevo proyecto Vue:**
   - `vue create my-vue-app -d` crea un nuevo proyecto Vue en la carpeta `my-vue-app` con configuraciones por defecto.

4. **Instalación de PHP:**
   - `sudo apt-get install -y php libapache2-mod-php php-mysql` instala PHP y el módulo de Apache para PHP, permitiendo la integración de PHP con Apache.

5. **Instalación y configuración de MySQL:**
   - `sudo apt-get install -y mysql-server` instala MySQL.
   - `sudo service mysql start` inicia el servicio de MySQL.
   - `sudo mysql -e "CREATE USER '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';"` crea un nuevo usuario en MySQL.
   - `sudo mysql -e "CREATE DATABASE $MYSQL_DATABASE;"` crea una nueva base de datos en MySQL.
   - `sudo mysql -e "GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'localhost';"` otorga todos los privilegios al nuevo usuario sobre la nueva base de datos.
   - `sudo mysql -e "FLUSH PRIVILEGES;"` recarga los privilegios para asegurarse de que los cambios tengan efecto.

### Solución de problemas comunes:

1. **Error al ejecutar el script:**
   - Asegúrate de que la terminal tenga permisos de superusuario.
   - Verifica que el script tiene permisos de ejecución.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que tu conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con `sudo`.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
