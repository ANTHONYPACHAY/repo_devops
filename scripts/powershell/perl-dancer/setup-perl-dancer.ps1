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
if (Get-Command perl -ErrorAction SilentlyContinue) {
    perl -v
} else {
    Write-Error "Perl no se ha instalado correctamente."
}

# Instalación de Dancer
Write-Output "Instalando Dancer..."
if (Get-Command cpan -ErrorAction SilentlyContinue) {
    cpan -i Dancer2
} else {
    Write-Error "cpan no se ha instalado correctamente."
}

# Crear una aplicación Dancer sencilla
Write-Output "Creando una aplicación Dancer sencilla..."
if (Get-Command dancer2 -ErrorAction SilentlyContinue) {
    dancer2 -a MyDancerApp
} else {
    Write-Error "Dancer2 no se ha instalado correctamente."
}

# Navegar al directorio de la aplicación
Set-Location -Path .\MyDancerApp

# Iniciar la aplicación Dancer
Write-Output "Iniciando la aplicación Dancer..."
if (Test-Path .\MyDancerApp\bin\app.psgi) {
    plackup bin\app.psgi
} else {
    Write-Error "La aplicación Dancer no se ha creado correctamente."
}

# Información de finalización
Write-Output "Instalación y configuración completas."
if (Get-Command perl -ErrorAction SilentlyContinue) {
    Write-Output "Perl version: $(perl -v)"
} else {
    Write-Output "Perl no está disponible."
}
Write-Output "Aplicación Dancer creada en 'MyDancerApp'."
Write-Output "Servidor Dancer iniciado en http://localhost:3000"
