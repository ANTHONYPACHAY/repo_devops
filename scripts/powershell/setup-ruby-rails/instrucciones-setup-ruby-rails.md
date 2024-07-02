Instrucciones para configurar y ejecutar un entorno con Ruby y Rails en Windows utilizando PowerShell, y crear una aplicación simple que muestra una página de bienvenida.

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
   - Guarda el contenido del script en un archivo llamado `setup-ruby-rails-simple-app.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-ruby-rails-simple-app.ps1
     ```

### Descripción del script:

1. **Actualización de paquetes:**
   - Actualiza los paquetes de Chocolatey para asegurarse de que todos los paquetes instalados estén al día.

2. **Instalación de Ruby:**
   - Instala Ruby utilizando Chocolatey e incluye la versión especificada.

3. **Configuración del entorno:**
   - Agrega Ruby al PATH del sistema para que esté disponible desde cualquier terminal.

4. **Verificación de la instalación de Ruby:**
   - Verifica que Ruby se haya instalado correctamente mostrando su versión.

5. **Instalación de Rails:**
   - Instala el framework Rails utilizando la gema Ruby e incluye la versión especificada.

6. **Verificación de la instalación de Rails:**
   - Verifica que Rails se haya instalado correctamente mostrando su versión.

7. **Creación de un nuevo proyecto Rails:**
   - Crea un nuevo proyecto Rails en el directorio especificado.

8. **Generación de un controlador simple:**
   - Genera un controlador llamado `Welcome` con una acción `index`.

9. **Configuración de la ruta raíz:**
   - Configura la ruta raíz de la aplicación para que apunte a la página de bienvenida generada.

10. **Inicio del servidor Rails:**
    - Inicia el servidor Rails para que la aplicación esté disponible en `http://localhost:3000`.

### Solución de problemas comunes:

1. **Error al instalar paquetes:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si Ruby no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución de comandos:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de Ruby y Rails.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
