Instrucciones para configurar y ejecutar un entorno con GnuCOBOL en Windows utilizando PowerShell, y crear un programa COBOL simple que muestra "Hello, World!".

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
   - Guarda el contenido del script en un archivo llamado `setup-cobol.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-cobol.ps1
     ```

### Descripción del script:

1. **Actualización de paquetes:**
   - Actualiza los paquetes de Chocolatey para asegurarse de que todos los paquetes instalados estén al día.

2. **Instalación de GnuCOBOL:**
   - Instala GnuCOBOL utilizando Chocolatey e incluye la versión especificada.

3. **Verificación de la instalación de GnuCOBOL:**
   - Verifica que GnuCOBOL se haya instalado correctamente mostrando su versión.

4. **Creación de un archivo COBOL simple:**
   - Crea un archivo COBOL simple que muestra "Hello, World!" en la consola.

5. **Compilación del programa COBOL:**
   - Compila el programa COBOL utilizando el compilador GnuCOBOL.

6. **Ejecución del programa COBOL:**
   - Ejecuta el programa COBOL compilado para mostrar "Hello, World!" en la consola.

### Solución de problemas comunes:

1. **Error al instalar paquetes:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si GnuCOBOL no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución de comandos:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de GnuCOBOL.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
