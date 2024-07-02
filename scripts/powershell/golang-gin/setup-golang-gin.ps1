# Variables
$GoVersion = "1.16.5"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Go
Write-Output "Instalando Go..."
choco install golang --version $GoVersion -y

# Agregar Go al PATH
$env:Path += ";C:\Go\bin"

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
    r.Run() // listen and serve on 0.0.0.0:8080
}
"@
$MainGo | Out-File -FilePath .\main.go

# Ejecutar la aplicación
Write-Output "Ejecutando la aplicación Gin..."
go run main.go
