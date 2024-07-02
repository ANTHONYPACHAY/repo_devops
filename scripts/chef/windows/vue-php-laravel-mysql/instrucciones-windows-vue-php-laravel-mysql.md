Instrucciones para `setup-vue-php-laravel-mysql.rb`

Esta receta de Chef automatiza la instalación y configuración de un entorno de desarrollo con Vue.js en el Frontend, PHP Laravel en el Backend y MySQL como Base de Datos en un sistema Windows.

### Contenido de la receta:

1. **Instalación de Chocolatey**
   - Asegura que Chocolatey esté instalado utilizando un script de PowerShell.

2. **Instalación de Node.js y Vue CLI**
   - Instala Node.js LTS usando Chocolatey.
   - Instala Vue CLI globalmente usando npm.

3. **Creación de un Nuevo Proyecto Vue**
   - Crea un nuevo proyecto Vue con configuración por defecto usando Vue CLI.

4. **Instalación de PHP y Composer**
   - Instala PHP usando Chocolatey.
   - Instala Composer descargándolo y ejecutando el script de instalación de Composer.

5. **Instalación de Laravel**
   - Instala Laravel utilizando Composer.

6. **Creación de un Proyecto Laravel**
   - Crea un nuevo proyecto Laravel con configuración por defecto usando Laravel Installer.

7. **Instalación de MySQL**
   - Instala MySQL usando Chocolatey.
   - Inicia el servicio de MySQL.

8. **Configuración de MySQL**
   - Crea un nuevo usuario y una base de datos en MySQL.
   - Otorga todos los privilegios al nuevo usuario sobre la nueva base de datos.

### Pasos para ejecutar la receta:

1. **Guardar la receta:**
   - Guarda el contenido de la receta en un archivo llamado `setup-vue-php-laravel-mysql.rb`.

2. **Aplicar la receta:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para aplicar la receta:
     ```sh
     chef-apply setup-vue-php-laravel-mysql.rb
     ```

### Modificaciones posibles:

1. **Usuario y Contraseña de MySQL:**
   - Cambia el nombre del usuario y la contraseña de MySQL en las ejecuciones correspondientes:
     ```ruby
     execute 'configure_mysql' do
       command 'mysql -u root -e "CREATE USER \'nuevoUsuario\'@\'localhost\' IDENTIFIED BY \'TuContraseñaSegura\'; CREATE DATABASE nuevonombrebd; GRANT ALL PRIVILEGES ON nuevonombrebd.* TO \'nuevoUsuario\'@\'localhost\'; FLUSH PRIVILEGES;"'
       provider :powershell
     end
     ```

### Requisitos previos:

- **Instalación de Chef:**
  - Chef debe estar instalado en el sistema en el cual aplicarás la receta. Si no está instalado, sigue estas instrucciones para instalarlo:
    - Descarga e instala Chef desde [Chef Downloads](https://downloads.chef.io/chef).

### Descripción de cada tarea:

1. **Instalación de Chocolatey:**
   - Asegura que Chocolatey esté instalado utilizando un script de PowerShell que descarga e instala Chocolatey si no está presente.

2. **Instalación de Node.js y Vue CLI:**
   - Utiliza Chocolatey para instalar Node.js LTS.
   - Utiliza npm para instalar Vue CLI globalmente, permitiendo la creación de proyectos Vue.

3. **Creación de un nuevo proyecto Vue:**
   - Utiliza Vue CLI para crear un nuevo proyecto Vue en la carpeta del usuario actual con configuraciones por defecto.

4. **Instalación de PHP y Composer:**
   - Utiliza Chocolatey para instalar PHP.
   - Descarga y ejecuta el script de instalación de Composer para instalar Composer.

5. **Instalación de Laravel:**
   - Utiliza Composer para instalar Laravel Installer globalmente.

6. **Creación de un proyecto Laravel:**
   - Utiliza Laravel Installer para crear un nuevo proyecto Laravel en la carpeta del usuario actual con configuraciones por defecto.

7. **Instalación y configuración de MySQL:**
   - Utiliza Chocolatey para instalar MySQL.
   - Inicia el servicio de MySQL.
   - Configura MySQL creando un nuevo usuario y una nueva base de datos, y otorga todos los privilegios al nuevo usuario sobre la nueva base de datos.

### Solución de problemas comunes:

1. **Error al aplicar la receta:**
   - Asegúrate de que Chef está correctamente instalado y configurado en el sistema en el cual aplicas la receta.
   - Verifica que las variables y los comandos están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con permisos de superusuario.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
