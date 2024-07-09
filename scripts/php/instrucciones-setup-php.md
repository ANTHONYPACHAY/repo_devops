# Instrucciones para instalar PHP y crear una aplicación básica en Windows utilizando PowerShell.

### Requisitos previos:

1. **Instalación de PowerShell:**
   - PowerShell debe estar instalado en tu sistema. Es recomendable usar PowerShell 5.1 o superior.

### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-php-app.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-php-app.ps1
     ```

### Descripción del script:

1. **Función para verificar si PHP está instalado:**
   - El script contiene una función para verificar si PHP está instalado en el sistema.

2. **Descargar e instalar PHP si no está instalado:**
   - Si PHP no está instalado, el script descarga e instala PHP automáticamente y agrega la ruta de PHP a la variable de entorno PATH.

3. **Crear una aplicación básica de PHP:**
   - El script crea una aplicación básica en PHP que implementa un juego de "Piedra, Papel o Tijeras".

4. **Instrucciones para ejecutar la aplicación:**
   - El script proporciona instrucciones sobre cómo ejecutar la aplicación PHP utilizando el servidor embebido de PHP.

### Script de PowerShell:

```ps1
# Verificar si PHP está instalado
function Test-Php {
    $phpPath = Get-Command php -ErrorAction SilentlyContinue
    return $phpPath -ne $null
}

# Descargar e instalar PHP si no está instalado
function Install-Php {
    $phpUrl = "https://windows.php.net/downloads/releases/php-8.1.21-Win32-vs16-x64.zip"
    $phpZip = "php.zip"
    $phpDir = "C:\php"

    Write-Output "Descargando PHP..."
    try {
        Invoke-WebRequest -Uri $phpUrl -OutFile $phpZip
    } catch {
        Write-Output "Error al descargar PHP. Verifique la URL de descarga."
        return
    }

    Write-Output "Extrayendo PHP..."
    Expand-Archive -Path $phpZip -DestinationPath $phpDir

    Write-Output "Configurando PHP..."
    $phpDirPath = "$phpDir\php-8.1.21-Win32-vs16-x64"
    $env:Path += ";$phpDirPath"
    [Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::Machine)

    Remove-Item -Path $phpZip

    # Verificar si PHP se puede ejecutar
    $phpExe = "$phpDirPath\php.exe"
    if (Test-Path $phpExe) {
        Write-Output "PHP instalado correctamente."
    } else {
        Write-Output "Error al instalar PHP."
    }
}

# Crear una aplicación básica de PHP
function Create-PhpApp {
    $appDir = (Get-Location).Path
    $indexFile = "$appDir\index.php"

    if (-Not (Test-Path $indexFile)) {
        @"
<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Piedra, Papel o Tijeras</title>
</head>
<body>
    <h1>¡Juguemos Piedra, Papel o Tijeras!</h1>
    <form method='post'>
        <input type='radio' id='piedra' name='jugador' value='piedra'>
        <label for='piedra'>Piedra</label><br>
        <input type='radio' id='papel' name='jugador' value='papel'>
        <label for='papel'>Papel</label><br>
        <input type='radio' id='tijeras' name='jugador' value='tijeras'>
        <label for='tijeras'>Tijeras</label><br><br>
        <input type='submit' value='Jugar'>
    </form>
"@

        @"
    <?php
    if (\$_SERVER['REQUEST_METHOD'] == 'POST') {
        \$opciones = array('piedra', 'papel', 'tijeras');
        \$jugador = \$_POST['jugador'];
        \$maquina = \$opciones[array_rand(\$opciones)];

        echo '<p>Jugador: ' . \$jugador . '</p>';
        echo '<p>Máquina: ' . \$maquina . '</p>';

        if (\$jugador == \$maquina) {
            echo '<p>¡Empate!</p>';
        } elseif (
            (\$jugador == 'piedra' && \$maquina == 'tijeras') ||
            (\$jugador == 'papel' && \$maquina == 'piedra') ||
            (\$jugador == 'tijeras' && \$maquina == 'papel')
        ) {
            echo '<p>¡Ganaste!</p>';
        } else {
            echo '<p>Perdiste...</p>';
        }
    }
    ?>
</body>
</html>
"@ | Out-File -FilePath $indexFile -Encoding UTF8

        Write-Output "Aplicación PHP básica creada en $indexFile"
        Write-Output "Para ejecutar la aplicación, abre una terminal en la ubicación del archivo index.php y ejecuta el siguiente comando:"
        Write-Output "php -S localhost:8000"
        Write-Output "Luego abre tu navegador web y navega a http://localhost:8000"
    } else {
        Write-Output "El archivo index.php ya existe en la ubicación actual."
    }
}

# Ejecutar el script
if (-Not (Test-Php)) {
    Install-Php
} else {
    Write-Output "PHP ya está instalado."
}

Create-PhpApp

### Solución de problemas comunes:

1. **Error al instalar PHP:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si PHP no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución del script:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de PHP.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
