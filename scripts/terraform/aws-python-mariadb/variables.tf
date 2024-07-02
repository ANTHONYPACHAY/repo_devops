variable "region" {
  description = "The AWS region to deploy in"
  default     = "us-east-1"
}

variable "aws_access_key" {
  description = "Your AWS access key"
}

variable "aws_secret_key" {
  description = "Your AWS secret key"
}

variable "subnet_id" {
  description = "The subnet ID to deploy the instance in"
}

variable "key_name" {
  description = "The name of the SSH key pair"
}
