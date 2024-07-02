Instrucciones para `setup-angular-dotnet-sqlserver.ps1`

Este script automatiza la instalación y configuración de un entorno de desarrollo con Angular en el Frontend, .NET Core en el Backend y SQL Server como Base de Datos.

### Contenido del script:

1. **Variables**
   - `$NodeVersion`: Versión de Node.js a instalar.
   - `$SqlServerSaPassword`: Contraseña para el usuario 'sa' de SQL Server.
   - `$SqlServerDatabase`: Nombre de la base de datos que se va a crear.

2. **Actualización de Paquetes**
   - Actualiza Chocolatey para asegurarse de que los paquetes se instalen correctamente.

3. **Instalación de Node.js y Angular CLI**
   - Instala la versión LTS de Node.js usando Chocolatey.
   - Instala Angular CLI globalmente usando npm.

4. **Creación de un Nuevo Proyecto Angular**
   - Crea un nuevo proyecto Angular con configuración por defecto usando Angular CLI.

5. **Instalación de .NET Core**
   - Instala el SDK de .NET Core usando Chocolatey.

6. **Instalación y Configuración de SQL Server**
   - Instala SQL Server 2019 usando Chocolatey.
   - Configura SQL Server creando una base de datos nueva con el nombre especificado.

7. **Información de Finalización**
   - Muestra información sobre las versiones instaladas y la configuración final.

### Pasos para ejecutar el script:

1. **Guardar el script:**
   - Guarda el contenido del script en un archivo llamado `setup-angular-dotnet-sqlserver.ps1`.

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
     .\setup-angular-dotnet-sqlserver.ps1
     ```

### Modificaciones posibles:

1. **Contraseña de SQL Server:**
   - Cambia la variable `$SqlServerSaPassword` para establecer una contraseña segura:
     ```powershell
     $SqlServerSaPassword = "TuContraseñaSegura"
     ```

2. **Nombre de la base de datos:**
   - Cambia la variable `$SqlServerDatabase` si deseas usar un nombre de base de datos diferente:
     ```powershell
     $SqlServerDatabase = "nuevonombrebd"
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

2. **Instalación de Node.js y Angular CLI:**
   - `choco install -y nodejs-lts` instala la última versión LTS de Node.js.
   - `npm install -g @angular/cli` instala Angular CLI globalmente para permitir la creación y gestión de proyectos Angular.

3. **Creación de un nuevo proyecto Angular:**
   - `ng new my-angular-app --defaults` crea un nuevo proyecto Angular en la carpeta `my-angular-app` con configuraciones por defecto.

4. **Instalación de .NET Core:**
   - `choco install -y dotnetcore-sdk` instala el SDK de .NET Core necesario para desarrollar aplicaciones .NET.

5. **Instalación y configuración de SQL Server:**
   - `choco install -y sql-server-2019` instala SQL Server 2019.
   - `sqlcmd -S localhost -U sa -P "$SqlServerSaPassword" -Q "CREATE DATABASE [$SqlServerDatabase];"` crea una nueva base de datos usando `sqlcmd`.

### Solución de problemas comunes:

1. **Error al ejecutar el script:**
   - Asegúrate de que PowerShell se está ejecutando con permisos de administrador.
   - Verifica que Chocolatey esté instalado correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que tu conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con PowerShell en modo administrador.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
