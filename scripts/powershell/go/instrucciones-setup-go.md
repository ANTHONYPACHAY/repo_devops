# Instrucciones para instalar Go y crear una aplicación básica en Windows utilizando PowerShell.

### Requisitos previos:

1. **Instalación de PowerShell:**
   - PowerShell debe estar instalado en tu sistema. Es recomendable usar PowerShell 5.1 o superior.

### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-go-app.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-go-app.ps1
     ```

### Descripción del script:

1. **Función para verificar si Go está instalado:**
   - El script contiene una función para verificar si Go está instalado en el sistema.

2. **Descargar e instalar Go si no está instalado:**
   - Si Go no está instalado, el script descarga e instala Go automáticamente y agrega la ruta de Go a la variable de entorno PATH.

3. **Crear una aplicación básica en Go:**
   - El script crea una aplicación básica en Go que implementa un juego de "Piedra, Papel o Tijeras".

4. **Instrucciones para ejecutar la aplicación:**
   - El script proporciona instrucciones sobre cómo ejecutar la aplicación Go utilizando el servidor embebido de Go.

### Script de PowerShell:

```ps1
# Verificar si Go está instalado
function Test-Go {
    $goPath = Get-Command go -ErrorAction SilentlyContinue
    return $goPath -ne $null
}

# Descargar e instalar Go si no está instalado
function Install-Go {
    $goUrl = "https://golang.org/dl/go1.20.6.windows-amd64.msi"
    $goInstaller = "go-installer.msi"

    Write-Output "Descargando Go..."
    Invoke-WebRequest -Uri $goUrl -OutFile $goInstaller

    Write-Output "Instalando Go..."
    Start-Process msiexec.exe -ArgumentList "/i $goInstaller /quiet /norestart" -Wait

    Remove-Item -Path $goInstaller

    # Verificar si Go se puede ejecutar
    $goExe = "C:\Program Files\Go\bin\go.exe"
    if (Test-Path $goExe) {
        Write-Output "Go instalado correctamente."
        $env:Path += ";C:\Program Files\Go\bin"
        [Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::Machine)
    } else {
        Write-Output "Error al instalar Go."
    }
}

# Crear una aplicación básica en Go
function Create-GoApp {
    $appDir = (Get-Location).Path
    $projectDir = "$appDir\go-app"
    $mainFile = "$projectDir\main.go"
    $htmlFile = "$projectDir\index.html"

    # Crear el directorio del proyecto si no existe
    if (-Not (Test-Path $projectDir)) {
        New-Item -ItemType Directory -Path $projectDir
    }

    if (-Not (Test-Path $mainFile)) {
        @'
package main

import (
    "fmt"
    "net/http"
    "math/rand"
    "time"
)

func playHandler(w http.ResponseWriter, r *http.Request) {
    if r.Method == "POST" {
        r.ParseForm()
        player := r.FormValue("player")
        options := []string{"piedra", "papel", "tijeras"}
        rand.Seed(time.Now().UnixNano())
        machine := options[rand.Intn(len(options))]

        result := ""
        if player == machine {
            result = "Empate"
        } else if (player == "piedra" && machine == "tijeras") || (player == "papel" && machine == "piedra") || (player == "tijeras" && machine == "papel") {
            result = "¡Ganaste!"
        } else {
            result = "Perdiste..."
        }

        fmt.Fprintf(w, `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Piedra, Papel o Tijeras</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                h1 { color: #333; }
                p { font-size: 1.2em; }
                .result { margin: 20px; }
                .button { margin-top: 20px; padding: 10px 20px; font-size: 1em; }
            </style>
        </head>
        <body>
            <h1>Juguemos Piedra, Papel o Tijeras</h1>
            <div class="result">
                <p>Jugador: %s</p>
                <p>Máquina: %s</p>
                <p>%s</p>
            </div>
            <button class="button" onclick="window.location.href='/'">Volver a jugar</button>
        </body>
        </html>
        `, player, machine, result)
    } else {
        http.ServeFile(w, r, "index.html")
    }
}

func main() {
    http.HandleFunc("/", playHandler)
    fmt.Println("Servidor iniciado en http://localhost:9090")
    http.ListenAndServe(":9090", nil)
}
'@ | Out-File -FilePath $mainFile -Encoding UTF8

        @'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Piedra, Papel o Tijeras</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
        h1 { color: #333; }
        form { margin: 20px; }
        .button { margin-top: 20px; padding: 10px 20px; font-size: 1em; }
    </style>
</head>
<body>
    <h1>¡Juguemos Piedra, Papel o Tijeras!</h1>
    <form method="post" action="/play">
        <input type="radio" id="piedra" name="player" value="piedra" required>
        <label for="piedra">Piedra</label><br>
        <input type="radio" id="papel" name="player" value="papel">
        <label for="papel">Papel</label><br>
        <input type="radio" id="tijeras" name="player" value="tijeras">
        <label for="tijeras">Tijeras</label><br><br>
        <input type="submit" class="button" value="Jugar">
    </form>
</body>
</html>
'@ | Out-File -FilePath $htmlFile -Encoding UTF8

        Write-Output "Aplicación Go básica creada en $projectDir"
        Write-Output "Para ejecutar la aplicación, abre una terminal en la ubicación del archivo main.go y ejecuta el siguiente comando:"
        Write-Output "cd $projectDir"
        Write-Output "go run main.go"
        Write-Output "Luego abre tu navegador web y navega a http://localhost:9090"
    } else {
        Write-Output "El archivo main.go ya existe en la ubicación actual."
    }
}

# Ejecutar el script
if (-Not (Test-Go)) {
    Install-Go
} else {
    Write-Output "Go ya está instalado."
}

Create-GoApp

### Solución de problemas comunes:

1. **Error al instalar Go:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si Go no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución del script:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de Go.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
