Instrucciones para `setup-angular-flask-postgresql.pp`

Este manifiesto de Puppet automatiza la instalación y configuración de un entorno de desarrollo con Angular en el Frontend, Python Flask en el Backend y PostgreSQL como Base de Datos en un sistema Unix/Linux.

### Contenido del manifiesto:

1. **Actualización de Paquetes**
   - Actualiza los paquetes del sistema para asegurarse de que las instalaciones sean correctas.

2. **Instalación de Node.js y Angular CLI**
   - Instala Node.js utilizando la clase Puppet para Node.js.
   - Instala Angular CLI globalmente usando npm.

3. **Creación de un Nuevo Proyecto Angular**
   - Crea un nuevo proyecto Angular con configuración por defecto usando Angular CLI.

4. **Instalación de Python y Flask**
   - Instala Python 3 y pip utilizando los paquetes del sistema.
   - Instala Flask utilizando pip.

5. **Creación de un Proyecto Flask**
   - Crea un nuevo proyecto Flask con configuración por defecto.

6. **Instalación de PostgreSQL**
   - Instala PostgreSQL utilizando los paquetes del sistema.
   - Inicia el servicio de PostgreSQL y lo configura para que se inicie automáticamente.
   - Crea un nuevo usuario y una base de datos en PostgreSQL.
   - Otorga permisos de creación de bases de datos al nuevo usuario.

### Pasos para ejecutar el manifiesto:

1. **Guardar el manifiesto:**
   - Guarda el contenido del manifiesto en un archivo llamado `setup-angular-flask-postgresql.pp`.

2. **Aplicar el manifiesto:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para aplicar el manifiesto:
     ```sh
     sudo puppet apply setup-angular-flask-postgresql.pp
     ```

### Modificaciones posibles:

1. **Versión de Node.js:**
   - Cambia la versión de Node.js en la clase Puppet `nodejs` si deseas instalar una versión diferente:
     ```puppet
     class { 'nodejs':
       version => '16.x',
     }
     ```

2. **Usuario y Contraseña de PostgreSQL:**
   - Cambia el nombre del usuario y la contraseña de PostgreSQL en las ejecuciones correspondientes:
     ```puppet
     exec { 'create_postgres_user':
       command => "sudo -u postgres psql -c \"CREATE USER nuevoUsuario WITH PASSWORD 'TuContraseñaSegura';\"",
       ...
     }
     exec { 'create_postgres_db':
       command => "sudo -u postgres psql -c \"CREATE DATABASE nuevonombrebd OWNER nuevoUsuario;\"",
       ...
     }
     exec { 'grant_postgres_permissions':
       command => "sudo -u postgres psql -c \"ALTER USER nuevoUsuario CREATEDB;\"",
       ...
     }
     ```

### Requisitos previos:

- **Instalación de Puppet:**
  - Puppet debe estar instalado en el sistema en el cual aplicarás el manifiesto. Si no está instalado, sigue estas instrucciones para instalarlo:
    - En una terminal, ejecuta:
      ```sh
      sudo apt-get update
      sudo apt-get install puppet
      ```

### Descripción de cada tarea:

1. **Actualización de paquetes:**
   - Se utiliza `exec` para ejecutar el comando `apt-get update` y actualizar la lista de paquetes disponibles y sus versiones.

2. **Instalación de Node.js y Angular CLI:**
   - Utiliza la clase `nodejs` de Puppet para instalar Node.js.
   - Utiliza `npm` para instalar Angular CLI globalmente.

3. **Creación de un nuevo proyecto Angular:**
   - Utiliza Angular CLI para crear un nuevo proyecto Angular con configuraciones por defecto.

4. **Instalación de Python y Flask:**
   - Utiliza los paquetes del sistema para instalar Python 3 y pip.
   - Utiliza pip para instalar Flask.

5. **Creación de un proyecto Flask:**
   - Utiliza Flask para crear un nuevo proyecto Flask en la carpeta del usuario actual.

6. **Instalación y configuración de PostgreSQL:**
   - Utiliza los paquetes del sistema para instalar PostgreSQL.
   - Inicia el servicio de PostgreSQL y lo configura para que se inicie automáticamente.
   - Crea un nuevo usuario y una nueva base de datos en PostgreSQL, y otorga los permisos necesarios.

### Solución de problemas comunes:

1. **Error al aplicar el manifiesto:**
   - Asegúrate de que Puppet está correctamente instalado y configurado en el sistema en el cual aplicas el manifiesto.
   - Verifica que las variables y los comandos están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con permisos de superusuario.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
