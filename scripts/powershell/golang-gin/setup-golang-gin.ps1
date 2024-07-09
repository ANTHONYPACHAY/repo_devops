# Variables
$GoVersion = "1.16.5"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Go
Write-Output "Instalando Go..."
choco install golang --version $GoVersion -y --force

# Asegurar que Go esté en el PATH
Write-Output "Agregando Go al PATH..."
$env:Path += ";C:\Go\bin"
[System.Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::Machine)

# Importar módulo de Chocolatey y refrescar variables de entorno
Write-Output "Importando módulo de Chocolatey y refrescando variables de entorno..."
Import-Module "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
refreshenv

# Verificar manualmente el PATH
Write-Output "Verificando el PATH manualmente..."
$env:Path

# Verificar instalación de Go
Write-Output "Verificando instalación de Go..."
go version

# Crear directorio de proyecto
Write-Output "Creando directorio de proyecto..."
New-Item -Path "C:\Users\$env:USERNAME\go\src\my-gin-app" -ItemType Directory -Force
Set-Location -Path "C:\Users\$env:USERNAME\go\src\my-gin-app"

# Inicializar módulo Go
Write-Output "Inicializando módulo Go..."
go mod init my-gin-app

# Instalar Gin
Write-Output "Instalando Gin..."
go get -u github.com/gin-gonic/gin

# Crear archivo main.go
Write-Output "Creando archivo main.go..."
$MainGo = @"
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/", func(c *gin.Context) {
        c.String(200, "Hello, World!")
    })
    r.Run(":9090") // listen and serve on 0.0.0.0:9090
}
"@
$MainGo | Out-File -FilePath .\main.go

# Ejecutar la aplicación
Write-Output "Ejecutando la aplicación Gin..."
go run main.go
