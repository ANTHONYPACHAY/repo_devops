# Variables
$PerlVersion = "5.32.1"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Strawberry Perl
Write-Output "Instalando Strawberry Perl..."
choco install strawberryperl -y --version $PerlVersion

# Verificar instalación de Perl
Write-Output "Verificando instalación de Perl..."
perl -v

# Instalación de Dancer
Write-Output "Instalando Dancer..."
cpan -i Dancer2

# Crear una aplicación Dancer sencilla
Write-Output "Creando una aplicación Dancer sencilla..."
dancer2 -a MyDancerApp

# Navegar al directorio de la aplicación
Set-Location -Path .\MyDancerApp

# Iniciar la aplicación Dancer
Write-Output "Iniciando la aplicación Dancer..."
plackup bin\app.psgi

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "Perl version: $(perl -v)"
Write-Output "Aplicación Dancer creada en 'MyDancerApp'."
Write-Output "Servidor Dancer iniciado en http://localhost:3000"
