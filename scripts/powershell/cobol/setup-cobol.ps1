# Variables
$CobolVersion = "3.1.2"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de GnuCOBOL
Write-Output "Instalando GnuCOBOL..."
choco install gnucobol -y --version $CobolVersion

# Verificar instalación de GnuCOBOL
Write-Output "Verificando instalación de GnuCOBOL..."
cobc -V

# Crear un archivo COBOL simple
Write-Output "Creando un archivo COBOL simple..."
$CobolProgram = @"
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HelloWorld.
       PROCEDURE DIVISION.
       DISPLAY 'Hello, World!'.
       STOP RUN.
"@
$CobolProgram | Out-File -FilePath .\HelloWorld.cob

# Compilar el programa COBOL
Write-Output "Compilando el programa COBOL..."
cobc -x -o HelloWorld.exe HelloWorld.cob

# Ejecutar el programa COBOL
Write-Output "Ejecutando el programa COBOL..."
.\HelloWorld.exe

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "GnuCOBOL version: $(cobc -V)"
Write-Output "Programa COBOL 'Hello, World!' ejecutado correctamente."
