# Variables
$NodeVersion = "14.x"
$SqlServerSaPassword = "YourStrong!Passw0rd"
$SqlServerDatabase = "studentdb"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Node.js y Angular CLI
Write-Output "Instalando Node.js y Angular CLI..."
choco install -y nodejs-lts
npm install -g @angular/cli

# Crear un nuevo proyecto Angular
Write-Output "Creando proyecto Angular..."
ng new my-angular-app --defaults

# Instalación de .NET Core
Write-Output "Instalando .NET Core..."
choco install -y dotnetcore-sdk

# Instalación y configuración de SQL Server
Write-Output "Instalando SQL Server..."
choco install -y sql-server-2019
Write-Output "Configurando SQL Server..."
sqlcmd -S localhost -U sa -P "$SqlServerSaPassword" -Q "CREATE DATABASE [$SqlServerDatabase];"

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "Node.js version: $(node -v)"
Write-Output "NPM version: $(npm -v)"
Write-Output "Angular CLI version: $(ng --version)"
Write-Output "Proyecto Angular creado en 'my-angular-app'."
Write-Output "Base de datos SQL Server '$SqlServerDatabase' creada."
