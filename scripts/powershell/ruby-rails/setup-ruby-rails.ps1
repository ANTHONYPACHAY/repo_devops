# Variables
$RubyVersion = "2.7.2"
$RailsVersion = "6.1.4"
$NodeVersion = "14.17.0"  # Versión estable y compatible con Webpacker

# Función para instalar Chocolatey
function Install-Chocolatey {
    Write-Output "Instalando Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Comprobar e instalar Chocolatey
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Install-Chocolatey
} else {
    Write-Output "Chocolatey ya está instalado."
}

# Actualizar Chocolatey
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey -y

# Función para instalar nvm
function Install-Nvm {
    Write-Output "Instalando nvm..."
    Invoke-WebRequest -Uri https://github.com/coreybutler/nvm-windows/releases/download/1.1.9/nvm-setup.exe -OutFile nvm-setup.exe
    Start-Process -Wait -FilePath .\nvm-setup.exe -ArgumentList '/SILENT'
    $Env:Path += ";$Env:ProgramFiles\nvm"
}

# Comprobar e instalar nvm
if (-not (Get-Command nvm -ErrorAction SilentlyContinue)) {
    Install-Nvm
    Remove-Item .\nvm-setup.exe
} else {
    Write-Output "nvm ya está instalado."
}

# Instalar y usar Node.js
Write-Output "Instalando Node.js..."
nvm install $NodeVersion
nvm use $NodeVersion

# Verificar instalación de Node.js
Write-Output "Verificando instalación de Node.js..."
node -v

# Instalar yarn globalmente
Write-Output "Instalando yarn..."
npm install -g yarn

# Función para instalar Ruby
function Install-Ruby {
    Write-Output "Instalando Ruby..."
    choco install ruby -y --version $RubyVersion
}

# Comprobar e instalar Ruby
if (-not (Get-Command ruby -ErrorAction SilentlyContinue)) {
    Install-Ruby
} else {
    Write-Output "Ruby ya está instalado."
}

# Agregar Ruby al PATH
$env:Path += ";C:\tools\ruby$RubyVersion\bin"

# Verificar instalación de Ruby
Write-Output "Verificando instalación de Ruby..."
ruby -v

# Instalación de Rails
Write-Output "Instalando Rails..."
gem install rails -v $RailsVersion

# Verificar instalación de Rails
Write-Output "Verificando instalación de Rails..."
rails -v

# Crear un nuevo proyecto Rails
Write-Output "Creando un nuevo proyecto Rails..."
rails new my-rails-app

# Navegar al directorio del proyecto
Set-Location -Path .\my-rails-app

# Generar un controlador simple solo si no existe
if (-not (Test-Path -Path .\app\controllers\welcome_controller.rb)) {
    Write-Output "Generando un controlador simple..."
    rails generate controller Welcome index
}

# Configurar la ruta raíz para que apunte a la página de bienvenida
Write-Output "Configurando la ruta raíz..."
$routesFilePath = ".\config\routes.rb"
$routesContent = Get-Content $routesFilePath
if (-not ($routesContent -contains "root 'welcome#index'")) {
    $newContent = $routesContent -replace "Rails.application.routes.draw do", "Rails.application.routes.draw do`n  root 'welcome#index'"
    Set-Content -Path $routesFilePath -Value $newContent
}

# Instalar dependencias necesarias para Webpacker
Write-Output "Instalando dependencias de Webpacker..."
yarn add @rails/webpacker babel-loader

# Eliminar la caché y recompilar Webpacker
Write-Output "Eliminando la caché de Webpacker..."
rails webpacker:clobber

Write-Output "Compilando Webpacker..."
rails webpacker:compile

# Establecer opciones de Node.js para evitar problemas con crypto
$env:NODE_OPTIONS="--openssl-legacy-provider"

# Iniciar el servidor Rails
Write-Output "Iniciando el servidor Rails..."
rails server

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "Ruby version: $(ruby -v)"
Write-Output "Rails version: $(rails -v)"
Write-Output "Proyecto Rails creado en 'my-rails-app'."
Write-Output "Servidor Rails iniciado en http://localhost:3000"
