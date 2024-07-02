# Variables
$RubyVersion = "2.7.2"
$RailsVersion = "6.1.4"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Ruby
Write-Output "Instalando Ruby..."
choco install ruby -y --version $RubyVersion

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

# Generar un controlador simple
Write-Output "Generando un controlador simple..."
rails generate controller Welcome index

# Configurar la ruta raíz para que apunte a la página de bienvenida
Write-Output "Configurando la ruta raíz..."
Add-Content -Path .\config\routes.rb -Value "`nroot 'welcome#index'"

# Iniciar el servidor Rails
Write-Output "Iniciando el servidor Rails..."
rails server

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "Ruby version: $(ruby -v)"
Write-Output "Rails version: $(rails -v)"
Write-Output "Proyecto Rails creado en 'my-rails-app'."
Write-Output "Servidor Rails iniciado en http://localhost:3000"
