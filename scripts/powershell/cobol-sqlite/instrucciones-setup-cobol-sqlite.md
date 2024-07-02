Instrucciones para configurar y ejecutar un entorno con COBOL y SQLite en Windows utilizando PowerShell, y crear una aplicación sencilla que inserta un registro en una base de datos SQLite.

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
   - Guarda el contenido del script en un archivo llamado `setup-cobol-sqlite.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-cobol-sqlite.ps1
     ```

### Descripción del script:

1. **Actualización de paquetes:**
   - Actualiza los paquetes de Chocolatey para asegurarse de que todos los paquetes instalados estén al día.

2. **Instalación de GnuCOBOL:**
   - Instala GnuCOBOL utilizando Chocolatey e incluye la versión especificada.

3. **Verificación de la instalación de GnuCOBOL:**
   - Verifica que GnuCOBOL se haya instalado correctamente mostrando su versión.

4. **Instalación de SQLite:**
   - Instala SQLite utilizando Chocolatey e incluye la versión especificada.

5. **Verificación de la instalación de SQLite:**
   - Verifica que SQLite se haya instalado correctamente mostrando su versión.

6. **Creación de una base de datos y tabla en SQLite:**
   - Crea una base de datos SQLite y una tabla llamada `users`.

7. **Creación de un archivo COBOL para interactuar con SQLite:**
   - Crea un archivo COBOL que inserta un registro en la tabla `users` de la base de datos SQLite.

8. **Compilación del programa COBOL:**
   - Compila el programa COBOL utilizando el compilador GnuCOBOL y enlazando con la biblioteca SQLite.

9. **Ejecución del programa COBOL:**
   - Ejecuta el programa COBOL y verifica que el registro se haya insertado correctamente en la base de datos SQLite.

### Solución de problemas comunes:

1. **Error al instalar paquetes:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si GnuCOBOL o SQLite no se reconocen después de la instalación, asegúrate de que se agregaron correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución de comandos:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de GnuCOBOL y SQLite.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
