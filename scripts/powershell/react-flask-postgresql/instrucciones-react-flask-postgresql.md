Instrucciones para `setup-react-flask-postgresql.ps1`

Este script automatiza la instalación y configuración de un entorno de desarrollo con React en el Frontend, Python Flask en el Backend y PostgreSQL como Base de Datos.

### Contenido del script:

1. **Variables**
   - `$NodeVersion`: Versión de Node.js a instalar.
   - `$PostgresUser`: Nombre del usuario de PostgreSQL.
   - `$PostgresPassword`: Contraseña para el usuario de PostgreSQL.
   - `$PostgresDatabase`: Nombre de la base de datos que se va a crear.

2. **Actualización de Paquetes**
   - Actualiza Chocolatey para asegurarse de que los paquetes se instalen correctamente.

3. **Instalación de Node.js y React**
   - Instala la versión LTS de Node.js usando Chocolatey.
   - Instala Create React App globalmente usando npm.

4. **Creación de un Nuevo Proyecto React**
   - Crea un nuevo proyecto React con configuración por defecto usando Create React App.

5. **Instalación de Python y Flask**
   - Instala Python usando Chocolatey.
   - Instala Flask usando pip.

6. **Instalación y Configuración de PostgreSQL**
   - Instala PostgreSQL usando Chocolatey.
   - Configura PostgreSQL creando una base de datos nueva y un usuario.

7. **Información de Finalización**
   - Muestra información sobre las versiones instaladas y la configuración final.

### Pasos para ejecutar el script:

1. **Guardar el script:**
   - Guarda el contenido del script en un archivo llamado `setup-react-flask-postgresql.ps1`.

2. **Abrir PowerShell con permisos de administrador:**
   - Haz clic derecho en el icono de PowerShell y selecciona "Ejecutar como administrador".

3. **Navegar a la carpeta donde guardaste el archivo:**
   - Usa el comando `cd` para cambiar al directorio donde guardaste el archivo. Por ejemplo:
     ```powershell
     cd C:\ruta\del\archivo
     ```

4. **Ejecutar el script:**
   - Ejecuta el siguiente comando:
     ```powershell
     .\setup-react-flask-postgresql.ps1
     ```

### Modificaciones posibles:

1. **Usuario de PostgreSQL:**
   - Cambia la variable `$PostgresUser` para establecer un nombre de usuario diferente:
     ```powershell
     $PostgresUser = "nuevoUsuario"
     ```

2. **Contraseña de PostgreSQL:**
   - Cambia la variable `$PostgresPassword` para establecer una contraseña segura:
     ```powershell
     $PostgresPassword = "TuContraseñaSegura"
     ```

3. **Nombre de la base de datos:**
   - Cambia la variable `$PostgresDatabase` si deseas usar un nombre de base de datos diferente:
     ```powershell
     $PostgresDatabase = "nuevonombrebd"
     ```

### Requisitos previos:

- **Instalación de Chocolatey:**
  - Chocolatey debe estar instalado en tu sistema. Si no está instalado, sigue estas instrucciones para instalarlo:
    1. Abre PowerShell con permisos de administrador.
    2. Ejecuta el siguiente comando:
       ```powershell
       Set-ExecutionPolicy Bypass -Scope Process -Force; `
       [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; `
       iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
       ```

- **Permisos de administrador:**
  - Asegúrate de ejecutar PowerShell con permisos de administrador para que el script tenga los privilegios necesarios para instalar y configurar los programas.

### Descripción de cada paso:

1. **Actualizar paquetes:**
   - Se utiliza `choco upgrade chocolatey` para asegurarse de que Chocolatey esté actualizado y pueda gestionar correctamente las instalaciones.

2. **Instalación de Node.js y React:**
   - `choco install -y nodejs-lts` instala la última versión LTS de Node.js.
   - `npm install -g create-react-app` instala Create React App globalmente para permitir la creación de proyectos React.

3. **Creación de un nuevo proyecto React:**
   - `npx create-react-app my-react-app` crea un nuevo proyecto React en la carpeta `my-react-app` con configuraciones por defecto.

4. **Instalación de Python y Flask:**
   - `choco install -y python` instala Python.
   - `pip install Flask` instala Flask usando pip, el gestor de paquetes de Python.

5. **Instalación y configuración de PostgreSQL:**
   - `choco install -y postgresql` instala PostgreSQL.
   - `Start-Service postgresql-x64-13` inicia el servicio de PostgreSQL.
   - `Set-Service -Name postgresql-x64-13 -StartupType Automatic` configura el servicio de PostgreSQL para que se inicie automáticamente.
   - `psql -U postgres -c "CREATE USER $PostgresUser WITH PASSWORD '$PostgresPassword';"` crea un nuevo usuario en PostgreSQL.
   - `psql -U postgres -c "CREATE DATABASE $PostgresDatabase OWNER $PostgresUser;"` crea una nueva base de datos en PostgreSQL y la asigna al nuevo usuario.
   - `psql -U postgres -c "ALTER USER $PostgresUser CREATEDB;"` otorga al usuario permiso para crear bases de datos.

### Solución de problemas comunes:

1. **Error al ejecutar el script:**
   - Asegúrate de que PowerShell se está ejecutando con permisos de administrador.
   - Verifica que Chocolatey esté instalado correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que tu conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con PowerShell en modo administrador.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
