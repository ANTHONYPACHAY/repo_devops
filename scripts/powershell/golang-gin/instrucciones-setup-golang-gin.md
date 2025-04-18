Instrucciones para configurar y ejecutar un entorno con Golang y Gin en Windows utilizando PowerShell, y crear una aplicación sencilla que muestra "Hello, World!".

### Requisitos previos:

1. **Instalación de Chocolatey:**
   - Chocolatey debe estar instalado en tu sistema. Si no está instalado, sigue estas instrucciones para instalarlo:
     1. Abre PowerShell como administrador.
     2. Ejecuta el siguiente comando:
        ```ps1
        Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
        ```

### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-golang-gin.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-golang-gin.ps1
     ```

### Descripción del script:

1. **Actualización de paquetes:**
   - Actualiza los paquetes de Chocolatey para asegurarse de que todos los paquetes instalados estén al día.

2. **Instalación de Go:**
   - Instala Go utilizando Chocolatey e incluye la versión especificada.

3. **Configuración del entorno:**
   - Agrega Go al PATH del sistema para que esté disponible desde cualquier terminal.

4. **Verificación de la instalación de Go:**
   - Verifica que Go se haya instalado correctamente mostrando su versión.

5. **Creación del directorio de proyecto:**
   - Crea un directorio para el proyecto Gin en la carpeta de trabajo de Go.

6. **Inicialización del módulo Go:**
   - Inicializa un nuevo módulo Go para gestionar las dependencias del proyecto.

7. **Instalación de Gin:**
   - Instala el framework Gin para Go.

8. **Creación de un archivo main.go:**
   - Crea un archivo `main.go` con un servidor Gin que muestra "Hello, World!".

9. **Ejecución de la aplicación:**
   - Ejecuta la aplicación Gin y verifica que esté disponible en `http://localhost:8080`.

### Solución de problemas comunes:

1. **Error al instalar paquetes:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si Go no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución de comandos:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de Go y Gin.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
