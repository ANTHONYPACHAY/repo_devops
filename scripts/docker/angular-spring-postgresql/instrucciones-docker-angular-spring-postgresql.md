Instrucciones para configurar y ejecutar el entorno contenedorizado con Angular, Spring Boot y PostgreSQL utilizando Docker.

### Pasos para ejecutar el contenedor:

1. **Guardar los archivos de configuración:**
   - Guarda el contenido del Dockerfile en un archivo llamado `Dockerfile`.
   - Guarda el contenido del archivo de configuración de Docker Compose en un archivo llamado `docker-compose.yml`.

2. **Crear las estructuras del proyecto:**
   - Estructura de directorios:
     ```
     /app
     ├── backend
     │   ├── pom.xml
     │   └── src
     │       └── main
     │           └── java
     │               └── com
     │                   └── example
     │                       └── backend
     ├── frontend
     │   ├── package.json
     │   ├── package-lock.json
     │   └── src
     └── db
         └── init.sql
     ```

3. **Configurar la base de datos:**
   - Edita el archivo `db/init.sql` para incluir las instrucciones SQL necesarias para inicializar tu base de datos.

4. **Construir y ejecutar los contenedores:**
   - Abre una terminal y navega hasta el directorio donde guardaste los archivos.
   - Ejecuta el siguiente comando para construir y ejecutar los contenedores:
     ```sh
     docker-compose up --build
     ```

5. **Acceder a la aplicación:**
   - La aplicación Angular estará disponible en `http://localhost:4200`.
   - La aplicación Spring Boot estará disponible en `http://localhost:8080`.
   - PostgreSQL estará disponible en el puerto `5432`.

### Modificaciones posibles:

1. **Configuración de la base de datos:**
   - Cambia los valores de las variables de entorno `POSTGRES_DB`, `POSTGRES_USER` y `POSTGRES_PASSWORD` en el archivo `docker-compose.yml` según tus necesidades.

2. **Configuración del backend:**
   - Edita el archivo `backend/pom.xml` para incluir las dependencias necesarias para tu proyecto Spring Boot.

3. **Configuración del frontend:**
   - Edita los archivos en el directorio `frontend/src` para desarrollar tu aplicación Angular.

### Requisitos previos:

- **Instalación de Docker y Docker Compose:**
  - Docker y Docker Compose deben estar instalados en tu sistema. Si no están instalados, sigue estas instrucciones para instalarlos:
    - Descarga e instala Docker desde [Docker Downloads](https://www.docker.com/products/docker-desktop).
    - Descarga e instala Docker Compose desde [Docker Compose](https://docs.docker.com/compose/install/).

### Solución de problemas comunes:

1. **Error al construir los contenedores:**
   - Asegúrate de que Docker y Docker Compose están correctamente instalados y configurados en tu sistema.
   - Verifica que los archivos `Dockerfile` y `docker-compose.yml` no contengan errores de sintaxis.

2. **Problemas de conexión a la base de datos:**
   - Asegúrate de que los valores de las variables de entorno `POSTGRES_DB`, `POSTGRES_USER` y `POSTGRES_PASSWORD` son correctos y coinciden con la configuración en el archivo `init.sql`.

3. **Errores durante la ejecución de la aplicación:**
   - Verifica los logs de los contenedores para identificar posibles problemas. Puedes ver los logs ejecutando:
     ```sh
     docker-compose logs
     ```

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
