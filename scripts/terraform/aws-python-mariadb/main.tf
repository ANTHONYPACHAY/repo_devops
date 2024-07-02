provider "aws" {
  region     = var.region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_instance" "web" {
  ami           = "ami-0bfb14e483c08be7d" # Ubuntu 18.04 AMI
  instance_type = "t2.micro"
  subnet_id     = var.subnet_id
  key_name      = var.key_name

  provisioner "remote-exec" {
    inline = [
      "sudo apt update",
      "sudo apt install -y python3 python3-pip",
      "sudo apt install -y mariadb-server",
      "sudo systemctl start mariadb",
      "sudo systemctl enable mariadb",
      "sudo mysql -e \"CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';\"",
      "sudo mysql -e \"CREATE DATABASE mydb;\"",
      "sudo mysql -e \"GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';\"",
      "sudo mysql -e \"FLUSH PRIVILEGES;\""
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/your_private_key.pem")
      host        = self.public_ip
    }
  }

  tags = {
    Name = "python-mariadb-instance"
  }
}

output "instance_ip" {
  value = aws_instance.web.public_ip
}
