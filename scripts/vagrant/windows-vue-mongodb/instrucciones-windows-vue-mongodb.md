Instrucciones para `Vagrantfile`

Este archivo de configuración de Vagrant automatiza la creación de una máquina virtual con Windows, Vue.js y MongoDB.

### Contenido del Vagrantfile:

1. **Configuración de la VM Windows**
   - Utiliza una caja de Vagrant para Windows 10 Enterprise.
   - Configura la VM con 4096 MB de memoria y 2 CPUs.
   - Habilita la interfaz gráfica para la VM.

2. **Provisioning de la VM**
   - Asegura que Chocolatey esté instalado.
   - Instala Node.js LTS usando Chocolatey.
   - Instala Vue CLI globalmente usando npm.
   - Crea un nuevo proyecto Vue con configuración por defecto usando Vue CLI.
   - Instala MongoDB usando Chocolatey.
   - Inicia el servicio de MongoDB y lo configura para que se inicie automáticamente.
   - Crea un nuevo usuario y una base de datos en MongoDB.

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

1. **Usuario y Contraseña de MongoDB:**
   - Cambia el nombre del usuario y la contraseña de MongoDB en el script de provisionamiento:
     ```ruby
     config.vm.provision "shell", inline: <<-SHELL
       mongo mydb --eval "db.createUser({user: 'nuevoUsuario', pwd: 'TuContraseñaSegura', roles:[{role:'readWrite', db:'mydb'}]});"
     SHELL
     ```

2. **Proyecto Vue:**
   - Cambia el nombre del proyecto Vue en el script de provisionamiento:
     ```ruby
     config.vm.provision "shell", inline: <<-SHELL
       if (!(Test-Path -Path "C:\\Users\\vagrant\\nuevo-proyecto-vue")) {
         vue create nuevo-proyecto-vue -d
       }
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

1. **Configuración de la VM Windows:**
   - Utiliza una caja de Vagrant para Windows 10 Enterprise.
   - Configura la VM con 4096 MB de memoria y 2 CPUs.
   - Habilita la interfaz gráfica para la VM para que puedas interactuar con ella.

2. **Provisioning de la VM:**
   - Asegura que Chocolatey esté instalado utilizando un script de PowerShell que descarga e instala Chocolatey si no está presente.
   - Utiliza Chocolatey para instalar Node.js LTS y MongoDB.
   - Utiliza npm para instalar Vue CLI globalmente, permitiendo la creación de proyectos Vue.
   - Utiliza Vue CLI para crear un nuevo proyecto Vue en la carpeta del usuario actual con configuraciones por defecto.
   - Inicia el servicio de MongoDB y lo configura para que se inicie automáticamente al arrancar el sistema.
   - Utiliza el cliente de MongoDB para crear un nuevo usuario y una base de datos en MongoDB, y otorgar los permisos necesarios.

### Solución de problemas comunes:

1. **Error al iniciar la VM:**
   - Asegúrate de que Vagrant y VirtualBox están correctamente instalados y configurados en tu sistema.
   - Verifica que la caja de Vagrant para Windows 10 Enterprise esté disponible y correctamente configurada.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con permisos de administrador en la VM.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
