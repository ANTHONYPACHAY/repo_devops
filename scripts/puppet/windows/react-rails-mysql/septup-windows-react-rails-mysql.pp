# Manifiesto de Puppet para instalar React, Ruby on Rails y MySQL en Windows

node default {

  # Asegurar que Chocolatey está instalado
  exec { 'install_chocolatey':
    command => 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString("https://chocolatey.org/install.ps1"))',
    provider => powershell,
    unless  => 'choco -v',
  }

  # Instalación de Node.js
  exec { 'install_nodejs':
    command => 'choco install -y nodejs-lts',
    provider => powershell,
    require => Exec['install_chocolatey'],
  }

  # Instalación de Create React App
  exec { 'install_create_react_app':
    command => 'npm install -g create-react-app',
    provider => powershell,
    require => Exec['install_nodejs'],
  }

  # Crear proyecto React
  exec { 'create_react_project':
    command => 'npx create-react-app my-react-app',
    cwd     => "C:\\Users\\${facts['identity']['user']}\\",
    provider => powershell,
    creates => "C:\\Users\\${facts['identity']['user']}\\my-react-app",
    require => Exec['install_create_react_app'],
  }

  # Instalación de Ruby
  exec { 'install_ruby':
    command => 'choco install -y ruby',
    provider => powershell,
    require => Exec['install_chocolatey'],
  }

  # Instalación de Rails
  exec { 'install_rails':
    command => 'gem install rails',
    provider => powershell,
    require => Exec['install_ruby'],
  }

  # Crear proyecto Rails
  exec { 'create_rails_project':
    command => 'rails new my-rails-app',
    cwd     => "C:\\Users\\${facts['identity']['user']}\\",
    provider => powershell,
    creates => "C:\\Users\\${facts['identity']['user']}\\my-rails-app",
    require => Exec['install_rails'],
  }

  # Instalación de MySQL
  exec { 'install_mysql':
    command => 'choco install -y mysql',
    provider => powershell,
    require => Exec['install_chocolatey'],
  }

  # Iniciar servicio MySQL
  exec { 'start_mysql_service':
    command => 'Start-Service MySQL',
    provider => powershell,
    require => Exec['install_mysql'],
  }

  # Configuración de MySQL
  exec { 'configure_mysql':
    command => 'mysql -u root -e "CREATE USER \'student\'@\'localhost\' IDENTIFIED BY \'password\'; CREATE DATABASE studentdb; GRANT ALL PRIVILEGES ON studentdb.* TO \'student\'@\'localhost\'; FLUSH PRIVILEGES;"',
    provider => powershell,
    require => Exec['start_mysql_service'],
  }
}
