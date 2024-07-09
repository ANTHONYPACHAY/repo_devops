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
$projectName = "vue-express-test-project"
if (Test-Path $projectName) {
    Write-Output "El directorio del proyecto '$projectName' ya existe. Borrando el directorio..."
    Remove-Item -Recurse -Force $projectName
}

Write-Output "Creando un nuevo proyecto de Vue.js llamado '$projectName'..."
vue create -d $projectName

# Cambiar al directorio del proyecto
Set-Location $projectName

# Crear una carpeta para el backend
$backendFolder = "backend"
if (-Not (Test-Path $backendFolder)) {
    New-Item -ItemType Directory -Path $backendFolder
}

# Cambiar al directorio del backend
Set-Location $backendFolder

# Crear package.json para el backend
npm init -y

# Instalar Express
npm install express

# Crear el archivo server.js para el backend
$serverJsContent = @"
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:\${port}`);
});
"@

Set-Content -Path "server.js" -Value $serverJsContent

# Volver al directorio del proyecto
Set-Location ..

# Instalar dependencias del frontend
Write-Output "Instalando dependencias del proyecto frontend..."
npm install

# Crear un archivo vue.config.js para proxy
$vueConfigContent = @"
module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            },
        },
    },
};
"@
Set-Content -Path "vue.config.js" -Value $vueConfigContent

# Crear un componente Vue para interactuar con el backend
$helloWorldComponent = @"
<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        this.message = data.message;
      });
  }
};
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
"@
Set-Content -Path "src/components/HelloWorld.vue" -Value $helloWorldComponent

# Instrucciones finales para el usuario
Write-Output "Proyecto de Vue.js con backend Express creado exitosamente."

# Iniciar el backend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "cd $((Get-Location).Path)\backend; node server.js" -NoNewWindow

# Iniciar el frontend en una nueva ventana de PowerShell
Start-Process powershell -ArgumentList "cd $((Get-Location).Path); npm run serve" -NoNewWindow

Write-Output "Backend y frontend están en ejecución. El servidor frontend está disponible en http://localhost:8081"
