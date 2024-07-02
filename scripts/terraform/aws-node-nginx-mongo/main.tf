# Bloque de configuración de Terraform
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws" # Indica que se utilizará el proveedor AWS de HashiCorp.
      version = "~> 3.27"       # Especifica que se debe usar una versión del proveedor AWS que sea compatible con la versión 3.27, pero no una versión mayor que 4.0.
    }
  }
  required_version = ">= 0.14.9" # Especifica que esta configuración de Terraform requiere al menos la versión 0.14.9 de Terraform.
}

# Configuración del proveedor AWS
provider "aws" {
  profile    = "default"          # Utiliza el perfil "default" definido en las credenciales de AWS.
  region     = var.region         # Establece la región de AWS a la que se conectará Terraform.
  access_key = var.aws_access_key # La clave de acceso de AWS para la autenticación.
  secret_key = var.aws_secret_key # La clave secreta de AWS para la autenticación.
}

# Creación de un grupo de seguridad en AWS
resource "aws_security_group" "my_securitygroup" {
  description = "Grupo de seguridad" # Descripción del grupo de seguridad.
  name        = "my_securitygroup"   # Nombre asignado al grupo de seguridad.
  vpc_id      = var.vpc_id           # ID de la VPC donde se creará el grupo de seguridad.

  # Reglas de entrada
  ingress {
    from_port   = 0             # Desde el puerto (0 indica todos los puertos)
    to_port     = 0             # Hasta el puerto (0 indica todos los puertos)
    protocol    = "-1"          # Protocolo (-1 indica todos los protocolos)
    cidr_blocks = ["0.0.0.0/0"] # Bloques CIDR desde donde se permite el tráfico entrante.
  }

  # Reglas de salida
  egress {
    from_port   = 0             # Desde el puerto (0 indica todos los puertos)
    to_port     = 0             # Hasta el puerto (0 indica todos los puertos)
    protocol    = "-1"          # Protocolo (-1 indica todos los protocolos)
    cidr_blocks = ["0.0.0.0/0"] # Bloques CIDR a los que se permite el tráfico saliente.
  }

  tags = {
    Name = "my_securitygroup" # Etiqueta para identificar el grupo de seguridad.
  }
}


resource "aws_subnet" "my_subred" {
  count             = length(var.subnets)
  vpc_id            = var.vpc_id
  cidr_block        = var.subnets[count.index].cidr_block
  availability_zone = var.subnets[count.index].az

  tags = {
    Name = "my_subred_${count.index}"
  }
}


# Obtención de una AMI de Ubuntu
data "aws_ami" "ubuntu" {
  most_recent = true             # Indica que se debe obtener la AMI más reciente.
  owners      = ["099720109477"] # ID del propietario de la AMI, en este caso Canonical.

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-*-20.04-amd64-server-*"] # Filtra las AMI para obtener una versión específica de Ubuntu.
  }
}

# Configuración de una instancia EC2 para MongoDB
resource "aws_instance" "mongodb" {
  ami                         = data.aws_ami.ubuntu.id                   # ID de la AMI a usar para la instancia.
  instance_type               = "t2.micro"                               # Tipo de instancia EC2.
  key_name                    = var.key_name                             # Nombre del key pair para acceso SSH.
  subnet_id                   = aws_subnet.my_subred[0].id               # Subred donde se lanzará la instancia de MongoDB (subred privada).
  vpc_security_group_ids      = [aws_security_group.my_securitygroup.id] # ID del grupo de seguridad asociado.
  private_ip                  = var.mongo_priv_ip                        # Dirección IP privada asignada a la instancia.
  associate_public_ip_address = true

  tags = {
    Name = "Servidor_MongoDB" # Etiqueta para identificar la instancia de MongoDB.
  }

  # Provisioner para copiar un archivo de configuración a la instancia
  provisioner "file" {
    source      = "app/bd_config.sh"  # Ruta local del archivo de configuración
    destination = "/tmp/bd_config.sh" # Ruta de destino en la instancia

    # Configuración de la conexión SSH para transferir el archivo
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("passgeobricex.pem")
      host        = self.public_ip
    }
  }

  provisioner "remote-exec" {
    inline = [
      "ls -l /tmp/bd_config.sh",    # Lista el archivo bd_config.sh para verificar su existencia y permisos
      "chmod +x /tmp/bd_config.sh", # Cambia los permisos del archivo para hacerlo ejecutable
      "/tmp/bd_config.sh"           # Ejecuta el script bd_config.sh
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("passgeobricex.pem")
      host        = self.public_ip # Dirección IP pública
    }
  }
}

