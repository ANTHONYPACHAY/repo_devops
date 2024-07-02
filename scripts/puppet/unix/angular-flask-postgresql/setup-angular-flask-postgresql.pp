# Manifiesto de Puppet para instalar Angular, Python Flask y PostgreSQL en Unix/Linux

node default {
  
  # Actualizar paquetes
  exec { 'update_packages':
    command => '/usr/bin/apt-get update',
    path    => '/usr/bin/',
  }

  # Instalación de Node.js y Angular CLI
  class { 'nodejs':
    version => '14.x',
  }
  
  package { 'npm':
    ensure => installed,
    require => Class['nodejs'],
  }

  exec { 'install_angular_cli':
    command => '/usr/bin/npm install -g @angular/cli',
    path    => '/usr/bin/',
    require => Package['npm'],
  }

  exec { 'create_angular_project':
    command => 'ng new my-angular-app --defaults',
    cwd     => '/home/${facts['id']}/',
    path    => '/usr/bin/',
    creates => "/home/${facts['id']}/my-angular-app",
    require => Exec['install_angular_cli'],
  }

  # Instalación de Python y Flask
  package { 'python3':
    ensure => installed,
  }

  package { 'python3-pip':
    ensure => installed,
    require => Package['python3'],
  }

  exec { 'install_flask':
    command => '/usr/bin/pip3 install Flask',
    path    => '/usr/bin/',
    require => Package['python3-pip'],
  }

  exec { 'create_flask_project':
    command => 'mkdir -p /home/${facts['id']}/my_flask_app && cd /home/${facts['id']}/my_flask_app && flask create',
    path    => '/usr/bin/',
    creates => "/home/${facts['id']}/my_flask_app",
    require => Exec['install_flask'],
  }

  # Instalación de PostgreSQL
  package { 'postgresql':
    ensure => installed,
  }

  service { 'postgresql':
    ensure => running,
    enable => true,
    require => Package['postgresql'],
  }

  exec { 'create_postgres_user':
    command => "sudo -u postgres psql -c \"CREATE USER student WITH PASSWORD 'password';\"",
    path    => '/usr/bin/',
    unless  => "sudo -u postgres psql -c \"\\du\" | grep student",
    require => Service['postgresql'],
  }

  exec { 'create_postgres_db':
    command => "sudo -u postgres psql -c \"CREATE DATABASE studentdb OWNER student;\"",
    path    => '/usr/bin/',
    unless  => "sudo -u postgres psql -c \"\\l\" | grep studentdb",
    require => Exec['create_postgres_user'],
  }

  exec { 'grant_postgres_permissions':
    command => "sudo -u postgres psql -c \"ALTER USER student CREATEDB;\"",
    path    => '/usr/bin/',
    require => Exec['create_postgres_db'],
  }
}
