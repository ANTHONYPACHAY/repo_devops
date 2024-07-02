Instrucciones para `Vagrantfile`

Este archivo de configuración de Vagrant automatiza la creación de una máquina virtual con Ubuntu Desktop, Angular y PostgreSQL.

### Contenido del Vagrantfile:

1. **Configuración de la VM Ubuntu Desktop**
   - Utiliza una caja de Vagrant para Ubuntu 18.04 (Bionic Beaver).
   - Configura la VM con 4096 MB de memoria y 2 CPUs.

2. **Provisioning de la VM**
   - Actualiza los paquetes del sistema.
   - Instala Node.js y npm.
   - Instala Angular CLI globalmente usando npm.
   - Crea un nuevo proyecto Angular con configuración por defecto usando Angular CLI.
   - Instala PostgreSQL.
   - Inicia y habilita el servicio de PostgreSQL.
   - Configura PostgreSQL creando un usuario y una base de datos.

### Pasos para ejecutar el Vagrantfile:

1. **Guardar el Vagrantfile:**
   - Guarda el contenido del archivo de configuración en un archivo llamado `Vagrantfile`.

2. **Iniciar la VM:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para iniciar la VM:
     ```sh
     vagrant up
     ```

3. **Acceder a la VM:**
   - Una vez que la VM esté en funcionamiento, puedes acceder a ella utilizando:
     ```sh
     vagrant ssh
     ```

### Modificaciones posibles:

1. **Usuario y Contraseña de PostgreSQL:**
   - Cambia el nombre del usuario y la contraseña de PostgreSQL en el script de provisionamiento:
     ```ruby
     config.vm.provision "shell", inline: <<-SHELL
       sudo -u postgres psql -c "CREATE USER nuevoUsuario WITH PASSWORD 'TuContraseñaSegura';"
       sudo -u postgres psql -c "CREATE DATABASE nuevonombrebd OWNER nuevoUsuario;"
       sudo -u postgres psql -c "ALTER USER nuevoUsuario CREATEDB;"
     SHELL
     ```

2. **Proyecto Angular:**
   - Cambia el nombre del proyecto Angular en el script de provisionamiento:
     ```ruby
     config.vm.provision "shell", inline: <<-SHELL
       if [ ! -d "/home/vagrant/nuevo-proyecto-angular" ]; then
         sudo -u vagrant ng new nuevo-proyecto-angular --defaults
       fi
     SHELL
     ```

### Requisitos previos:

- **Instalación de Vagrant:**
  - Vagrant debe estar instalado en tu sistema. Si no está instalado, sigue estas instrucciones para instalarlo:
    - Descarga e instala Vagrant desde [Vagrant Downloads](https://www.vagrantup.com/downloads).

- **Instalación de VirtualBox:**
  - VirtualBox debe estar instalado en tu sistema. Si no está instalado, sigue estas instrucciones para instalarlo:
    - Descarga e instala VirtualBox desde [VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads).

### Descripción de cada tarea:

1. **Configuración de la VM Ubuntu Desktop:**
   - Utiliza una caja de Vagrant para Ubuntu 18.04 (Bionic Beaver).
   - Configura la VM con 4096 MB de memoria y 2 CPUs.

2. **Provisioning de la VM:**
   - Actualiza los paquetes del sistema utilizando `apt-get update`.
   - Descarga e instala Node.js utilizando el script de configuración de NodeSource.
   - Instala Angular CLI globalmente utilizando npm.
   - Crea un nuevo proyecto Angular en la carpeta del usuario actual utilizando Angular CLI.
   - Instala PostgreSQL y las herramientas contribuidas utilizando `apt-get install`.
   - Inicia el servicio de PostgreSQL y lo configura para que se inicie automáticamente al arrancar el sistema.
   - Configura PostgreSQL creando un nuevo usuario y una nueva base de datos, y otorgando los permisos necesarios.

### Solución de problemas comunes:

1. **Error al iniciar la VM:**
   - Asegúrate de que Vagrant y VirtualBox están correctamente instalados y configurados en tu sistema.
   - Verifica que la caja de Vagrant para Ubuntu 18.04 esté disponible y correctamente configurada.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con permisos de superusuario en la VM.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
