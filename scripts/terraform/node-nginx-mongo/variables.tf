# ------- CREDENCIALES AWZ -------

# Variables de llave acceso
variable "aws_access_key" {
  type    = string
  default = "*"
}

# Variables de llave acceso secreta
variable "aws_secret_key" {
  type    = string
  default = "*"
}

# Variables de llave acceso secreta
variable "region" {
  type    = string
  default = "us-east-1"
}

# Nombre de pares de clave
variable "key_name" {
  type    = string
  default = "passgeobricex"
}

# ID de la VPC
variable "vpc_id" {
  type    = string
  default = "vpc-077486477ed75de11"
}

# Configuración de las subredes
variable "subnets" {
  default = [
    { cidr_block = "172.31.0.0/20", az = "us-east-1a" },
    { cidr_block = "172.31.16.0/20", az = "us-east-1c" },
  ]
}

# ------- FIN CREDENCIALES AWZ ------- 

# ------- VARIABLES DE MONGODB -------

# IP privada .16
variable "mongo_priv_ip" {
  type    = string
  default = "172.31.0.8"
}

# ------- FIN VARIABLES DE MONGODB -------

# ------- VARIABLES DE APLICACIÓN -------

# IP privada .32
variable "app_priv_ip" {
  type    = string
  default = "172.31.0.24"
}

variable "app_priv_ip_2" {
  type    = string
  default = "172.31.16.48"
}

# ------- FIN VARIABLES DE APLICACIÓN -------

