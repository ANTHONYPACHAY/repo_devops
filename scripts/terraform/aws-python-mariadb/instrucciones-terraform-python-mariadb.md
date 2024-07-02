Instrucciones para `main.tf` y `variables.tf`

Este archivo de configuración de Terraform crea una infraestructura en AWS que incluye una instancia EC2 con Python y MariaDB instalados y configurados.

### Pasos para ejecutar el `main.tf`:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del archivo de configuración en un archivo llamado `main.tf`.

2. **Guardar el archivo de variables:**
   - Guarda el contenido del archivo de variables en un archivo llamado `variables.tf`.

3. **Configurar las credenciales de AWS:**
   - Asegúrate de que las credenciales de AWS están configuradas en tu sistema. Puedes configurarlas utilizando el AWS CLI:
     ```sh
     aws configure
     ```

4. **Inicializar Terraform:**
   - Abre una terminal y navega hasta el directorio donde guardaste los archivos.
   - Ejecuta el siguiente comando para inicializar Terraform:
     ```sh
     terraform init
     ```

5. **Aplicar la configuración de Terraform:**
   - Ejecuta el siguiente comando para aplicar la configuración y crear la infraestructura:
     ```sh
     terraform apply
     ```
   - Revisa los cambios planificados y confirma escribiendo `yes` cuando se te solicite.

### Modificaciones posibles:

1. **AMI (Imagen de Máquina de Amazon):**
   - Cambia el ID de la AMI en la configuración del recurso `aws_instance`:
     ```hcl
     ami = "nuevo_ami_id"
     ```

2. **Tipo de instancia:**
   - Cambia el tipo de instancia en la configuración del recurso `aws_instance`:
     ```hcl
     instance_type = "nuevo_tipo_instancia"
     ```

3. **ID de la subred:**
   - Cambia el ID de la subred en la configuración del recurso `aws_instance`:
     ```hcl
     subnet_id = "nuevo_subnet_id"
     ```

4. **Región de AWS:**
   - Cambia la región en la configuración del proveedor `aws`:
     ```hcl
     region = "nueva_region"
     ```

### Requisitos previos:

- **Instalación de Terraform:**
  - Terraform debe estar instalado en tu sistema. Si no está instalado, sigue estas instrucciones para instalarlo:
    - Descarga e instala Terraform desde [Terraform Downloads](https://www.terraform.io/downloads.html).

- **Configuración de las credenciales de AWS:**
  - Asegúrate de que las credenciales de AWS están configuradas en tu sistema. Puedes configurarlas utilizando el AWS CLI:
    ```sh
    aws configure
    ```

### Descripción de cada tarea:

1. **Configuración del proveedor de AWS:**
   - Utiliza el proveedor `aws` para especificar la región y las credenciales de AWS.

2. **Creación de la instancia EC2:**
   - Utiliza el recurso `aws_instance` para crear una instancia EC2 con la AMI especificada, el tipo de instancia y el ID de la subred.
   - Configura la instancia para usar la clave SSH especificada para la conexión.

3. **Provisioning de la instancia:**
   - Utiliza el `provisioner "remote-exec"` para ejecutar una serie de comandos en la instancia EC2 para instalar y configurar Python y MariaDB.
   - Ajusta los permisos del directorio y crea la estructura necesaria para la aplicación Python y MariaDB.

### Solución de problemas comunes:

1. **Error al crear la instancia EC2:**
   - Asegúrate de que Terraform está correctamente instalado y configurado en tu sistema.
   - Verifica que las credenciales de AWS están configuradas correctamente.

2. **Problemas de conexión SSH:**
   - Asegúrate de que la clave privada especificada en la configuración de la conexión SSH es correcta y tiene los permisos adecuados.

3. **Errores durante el provisioning:**
   - Verifica que los comandos ejecutados durante el provisioning son correctos y que las dependencias necesarias están disponibles.

### Ejecutar y verificar la configuración:

1. **Conexión a la instancia EC2:**
   - Después de que la configuración de Terraform se haya aplicado correctamente, puedes conectar a la instancia EC2 utilizando SSH:
     ```sh
     ssh -i ~/.ssh/your_private_key.pem ubuntu@<public_ip_address>
     ```

2. **Verificar la instalación de Python y MariaDB:**
   - Verifica que Python está instalado correctamente ejecutando:
     ```sh
     python3 --version
     pip3 --version
     ```

   - Verifica que MariaDB está instalado y en ejecución:
     ```sh
     sudo systemctl status mariadb
     sudo mysql -e "SHOW DATABASES;"
     ```

3. **Configurar y desplegar tu aplicación:**
   - Una vez que hayas verificado que todos los componentes están instalados y funcionando correctamente, puedes proceder a configurar y desplegar tu aplicación en la instancia EC2.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
