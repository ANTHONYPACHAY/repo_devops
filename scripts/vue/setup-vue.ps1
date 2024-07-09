# Verificar si Node.js está instalado
$nodeVersion = node -v 2>$null
if ($?) {
    Write-Output "Node.js ya está instalado. Versión: $nodeVersion"
} else {
    # Descargar e instalar Node.js
    Write-Output "Node.js no está instalado. Instalando Node.js..."
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi" -OutFile "node-v16.17.0-x64.msi"
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i node-v16.17.0-x64.msi /quiet" -Wait
    Remove-Item "node-v16.17.0-x64.msi"
}

# Verificar si npm está instalado
$npmVersion = npm -v 2>$null
if ($?) {
    Write-Output "npm ya está instalado. Versión: $npmVersion"
} else {
    Write-Output "npm no está instalado. Hubo un problema con la instalación de Node.js"
    exit 1
}

# Verificar si Vue CLI está instalado
$vueVersion = vue --version 2>$null
if ($?) {
    Write-Output "Vue CLI ya está instalado. Versión: $vueVersion"
} else {
    # Instalar Vue CLI
    Write-Output "Vue CLI no está instalado. Instalando Vue CLI..."
    npm install -g @vue/cli
    $vueVersion = vue --version 2>$null
    if ($?) {
        Write-Output "Vue CLI se instaló correctamente. Versión: $vueVersion"
    } else {
        Write-Output "Hubo un problema al instalar Vue CLI"
        exit 1
    }
}

# Crear un nuevo proyecto de Vue.js
$projectName = "vue-test-project"
if (Test-Path $projectName) {
    Write-Output "El directorio del proyecto '$projectName' ya existe. Borrando el directorio..."
    Remove-Item -Recurse -Force $projectName
}

Write-Output "Creando un nuevo proyecto de Vue.js llamado '$projectName'..."
vue create -d $projectName

# Cambiar al directorio del proyecto
Set-Location $projectName

# Instalar dependencias
Write-Output "Instalando dependencias del proyecto..."
npm install

# Ejecutar el servidor de desarrollo
Write-Output "Ejecutando el servidor de desarrollo..."
npm run serve
