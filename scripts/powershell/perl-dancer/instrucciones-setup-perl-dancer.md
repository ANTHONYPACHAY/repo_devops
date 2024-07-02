Instrucciones para configurar y ejecutar un entorno con Perl y Dancer en Windows utilizando PowerShell, y crear una aplicación sencilla que muestra "Hello, World!".

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
   - Guarda el contenido del script en un archivo llamado `setup-perl-dancer.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-perl-dancer.ps1
     ```

### Descripción del script:

1. **Actualización de paquetes:**
   - Actualiza los paquetes de Chocolatey para asegurarse de que todos los paquetes instalados estén al día.

2. **Instalación de Strawberry Perl:**
   - Instala Strawberry Perl utilizando Chocolatey e incluye la versión especificada.

3. **Verificación de la instalación de Perl:**
   - Verifica que Perl se haya instalado correctamente mostrando su versión.

4. **Instalación de Dancer:**
   - Instala el framework Dancer para Perl utilizando CPAN.

5. **Creación de una aplicación Dancer sencilla:**
   - Crea una aplicación Dancer con la estructura básica de archivos.

6. **Navegación al directorio de la aplicación:**
   - Navega al directorio de la aplicación Dancer.

7. **Inicio de la aplicación Dancer:**
   - Inicia la aplicación Dancer utilizando `plackup` y verifica que esté disponible en `http://localhost:3000`.

### Solución de problemas comunes:

1. **Error al instalar paquetes:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si Perl no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución de comandos:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de Perl y Dancer.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
