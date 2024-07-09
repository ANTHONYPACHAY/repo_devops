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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
