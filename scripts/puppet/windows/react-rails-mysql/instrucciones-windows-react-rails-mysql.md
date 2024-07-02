Instrucciones para `setup-react-rails-mysql.pp`

Este manifiesto de Puppet automatiza la instalación y configuración de un entorno de desarrollo con React en el Frontend, Ruby on Rails en el Backend y MySQL como Base de Datos en un sistema Windows.

### Contenido del manifiesto:

1. **Instalación de Chocolatey**
   - Asegura que Chocolatey esté instalado utilizando un script de PowerShell.

2. **Instalación de Node.js y Create React App**
   - Instala Node.js LTS usando Chocolatey.
   - Instala Create React App globalmente usando npm.

3. **Creación de un Nuevo Proyecto React**
   - Crea un nuevo proyecto React con configuración por defecto usando Create React App.

4. **Instalación de Ruby y Rails**
   - Instala Ruby usando Chocolatey.
   - Instala Rails utilizando el gestor de gemas de Ruby.

5. **Creación de un Proyecto Rails**
   - Crea un nuevo proyecto Rails con configuración por defecto usando Rails.

6. **Instalación de MySQL**
   - Instala MySQL usando Chocolatey.
   - Inicia el servicio de MySQL.

7. **Configuración de MySQL**
   - Crea un nuevo usuario y una base de datos en MySQL.
   - Otorga todos los privilegios al nuevo usuario sobre la nueva base de datos.

### Pasos para ejecutar el manifiesto:

1. **Guardar el manifiesto:**
   - Guarda el contenido del manifiesto en un archivo llamado `setup-react-rails-mysql.pp`.

2. **Aplicar el manifiesto:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para aplicar el manifiesto:
     ```sh
     puppet apply setup-react-rails-mysql.pp
     ```

### Modificaciones posibles:

1. **Usuario y Contraseña de MySQL:**
   - Cambia el nombre del usuario y la contraseña de MySQL en las ejecuciones correspondientes:
     ```puppet
     exec { 'configure_mysql':
       command => 'mysql -u root -e "CREATE USER \'nuevoUsuario\'@\'localhost\' IDENTIFIED BY \'TuContraseñaSegura\'; CREATE DATABASE nuevonombrebd; GRANT ALL PRIVILEGES ON nuevonombrebd.* TO \'nuevoUsuario\'@\'localhost\'; FLUSH PRIVILEGES;"',
       ...
     }
     ```

### Requisitos previos:

- **Instalación de Puppet:**
  - Puppet debe estar instalado en el sistema en el cual aplicarás el manifiesto. Si no está instalado, sigue estas instrucciones para instalarlo:
    - Descarga e instala Puppet desde [Puppet Labs](https://puppet.com/docs/puppet/latest/install_windows.html).

### Descripción de cada tarea:

1. **Instalación de Chocolatey:**
   - Asegura que Chocolatey esté instalado utilizando un script de PowerShell que descarga e instala Chocolatey si no está presente.

2. **Instalación de Node.js y Create React App:**
   - Utiliza Chocolatey para instalar Node.js LTS.
   - Utiliza npm para instalar Create React App globalmente, permitiendo la creación de proyectos React.

3. **Creación de un nuevo proyecto React:**
   - Utiliza Create React App para crear un nuevo proyecto React en la carpeta del usuario actual con configuraciones por defecto.

4. **Instalación de Ruby y Rails:**
   - Utiliza Chocolatey para instalar Ruby.
   - Utiliza el gestor de gemas de Ruby para instalar Rails.

5. **Creación de un proyecto Rails:**
   - Utiliza Rails para crear un nuevo proyecto Rails en la carpeta del usuario actual con configuraciones por defecto.

6. **Instalación y configuración de MySQL:**
   - Utiliza Chocolatey para instalar MySQL.
   - Inicia el servicio de MySQL.
   - Configura MySQL creando un nuevo usuario y una nueva base de datos, y otorga todos los privilegios al nuevo usuario sobre la nueva base de datos.

### Solución de problemas comunes:

1. **Error al aplicar el manifiesto:**
   - Asegúrate de que Puppet está correctamente instalado y configurado en el sistema en el cual aplicas el manifiesto.
   - Verifica que las variables y los comandos están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con permisos de superusuario.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
