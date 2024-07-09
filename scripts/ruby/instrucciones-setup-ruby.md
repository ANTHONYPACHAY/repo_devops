# Instrucciones para instalar Ruby y crear una aplicación básica en Windows utilizando PowerShell.

### Requisitos previos:

1. **Instalación de PowerShell:**
   - PowerShell debe estar instalado en tu sistema. Es recomendable usar PowerShell 5.1 o superior.

### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-ruby-app.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-ruby-app.ps1
     ```

### Descripción del script:

1. **Verificar si Ruby está instalado:**
   - El script verifica si Ruby está instalado en el sistema. Si no está instalado, descarga e instala Ruby automáticamente.

2. **Descargar e instalar Ruby:**
   - Si Ruby no está instalado, el script descarga el instalador de Ruby y lo ejecuta de manera silenciosa.

3. **Agregar Ruby al PATH:**
   - Asegura que Ruby esté en la variable de entorno PATH si no se ha agregado automáticamente durante la instalación.

4. **Crear una aplicación básica de Ruby:**
   - El script crea una aplicación básica en Ruby que convierte centímetros a metros.

5. **Ejecutar la aplicación básica:**
   - El script ejecuta la aplicación Ruby recién creada para verificar su funcionamiento.

### Script de PowerShell:

```ps1
# Verificar si Ruby está instalado
if (-not (Get-Command ruby -ErrorAction SilentlyContinue)) {
    Write-Host "Ruby no está instalado. Instalando Ruby..."
    
    # Descargar e instalar Ruby
    $installerPath = "$env:TEMP\rubyinstaller.exe"
    Invoke-WebRequest -Uri "https://github.com/oneclick/rubyinstaller2/releases/latest/download/rubyinstaller-devkit-3.1.3-1-x64.exe" -OutFile $installerPath
    Start-Process -FilePath $installerPath -ArgumentList "/verysilent" -Wait

    # Verificar si la instalación fue exitosa
    if (-not (Get-Command ruby -ErrorAction SilentlyContinue)) {
        Write-Host "La instalación de Ruby falló. Por favor, instala Ruby manualmente."
        Exit
    }

    # Agregar Ruby al PATH
    $rubyPath = "C:\Ruby31-x64\bin"
    if (-not ([Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::Machine) -contains $rubyPath)) {
        [Environment]::SetEnvironmentVariable("Path", $env:Path + ";$rubyPath", [EnvironmentVariableTarget]::Machine)
        $env:Path += ";$rubyPath"
        Write-Host "Ruby se ha agregado a la variable de entorno PATH."
    }
}

# Crear una aplicación básica de Ruby
$projectPath = "$PWD\AplicacionBasicaRuby"
if (-not (Test-Path -Path $projectPath)) {
    New-Item -ItemType Directory -Path $projectPath
}

# Crear un archivo Ruby para convertir cm a metros
$rubyFilePath = "$projectPath\app.rb"
$rubyCode = @'
puts "Ingrese el valor en centímetros:"
cm = gets.chomp.to_f
meters = cm / 100
puts "#{cm} cm es igual a #{meters} metros."
'@
Set-Content -Path $rubyFilePath -Value $rubyCode

Write-Host "La aplicación básica de Ruby ha sido creada en: $projectPath"
Write-Host "Para ejecutar la aplicación, abre una terminal y navega a la carpeta de la aplicación, luego ejecuta: ruby app.rb"
Write-Host "Ejemplo:"
Write-Host "cd $projectPath"
Write-Host "ruby app.rb"

# Ejecutar la aplicación básica
Start-Process -FilePath "ruby" -ArgumentList "$rubyFilePath"

### Solución de problemas comunes:

1. **Error al instalar Ruby:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si Ruby no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución del script:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de Ruby.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
