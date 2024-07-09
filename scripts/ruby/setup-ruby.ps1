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
