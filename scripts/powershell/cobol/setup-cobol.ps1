# Variables
$CobolVersion = "3.1.2"
$GnuCobolPath = "C:\ProgramData\chocolatey\lib\gnucobol\bin"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey -y

# Instalación de GnuCOBOL
Write-Output "Instalando GnuCOBOL..."
choco install gnucobol -y --version $CobolVersion

# Verificar instalación de GnuCOBOL
Write-Output "Verificando instalación de GnuCOBOL..."
cobc -V

# Añadir GnuCOBOL a la variable de entorno PATH si no está ya presente
if (-not ($env:PATH -contains $GnuCobolPath)) {
    Write-Output "Añadiendo GnuCOBOL a la variable de entorno PATH..."
    [System.Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";" + $GnuCobolPath, [System.EnvironmentVariableTarget]::Machine)
    Write-Output "GnuCOBOL añadido a PATH. Es posible que necesites reiniciar la sesión de PowerShell para que los cambios surtan efecto."
} else {
    Write-Output "GnuCOBOL ya está en la variable de entorno PATH."
}

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "GnuCOBOL version: $(cobc -V)"
