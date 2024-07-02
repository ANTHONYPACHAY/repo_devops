Instrucciones para `setup-vue-django-mongodb.yml`

Este playbook de Ansible automatiza la instalación y configuración de un entorno de desarrollo con Vue.js en el Frontend, Python Django en el Backend y MongoDB como Base de Datos en un sistema Windows.

### Contenido del playbook:

1. **Variables**
   - `{{ mongo_user }}`: Nombre del usuario de MongoDB.
   - `{{ mongo_password }}`: Contraseña para el usuario de MongoDB.

2. **Tareas**
   - **Instalación de Chocolatey:** Asegura que Chocolatey esté instalado.
   - **Instalación de Node.js:** Instala Node.js LTS usando Chocolatey.
   - **Instalación de Vue CLI:** Instala Vue CLI globalmente usando npm.
   - **Creación de un Nuevo Proyecto Vue:** Crea un nuevo proyecto Vue con configuración por defecto usando Vue CLI.
   - **Instalación de Python:** Instala Python usando Chocolatey.
   - **Instalación de pip:** Instala pip utilizando Python.
   - **Instalación de Django:** Instala Django usando pip.
   - **Creación de un Proyecto Django:** Crea un nuevo proyecto Django con configuración por defecto usando Django admin.
   - **Instalación de MongoDB:** Instala MongoDB usando Chocolatey.
   - **Inicio del Servicio de MongoDB:** Inicia el servicio de MongoDB y lo configura para que se inicie automáticamente.
   - **Creación de la Base de Datos y Usuario de MongoDB:** Crea una nueva base de datos y un usuario en MongoDB.

### Pasos para ejecutar el playbook:

1. **Guardar el playbook:**
   - Guarda el contenido del playbook en un archivo llamado `setup-vue-django-mongodb.yml`.

2. **Modificar las variables del playbook:**
   - Abre el archivo y modifica las siguientes variables según sea necesario:
     ```yaml
     mongo_user: "nuevoUsuario"
     mongo_password: "TuContraseñaSegura"
     ```

3. **Ejecutar el playbook:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el playbook:
     ```sh
     ansible-playbook -i hosts setup-vue-django-mongodb.yml -e "ansible_user=<your-windows-username>"
     ```

### Requisitos previos:

- **Instalación de Ansible:**
  - Ansible debe estar instalado en el sistema desde el cual ejecutarás el playbook. Si no está instalado, sigue estas instrucciones para instalarlo:
    - En una terminal, ejecuta:
      ```sh
      sudo apt-get update
      sudo apt-get install ansible
      ```

- **Configuración del Inventario de Ansible:**
  - Crea un archivo de inventario llamado `hosts` con el contenido siguiente:
    ```ini
    [windows]
    <IP-o-nombre-de-tu-servidor-windows> ansible_user=<tu-usuario-windows> ansible_password=<tu-contraseña-windows> ansible_connection=winrm ansible_winrm_server_cert_validation=ignore
    ```

- **Configuración de WinRM en Windows:**
  - Asegúrate de que WinRM esté configurado y habilitado en el sistema Windows. Puedes habilitarlo ejecutando el siguiente comando en PowerShell:
    ```powershell
    Enable-PSRemoting -Force
    ```

### Descripción de cada tarea:

1. **Instalación de Chocolatey:**
   - Asegura que Chocolatey esté instalado en el sistema Windows.

2. **Instalación de Node.js y Vue CLI:**
   - Utiliza Chocolatey para instalar Node.js y npm para instalar Vue CLI globalmente.

3. **Creación de un nuevo proyecto Vue:**
   - Utiliza Vue CLI para crear un nuevo proyecto Vue con configuraciones por defecto.

4. **Instalación de Python y pip:**
   - Utiliza Chocolatey para instalar Python y luego instala pip utilizando el módulo ensurepip de Python.

5. **Instalación de Django:**
   - Utiliza pip para instalar Django.

6. **Creación de un nuevo proyecto Django:**
   - Utiliza Django admin para crear un nuevo proyecto Django con configuraciones por defecto.

7. **Instalación de MongoDB:**
   - Utiliza Chocolatey para instalar MongoDB.

8. **Inicio del servicio de MongoDB:**
   - Inicia el servicio de MongoDB y lo configura para que se inicie automáticamente al arrancar el sistema.

9. **Creación de la base de datos y usuario de MongoDB:**
    - Utiliza el cliente de MongoDB para crear una nueva base de datos y un usuario con los privilegios adecuados.

### Solución de problemas comunes:

1. **Error al ejecutar el playbook:**
   - Asegúrate de que el sistema Windows está accesible y que Ansible puede conectarse a él mediante WinRM.
   - Verifica que las variables y el inventario de Ansible están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con los permisos necesarios en el sistema Windows.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
