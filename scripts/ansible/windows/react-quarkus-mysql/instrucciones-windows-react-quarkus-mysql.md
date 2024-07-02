Instrucciones para configurar y ejecutar el entorno con React, Java Quarkus y MySQL en Windows utilizando Ansible.

### Requisitos previos:

1. **Instalación de Ansible:**
   - Ansible debe estar instalado en tu sistema de control (Linux/macOS). Sigue estas instrucciones para instalar Ansible:
     ```sh
     sudo apt update
     sudo apt install ansible
     ```

2. **Configuración de la conexión a Windows:**
   - Asegúrate de tener habilitado WinRM en la máquina Windows que deseas gestionar. Puedes habilitarlo ejecutando el siguiente comando en PowerShell como administrador:
     ```powershell
     winrm quickconfig
     winrm set winrm/config/service/auth @{Basic="true"}
     winrm set winrm/config/service @{AllowUnencrypted="true"}
     ```

3. **Configurar las credenciales de Windows en Ansible:**
   - Edita tu archivo de inventario Ansible para incluir las credenciales de la máquina Windows:
     ```ini
     [windows]
     windows_host ansible_host=<IP_ADDRESS> ansible_user=<USERNAME> ansible_password=<PASSWORD> ansible_port=5985 ansible_connection=winrm
     ```

### Pasos para ejecutar el playbook:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del playbook en un archivo llamado `setup-windows-react-quarkus-mysql.yml`.

2. **Ejecutar el playbook de Ansible:**
   - Abre una terminal en tu sistema de control y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el playbook:
     ```sh
     ansible-playbook -i <path_to_inventory_file> setup-windows-react-quarkus-mysql.yml
     ```

### Descripción del playbook:

1. **Instalación de Chocolatey:**
   - Instala Chocolatey, el gestor de paquetes para Windows.

2. **Instalación de Node.js:**
   - Utiliza Chocolatey para instalar Node.js y NPM.

3. **Instalación de Create React App:**
   - Instala Create React App globalmente utilizando NPM.

4. **Creación del proyecto React:**
   - Utiliza `npx` para crear una nueva aplicación React en el directorio del usuario.

5. **Instalación de JDK:**
   - Utiliza Chocolatey para instalar el Java Development Kit (JDK).

6. **Instalación de Quarkus CLI:**
   - Descarga e instala Quarkus CLI utilizando un script de shell.

7. **Instalación de MySQL:**
   - Utiliza Chocolatey para instalar MySQL.

8. **Configuración de MySQL:**
   - Inicia el servicio de MySQL y lo configura para que se inicie automáticamente.
   - Crea la base de datos y el usuario de MySQL.
   - Concede los permisos necesarios al usuario de MySQL.
   - Realiza la configuración de seguridad de MySQL.

### Solución de problemas comunes:

1. **Error al instalar Chocolatey:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts.

2. **Problemas de conexión a WinRM:**
   - Verifica que WinRM está configurado correctamente en la máquina Windows y que el firewall permite el tráfico en el puerto 5985.

3. **Errores durante la ejecución de comandos:**
   - Verifica los logs de Ansible para identificar posibles problemas. Puedes ver los logs ejecutando el playbook con mayor verbosidad:
     ```sh
     ansible-playbook -i <path_to_inventory_file> setup-windows-react-quarkus-mysql.yml -vvv
     ```

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
