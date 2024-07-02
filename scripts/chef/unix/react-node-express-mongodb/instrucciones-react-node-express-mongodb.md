Instrucciones para `setup-react-node-express-mongodb.rb`

Esta receta de Chef automatiza la instalación y configuración de un entorno de desarrollo con React en el Frontend, Node.js Express en el Backend y MongoDB como Base de Datos en un sistema Unix/Linux.

### Contenido de la receta:

1. **Actualización de Paquetes**
   - Actualiza los paquetes del sistema para asegurarse de que las instalaciones sean correctas.

2. **Instalación de Node.js y npm**
   - Instala Node.js utilizando el script de configuración de NodeSource.
   - Instala npm junto con Node.js.

3. **Instalación de Create React App**
   - Instala Create React App globalmente usando npm.

4. **Creación de un Nuevo Proyecto React**
   - Crea un nuevo proyecto React con configuración por defecto usando Create React App.

5. **Instalación de Express y Nodemon**
   - Instala Express y Nodemon en el proyecto React creado.

6. **Instalación de MongoDB**
   - Instala MongoDB utilizando el gestor de paquetes del sistema.

7. **Inicio del Servicio de MongoDB**
   - Inicia el servicio de MongoDB y lo configura para que se inicie automáticamente.

8. **Creación de Usuario y Base de Datos en MongoDB**
   - Crea un nuevo usuario y una base de datos en MongoDB.

### Pasos para ejecutar la receta:

1. **Guardar la receta:**
   - Guarda el contenido de la receta en un archivo llamado `setup-react-node-express-mongodb.rb`.

2. **Aplicar la receta:**
   - Abre una terminal y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para aplicar la receta:
     ```sh
     sudo chef-apply setup-react-node-express-mongodb.rb
     ```

### Modificaciones posibles:

1. **Versión de Node.js:**
   - Cambia la versión de Node.js en la ejecución correspondiente si deseas instalar una versión diferente:
     ```ruby
     execute 'install_nodejs' do
       command 'curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs'
       not_if 'node -v'
     end
     ```

2. **Usuario y Contraseña de MongoDB:**
   - Cambia el nombre del usuario y la contraseña de MongoDB en las ejecuciones correspondientes:
     ```ruby
     execute 'create_mongodb_user_and_db' do
       command 'mongo mydb --eval "db.createUser({user: \'nuevoUsuario\', pwd: \'TuContraseñaSegura\', roles:[{role:\'readWrite\', db:\'mydb\'}]});"'
       not_if 'mongo mydb --eval "db.getUser(\'nuevoUsuario\')" | grep nuevoUsuario'
     end
     ```

### Requisitos previos:

- **Instalación de Chef:**
  - Chef debe estar instalado en el sistema en el cual aplicarás la receta. Si no está instalado, sigue estas instrucciones para instalarlo:
    - En una terminal, ejecuta:
      ```sh
      sudo apt-get update
      sudo apt-get install chef
      ```

### Descripción de cada tarea:

1. **Actualización de paquetes:**
   - Se utiliza `execute` para ejecutar el comando `apt-get update` y actualizar la lista de paquetes disponibles y sus versiones.

2. **Instalación de Node.js y npm:**
   - Utiliza `execute` para descargar e instalar Node.js y npm utilizando el script de configuración de NodeSource.

3. **Instalación de Create React App:**
   - Utiliza `execute` para instalar Create React App globalmente utilizando npm.

4. **Creación de un nuevo proyecto React:**
   - Utiliza `execute` para crear un nuevo proyecto React en la carpeta del usuario actual utilizando Create React App.

5. **Instalación de Express y Nodemon:**
   - Utiliza `execute` para instalar Express y Nodemon en el proyecto React creado.

6. **Instalación y configuración de MongoDB:**
   - Utiliza `package` para instalar MongoDB.
   - Utiliza `service` para iniciar y habilitar el servicio de MongoDB.
   - Utiliza `execute` para crear un nuevo usuario y una nueva base de datos en MongoDB, y otorgar los permisos necesarios.

### Solución de problemas comunes:

1. **Error al aplicar la receta:**
   - Asegúrate de que Chef está correctamente instalado y configurado en el sistema en el cual aplicas la receta.
   - Verifica que las variables y los comandos están configurados correctamente.

2. **Problemas de red:**
   - Si tienes problemas al descargar los paquetes, asegúrate de que la conexión a internet esté funcionando y no haya restricciones de red.

3. **Errores de permisos:**
   - Asegúrate de que los comandos que requieren permisos elevados se ejecuten con permisos de superusuario.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
