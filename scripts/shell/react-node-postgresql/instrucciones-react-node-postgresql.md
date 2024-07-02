Instrucciones para `setup-react-node-postgresql.sh`

Este script automatiza la instalación y configuración de un entorno de desarrollo con React en el Frontend, Node.js en el Backend y PostgreSQL como Base de Datos.

### Contenido del script:

1. **Variables**
   - `$NODE_VERSION`: Versión de Node.js a instalar.
   - `$POSTGRES_USER`: Nombre del usuario de PostgreSQL.
   - `$POSTGRES_PASSWORD`: Contraseña para el usuario de PostgreSQL.
   - `$POSTGRES_DB`: Nombre de la base de datos que se va a crear.

2. **Actualización de Paquetes**
   - Actualiza los paquetes del sistema para asegurarse de que las instalaciones sean correctas.

3. **Instalación de Node.js y React**
   - Instala Node.js utilizando el script de configuración de NodeSource.
   - Instala Create React App globalmente usando npm.

4. **Creación de un Nuevo Proyecto React**
   - Crea un nuevo proyecto React con configuración por defecto usando Create React App.

5. **Instalación y Configuración de PostgreSQL**
   - Instala PostgreSQL y las herramientas contribuidas.
   - Configura PostgreSQL creando un nuevo usuario y una base de datos.

6. **Información de Finalización**
   - Muestra información sobre las versiones instaladas y la configuración final.

### Pasos para ejecutar el script:

1. **Guardar el script:**
   - Guarda el contenido del script en un archivo llamado `setup-react-node-postgresql.sh`.

2. **Dar permisos de ejecución al script:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para dar permisos de ejecución al script:
     ```sh
     chmod +x setup-react-node-postgresql.sh
     ```

3. **Ejecutar el script:**
   - Ejecuta el siguiente comando para ejecutar el script:
     ```sh
     sudo ./setup-react-node-postgresql.sh
     ```

### Modificaciones posibles:

1. **Versión de Node.js:**
   - Cambia la variable `$NODE_VERSION` para instalar una versión diferente de Node.js:
     ```sh
     NODE_VERSION="16.x"
     ```

2. **Usuario de PostgreSQL:**
   - Cambia la variable `$POSTGRES_USER` para establecer un nombre de usuario diferente:
     ```sh
     POSTGRES_USER="nuevoUsuario"
     ```

3. **Contraseña de PostgreSQL:**
   - Cambia la variable `$POSTGRES_PASSWORD` para establecer una contraseña segura:
     ```sh
     POSTGRES_PASSWORD="TuContraseñaSegura"
     ```

4. **Nombre de la base de datos:**
   - Cambia la variable `$POSTGRES_DB` si deseas usar un nombre de base de datos diferente:
     ```sh
     POSTGRES_DB="nuevonombrebd"
     ```

### Requisitos previos:

- **Permisos de superusuario (sudo):**
  - El script debe ser ejecutado con permisos de superusuario para poder instalar y configurar los programas correctamente.

### Descripción de cada paso:

1. **Actualizar paquetes:**
   - Se utiliza `sudo apt-get update` para actualizar la lista de paquetes disponibles y sus versiones.

2. **Instalación de Node.js y React:**
   - `curl -sL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -` descarga y ejecuta el script de configuración de NodeSource para instalar Node.js.
   - `sudo apt-get install -y nodejs` instala Node.js.
   - `sudo npm install -g create-react-app` instala Create React App globalmente para permitir la creación de proyectos React.

3. **Creación de un nuevo proyecto React:**
   - `npx create-react-app my-react-app` crea un nuevo proyecto React en la carpeta `my-react-app` con configuraciones por defecto.

4. **Instalación y configuración de PostgreSQL:**
   - `sudo apt-get install -y postgresql postgresql-contrib` instala PostgreSQL y las herramientas contribuidas.
   - `sudo service postgresql start` inicia el servicio de PostgreSQL.
   - `sudo -u postgres psql -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';"` crea un nuevo usuario en PostgreSQL.
   - `sudo -u postgres psql -c "CREATE DATABASE $POSTGRES_DB OWNER $POSTGRES_USER;"` crea una nueva base de datos en PostgreSQL y la asigna al nuevo usuario.
   - `sudo -u postgres psql -c "ALTER USER $POSTGRES_USER CREATEDB;"` otorga al usuario permiso para crear bases de datos.

### Solución de problemas comunes:

1. **Error al ejecutar el script:**
   - Asegúrate de que la terminal tenga permisos de superusuario.
   - Verifica que el script tiene permisos de ejecución.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que tu conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con `sudo`.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
