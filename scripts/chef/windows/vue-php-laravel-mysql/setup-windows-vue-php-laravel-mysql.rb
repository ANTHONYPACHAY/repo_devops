# Receta de Chef para instalar Vue.js, PHP Laravel y MySQL en Windows

# Asegurar que Chocolatey está instalado
execute 'install_chocolatey' do
    command 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString("https://chocolatey.org/install.ps1"))'
    not_if 'choco -v'
    provider :powershell
  end
  
  # Instalación de Node.js
  execute 'install_nodejs' do
    command 'choco install -y nodejs-lts'
    not_if 'node -v'
    provider :powershell
  end
  
  # Instalación de Vue CLI
  execute 'install_vue_cli' do
    command 'npm install -g @vue/cli'
    not_if 'npm list -g @vue/cli'
    provider :powershell
    environment ({ 'HOME' => 'C:\\Users\\vagrant', 'USER' => 'vagrant' })
  end
  
  # Crear proyecto Vue
  execute 'create_vue_project' do
    command 'vue create my-vue-app -d'
    cwd 'C:\\Users\\vagrant'
    user 'vagrant'
    provider :powershell
    not_if { ::File.exist?('C:\\Users\\vagrant\\my-vue-app') }
  end
  
  # Instalación de PHP
  execute 'install_php' do
    command 'choco install -y php'
    provider :powershell
  end
  
  # Instalación de Composer
  execute 'install_composer' do
    command 'php -r "copy(\'https://getcomposer.org/installer\', \'composer-setup.php\');" && php composer-setup.php && php -r "unlink(\'composer-setup.php\');" && move composer.phar /usr/local/bin/composer'
    not_if 'composer --version'
    provider :powershell
  end
  
  # Instalación de Laravel
  execute 'install_laravel' do
    command 'composer global require laravel/installer'
    provider :powershell
    environment ({ 'COMPOSER_HOME' => 'C:\\Users\\vagrant\\AppData\\Roaming\\Composer\\vendor\\bin' })
  end
  
  # Crear proyecto Laravel
  execute 'create_laravel_project' do
    command 'laravel new my-laravel-app'
    cwd 'C:\\Users\\vagrant'
    user 'vagrant'
    provider :powershell
    not_if { ::File.exist?('C:\\Users\\vagrant\\my-laravel-app') }
  end
  
  # Instalación de MySQL
  execute 'install_mysql' do
    command 'choco install -y mysql'
    provider :powershell
  end
  
  # Iniciar servicio MySQL
  execute 'start_mysql_service' do
    command 'Start-Service MySQL'
    provider :powershell
  end
  
  # Configuración de MySQL
  execute 'configure_mysql' do
    command 'mysql -u root -e "CREATE USER \'student\'@\'localhost\' IDENTIFIED BY \'password\'; CREATE DATABASE studentdb; GRANT ALL PRIVILEGES ON studentdb.* TO \'student\'@\'localhost\'; FLUSH PRIVILEGES;"'
    provider :powershell
  end
  