resource "aws_instance" "app_server" {
  count                       = 2 # Crea dos instancias
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = var.key_name
  subnet_id                   = aws_subnet.my_subred[count.index % length(var.subnets)].id
  vpc_security_group_ids      = [aws_security_group.my_securitygroup.id]
  private_ip                  = count.index == 0 ? var.app_priv_ip : var.app_priv_ip_2
  associate_public_ip_address = true
  tags = {
    Name = "Servidor_Web-${count.index + 1}"
  }
  # Provisioner para crear un archivo hello.js en la instancia
  provisioner "file" {
    content = <<-EOT
        const http = require('http');
        const MongoClient = require('mongodb').MongoClient;

        const hostname = 'localhost';
        const port = 8080;

        // Asegúrate de que la dirección IP sea la correcta
        const url = `mongodb://${aws_instance.mongodb.private_ip}:27017/my_bd`;

        let dbConnection;

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.error('Error al conectar a MongoDB:', err);
            } else {
                console.log('Conectado exitosamente a MongoDB');
                dbConnection = client.db('my_bd');
                // Aquí puedes hacer algo con la conexión a MongoDB
            }
        });

        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');

            let message = "¡HOLA MUNDO! ¡Soy Brito Casanova Geovanny!\n";
            if (dbConnection) {
                message += "Conectado exitosamente a MongoDB en " + url;
            } else {
                message += "No se pudo conectar a MongoDB.";
            }
            res.end(message);
        });

        server.listen(port, hostname, () => {
            console.log("Servidor corriendo en http://" + hostname + ":" + port + "/");
        });

    EOT 
    #Destino del fichero
    destination = "/tmp/hello.js"

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("passgeobricex.pem")
      host        = self.public_ip
    }
  }

  # Provisioner para copiar un archivo de configuración a la instancia
  provisioner "file" {
    source      = "app/app_config.sh"  # Ruta local del archivo de configuración
    destination = "/tmp/app_config.sh" # Ruta de destino en la instancia

    # Configuración de la conexión SSH para transferir el archivo
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("passgeobricex.pem")
      host        = self.public_ip
    }
  }

  # Un provisioner 'file' que copia un archivo local a una ubicación remota en la instancia
  provisioner "file" {
    source      = "app/node"  # Ruta del archivo local a copiar
    destination = "/tmp/node" # Ruta de destino en la instancia remota
    # Configuración de conexión SSH para la instancia remota
    connection {
      type        = "ssh"                     # Tipo de conexión, en este caso SSH
      user        = "ubuntu"                  # Nombre de usuario para la conexión SSH
      private_key = file("passgeobricex.pem") # Llave privada para la conexión SSH
      host        = self.public_ip            # Dirección IP pública de la instancia (obtenida dinámicamente)
    }
  }

  # Un provisioner 'remote-exec' que ejecuta comandos en la instancia remota
  provisioner "remote-exec" {
    # Lista de comandos que se ejecutarán en la instancia remota
    inline = [
      "ls -l /tmp/app_config.sh",    # Lista el archivo app_config.sh para verificar su existencia y permisos
      "chmod +x /tmp/app_config.sh", # Cambia los permisos del archivo para hacerlo ejecutable
      "/tmp/app_config.sh"           # Ejecuta el script app_config.sh
    ]
    # Configuración de conexión SSH, similar al provisioner 'file'
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("passgeobricex.pem")
      host        = self.public_ip
    }
  }
}

# Creación del Application Load Balancer (ALB)
resource "aws_lb" "my_alb" {
  name               = "hello-mean"                                             # Nombre del ALB
  internal           = false                                                    # Especifica que el ALB es accesible desde Internet
  load_balancer_type = "application"                                            # Tipo de ALB, en este caso, un Application Load Balancer
  security_groups    = [aws_security_group.my_securitygroup.id]                 # Grupos de seguridad asociados al ALB
  subnets            = [aws_subnet.my_subred[0].id, aws_subnet.my_subred[1].id] # Subredes donde se desplegará el ALB

  enable_deletion_protection = false # Desactiva la protección contra borrado para permitir eliminar el ALB

  tags = {
    Name = "my-alb" # Etiqueta para identificar el ALB
  }
}

# Creación del Target Group para el ALB
resource "aws_lb_target_group" "my_target_group" {
  name     = "my-target-group" # Nombre del Target Group
  port     = 80                # Puerto en el que el Target Group recibirá tráfico
  protocol = "HTTP"            # Protocolo utilizado por el Target Group
  vpc_id   = var.vpc_id        # ID de la VPC en la que se crea el Target Group

  # Configuración del chequeo de salud
  health_check {
    healthy_threshold   = 2      # Número de chequeos exitosos para considerar una instancia sana
    unhealthy_threshold = 2      # Número de chequeos fallidos para considerar una instancia insana
    timeout             = 3      # Tiempo de espera para cada chequeo de salud
    path                = "/"    # Ruta utilizada para el chequeo de salud
    protocol            = "HTTP" # Protocolo utilizado para el chequeo de salud
    matcher             = "200"  # Código de respuesta esperado para considerar sana una instancia
    interval            = 30     # Intervalo entre chequeos de salud
  }
}

resource "aws_lb_target_group_attachment" "attach_instance" {
  count            = 2
  target_group_arn = aws_lb_target_group.my_target_group.arn
  target_id        = aws_instance.app_server.*.id[count.index]
  port             = 80
}

# Creación del Listener para el ALB
resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.my_alb.arn # ARN del ALB
  port              = "80"              # Puerto en el que el Listener escuchará
  protocol          = "HTTP"            # Protocolo utilizado por el Listener

  # Acción por defecto del Listener
  default_action {
    type             = "forward"                               # Tipo de acción, en este caso, reenviar el tráfico
    target_group_arn = aws_lb_target_group.my_target_group.arn # ARN del Target Group al que se reenvía el tráfico
  }
}
