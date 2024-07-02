Instrucciones para `setup-react-quarkus-mysql.yml`

Este playbook de Ansible automatiza la instalación y configuración de un entorno de desarrollo con React en el Frontend, Java Quarkus en el Backend y MySQL como Base de Datos en un sistema Unix/Linux.

### Contenido del playbook:

1. **Variables**
   - `node_version`: Versión de Node.js a instalar.
   - `mysql_user`: Nombre del usuario de MySQL.
   - `mysql_password`: Contraseña para el usuario de MySQL.
   - `mysql_database`: Nombre de la base de datos que se va a crear.

2. **Tareas**
   - **Actualización de paquetes APT:** Actualiza y mejora los paquetes del sistema.
   - **Instalación de Node.js:** Descarga e instala Node.js utilizando el script de configuración de NodeSource.
   - **Instalación de Node.js y npm:** Instala Node.js y npm usando APT.
   - **Instalación de Create React App:** Instala Create React App globalmente usando npm.
   - **Creación de un nuevo proyecto React:** Crea un nuevo proyecto React con configuración por defecto usando Create React App.
   - **Instalación de JDK:** Instala el JDK por defecto usando APT.
   - **Instalación de Quarkus CLI:** Descarga e instala Quarkus CLI utilizando JBang.
   - **Instalación de MySQL:** Instala MySQL server usando APT.
   - **Inicio del servicio de MySQL:** Inicia el servicio de MySQL y lo configura para que se inicie automáticamente.
   - **Creación de la base de datos MySQL:** Crea una nueva base de datos en MySQL.
   - **Creación del usuario de MySQL:** Crea un nuevo usuario en MySQL.
   - **Otorgamiento de permisos al usuario de MySQL:** Otorga todos los privilegios al nuevo usuario sobre la nueva base de datos.
   - **Aseguramiento de la instalación de MySQL:** Asegura la instalación de MySQL eliminando usuarios y bases de datos innecesarias y configurando la autenticación.

### Pasos para ejecutar el playbook:

1. **Guardar el playbook:**
   - Guarda el contenido del playbook en un archivo llamado `setup-react-quarkus-mysql.yml`.

2. **Modificar las variables del playbook:**
   - Abre el archivo y modifica las siguientes variables según sea necesario:
     ```yaml
     node_version: "14.x"
     mysql_user: "nuevoUsuario"
     mysql_password: "TuContraseñaSegura"
     mysql_database: "nuevonombrebd"
     ```

3. **Ejecutar el playbook:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el playbook:
     ```sh
     ansible-playbook -i hosts setup-react-quarkus-mysql.yml
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
    [all]
    localhost ansible_connection=local
    ```

### Descripción de cada tarea:

1. **Actualización de paquetes APT:**
   - Se utiliza `apt` para actualizar y mejorar los paquetes del sistema, asegurando que las versiones más recientes estén instaladas.

2. **Instalación de Node.js:**
   - Descarga e instala Node.js utilizando el script de configuración de NodeSource para la versión especificada.

3. **Instalación de Node.js y npm:**
   - Instala Node.js y npm utilizando el gestor de paquetes APT.

4. **Instalación de Create React App:**
   - Instala Create React App globalmente utilizando npm para permitir la creación de proyectos React.

5. **Creación de un nuevo proyecto React:**
   - Utiliza Create React App para crear un nuevo proyecto React en la carpeta del usuario actual.

6. **Instalación de JDK:**
   - Instala el JDK por defecto utilizando el gestor de paquetes APT.

7. **Instalación de Quarkus CLI:**
   - Utiliza JBang para descargar e instalar Quarkus CLI, una herramienta para el desarrollo de aplicaciones Quarkus.

8. **Instalación de MySQL:**
   - Instala MySQL server utilizando el gestor de paquetes APT.

9. **Inicio del servicio de MySQL:**
   - Inicia el servicio de MySQL y lo configura para que se inicie automáticamente al arrancar el sistema.

10. **Creación de la base de datos MySQL:**
    - Crea una nueva base de datos en MySQL utilizando el módulo `mysql_db` de Ansible.

11. **Creación del usuario de MySQL:**
    - Crea un nuevo usuario en MySQL y le asigna una contraseña utilizando el módulo `mysql_user` de Ansible.

12. **Otorgamiento de permisos al usuario de MySQL:**
    - Otorga todos los privilegios al nuevo usuario sobre la nueva base de datos utilizando el módulo `mysql_user` de Ansible.

13. **Aseguramiento de la instalación de MySQL:**
    - Asegura la instalación de MySQL eliminando usuarios y bases de datos innecesarias y configurando la autenticación.

### Solución de problemas comunes:

1. **Error al ejecutar el playbook:**
   - Asegúrate de que Ansible está correctamente instalado y configurado en el sistema desde el cual ejecutas el playbook.
   - Verifica que las variables y el inventario de Ansible están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con `become: yes` y que el usuario Ansible tenga permisos de superusuario.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
