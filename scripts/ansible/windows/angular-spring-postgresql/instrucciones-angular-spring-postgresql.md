Instrucciones para `setup-angular-spring-postgresql.yml`

Este playbook de Ansible automatiza la instalación y configuración de un entorno de desarrollo con Angular en el Frontend, Java Spring en el Backend y PostgreSQL como Base de Datos en un sistema Windows.

### Contenido del playbook:

1. **Variables**
   - `{{ postgres_user }}`: Nombre del usuario de PostgreSQL.
   - `{{ postgres_password }}`: Contraseña para el usuario de PostgreSQL.
   - `{{ postgres_db }}`: Nombre de la base de datos que se va a crear.

2. **Tareas**
   - **Instalación de Chocolatey:** Asegura que Chocolatey esté instalado.
   - **Instalación de Node.js:** Instala Node.js LTS usando Chocolatey.
   - **Instalación de Angular CLI:** Instala Angular CLI globalmente usando npm.
   - **Creación de un Nuevo Proyecto Angular:** Crea un nuevo proyecto Angular con configuración por defecto usando Angular CLI.
   - **Instalación de JDK:** Instala JDK 8 usando Chocolatey.
   - **Instalación de Spring Boot CLI:** Instala Spring Boot CLI usando Chocolatey.
   - **Instalación de PostgreSQL:** Instala PostgreSQL usando Chocolatey.
   - **Inicialización del Cluster de PostgreSQL:** Inicializa el cluster de la base de datos PostgreSQL.
   - **Inicio del Servicio de PostgreSQL:** Inicia el servicio de PostgreSQL y lo configura para que se inicie automáticamente.
   - **Creación del Usuario de PostgreSQL:** Crea un nuevo usuario en PostgreSQL.
   - **Creación de la Base de Datos de PostgreSQL:** Crea una nueva base de datos en PostgreSQL y la asigna al nuevo usuario.
   - **Otorgamiento de Permisos al Usuario de PostgreSQL:** Otorga permisos de creación de bases de datos al nuevo usuario.

### Pasos para ejecutar el playbook:

1. **Guardar el playbook:**
   - Guarda el contenido del playbook en un archivo llamado `setup-angular-spring-postgresql.yml`.

2. **Modificar las variables del playbook:**
   - Abre el archivo y modifica las siguientes variables según sea necesario:
     ```yaml
     postgres_user: "nuevoUsuario"
     postgres_password: "TuContraseñaSegura"
     postgres_db: "nuevonombrebd"
     ```

3. **Ejecutar el playbook:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el playbook:
     ```sh
     ansible-playbook -i hosts setup-angular-spring-postgresql.yml -e "ansible_user=<your-windows-username>"
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

2. **Instalación de Node.js y Angular CLI:**
   - Utiliza Chocolatey para instalar Node.js y npm para instalar Angular CLI globalmente.

3. **Creación de un nuevo proyecto Angular:**
   - Utiliza Angular CLI para crear un nuevo proyecto Angular con configuraciones por defecto.

4. **Instalación de JDK y Spring Boot CLI:**
   - Utiliza Chocolatey para instalar JDK 8 y Spring Boot CLI.

5. **Instalación y configuración de PostgreSQL:**
   - Utiliza Chocolatey para instalar PostgreSQL.
   - Inicializa el cluster de la base de datos PostgreSQL y configura el servicio para que se inicie automáticamente.
   - Crea un nuevo usuario y una nueva base de datos en PostgreSQL, y otorga los permisos necesarios.

### Solución de problemas comunes:

1. **Error al ejecutar el playbook:**
   - Asegúrate de que el sistema Windows está accesible y que Ansible puede conectarse a él mediante WinRM.
   - Verifica que las variables y el inventario de Ansible están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con los permisos necesarios en el sistema Windows.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
