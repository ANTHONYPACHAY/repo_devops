### Instrucciones para configurar y ejecutar un entorno con Node.js, Vue CLI y Express en Windows utilizando PowerShell

Estas instrucciones describen cómo configurar un entorno de desarrollo para Node.js, Vue CLI y Express en Windows usando PowerShell, y cómo crear una aplicación sencilla de Vue.js con un backend en Express.

#### Requisitos previos:

1. **Instalación de Chocolatey:**
   - Chocolatey debe estar instalado en tu sistema. Si no está instalado, sigue estos pasos:
     1. Abre PowerShell como administrador.
     2. Ejecuta el siguiente comando:
        ```ps1
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
        ```

#### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-node-vue-express.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-node-vue-express.ps1
     ```

#### Descripción del script:

1. **Verificación e instalación de Node.js:**
   - Verifica si Node.js está instalado. Si no lo está, lo descarga e instala.
   ```ps1
   $nodeVersion = node -v 2>$null
   if ($?) {
       Write-Output "Node.js ya está instalado. Versión: $nodeVersion"
   } else {
       Write-Output "Node.js no está instalado. Instalando Node.js..."
       Invoke-WebRequest -Uri "https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi" -OutFile "node-v16.17.0-x64.msi"
       Start-Process -FilePath "msiexec.exe" -ArgumentList "/i node-v16.17.0-x64.msi /quiet" -Wait
       Remove-Item "node-v16.17.0-x64.msi"
   }

2. **Verificación de npm:**
   - Verifica si npm está instalado.
   ```ps1
   $npmVersion = npm -v 2>$null
   if ($?) {
       Write-Output "npm ya está instalado. Versión: $npmVersion"
   } else {
       Write-Output "npm no está instalado. Hubo un problema con la instalación de Node.js"
       exit 1
   }

3. **Verificación e instalación de Vue CLI:**
   - Verifica si Vue CLI está instalado. Si no lo está, lo instala.
   ```ps1
   $vueVersion = vue --version 2>$null
   if ($?) {
       Write-Output "Vue CLI ya está instalado. Versión: $vueVersion"
   } else {
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

4. **Creación de un nuevo proyecto de Vue.js:**
   - Crea un nuevo proyecto de Vue.js llamado `vue-express-test-project`.
   ```ps1
   $projectName = "vue-express-test-project"
   if (Test-Path $projectName) {
       Write-Output "El directorio del proyecto '$projectName' ya existe. Borrando el directorio..."
       Remove-Item -Recurse -Force $projectName
   }
   Write-Output "Creando un nuevo proyecto de Vue.js llamado '$projectName'..."
   vue create -d $projectName

5. **Cambio al directorio del proyecto:**
   - Cambia al directorio del proyecto.
   ```ps1
   Set-Location $projectName

6. Creación de una carpeta para el backend:
   - Crea una carpeta para el backend dentro del proyecto.
   $backendFolder = "backend"
   if (-Not (Test-Path $backendFolder)) {
       New-Item -ItemType Directory -Path $backendFolder
   }
   Set-Location $backendFolder

7. Inicialización del backend con npm:
   - Inicializa el backend con un archivo package.json y instala Express.
   npm init -y
   npm install express

8. Creación del archivo server.js:
   - Crea el archivo `server.js` para el backend con el siguiente contenido:
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
       console.log(`Backend server running at http://localhost:${port}`);
   });
   "@
   Set-Content -Path "server.js" -Value $serverJsContent

9. Volver al directorio del proyecto:
   - Regresa al directorio del proyecto.
   Set-Location ..

10. Instalación de dependencias del frontend:
    - Instala las dependencias del proyecto frontend.
    Write-Output "Instalando dependencias del proyecto frontend..."
    npm install

11. Creación del archivo vue.config.js:
    - Crea un archivo `vue.config.js` para configurar el proxy del backend.
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

12. Creación de un componente Vue para interactuar con el backend:
    - Crea un componente Vue llamado `HelloWorld.vue` con el siguiente contenido:
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

13. Instrucciones finales para el usuario:
    - Indica al usuario que el proyecto ha sido creado exitosamente.
    Write-Output "Proyecto de Vue.js con backend Express creado exitosamente."

14. Inicio del backend en una nueva ventana de PowerShell:
    - Inicia el backend en una nueva ventana de PowerShell.
    Start-Process powershell -ArgumentList "cd $((Get-Location).Path)\backend; node server.js" -NoNewWindow

15. Inicio del frontend en una nueva ventana de PowerShell:
    - Inicia el frontend en una nueva ventana de PowerShell.
    Start-Process powershell -ArgumentList "cd $((Get-Location).Path); npm run serve" -NoNewWindow

16. Finalización:
    - Indica que el backend y el frontend están en ejecución, y proporciona la URL del servidor frontend.
    Write-Output "Backend y frontend están en ejecución. El servidor frontend está disponible en http://localhost:8081"
