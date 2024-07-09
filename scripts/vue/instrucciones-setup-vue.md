# Instrucciones para configurar y ejecutar un entorno con Node.js, npm y Vue CLI en Windows utilizando PowerShell, y crear una aplicación sencilla de Vue.js.

### Requisitos previos:

1. **Instalación de PowerShell:**
   - PowerShell debe estar instalado en tu sistema. Es recomendable usar PowerShell 5.1 o superior.

### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-node-vue.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-node-vue.ps1
     ```

### Descripción del script:

1. **Verificar si Node.js está instalado:**
   - El script verifica si Node.js está instalado en el sistema. Si está instalado, muestra la versión. Si no, descarga e instala Node.js automáticamente.

2. **Verificar si npm está instalado:**
   - Después de instalar Node.js, el script verifica si npm (Node Package Manager) está instalado. Si hay un problema con la instalación de Node.js, el script se detiene.

3. **Verificar si Vue CLI está instalado:**
   - El script verifica si Vue CLI (Command Line Interface para Vue.js) está instalado. Si no está instalado, procede a instalarlo globalmente usando npm.

4. **Crear un nuevo proyecto de Vue.js:**
   - El script verifica si ya existe un directorio con el nombre del proyecto. Si existe, lo elimina y luego crea un nuevo proyecto de Vue.js con el nombre especificado.

5. **Cambiar al directorio del proyecto:**
   - Navega al directorio del proyecto recién creado.

6. **Instalar dependencias del proyecto:**
   - El script instala todas las dependencias necesarias para el proyecto Vue.js.

7. **Ejecutar el servidor de desarrollo:**
   - Finalmente, el script ejecuta el servidor de desarrollo para la aplicación Vue.js.

### Script de PowerShell:

```ps1
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

### Solución de problemas comunes:

1. **Error al instalar Node.js:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si Node.js o npm no se reconocen después de la instalación, asegúrate de que se agregaron correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la instalación de Vue CLI:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de Vue CLI.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
