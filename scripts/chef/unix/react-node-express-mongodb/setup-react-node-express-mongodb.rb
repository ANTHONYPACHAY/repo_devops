# Receta de Chef para instalar React, Node.js Express y MongoDB en Unix/Linux

# Actualizar paquetes
execute 'update_packages' do
    command 'apt-get update'
  end
  
  # Instalar Node.js y npm
  execute 'install_nodejs' do
    command 'curl -sL https://deb.nodesource.com/setup_14.x | bash - && apt-get install -y nodejs'
    not_if 'node -v'
  end
  
  # Instalar Create React App globalmente
  execute 'install_create_react_app' do
    command 'npm install -g create-react-app'
    not_if 'npm list -g create-react-app'
  end
  
  # Crear proyecto React
  execute 'create_react_project' do
    command 'npx create-react-app my-react-app'
    cwd '/home/vagrant'
    user 'vagrant'
    environment ({ 'HOME' => '/home/vagrant', 'USER' => 'vagrant' })
    not_if { ::File.exist?('/home/vagrant/my-react-app') }
  end
  
  # Instalar Express y Nodemon
  execute 'install_express_nodemon' do
    command 'npm install express nodemon'
    cwd '/home/vagrant/my-react-app'
    user 'vagrant'
    environment ({ 'HOME' => '/home/vagrant', 'USER' => 'vagrant' })
  end
  
  # Instalar MongoDB
  package 'mongodb' do
    action :install
  end
  
  # Iniciar servicio MongoDB
  service 'mongodb' do
    action [:enable, :start]
  end
  
  # Crear usuario y base de datos en MongoDB
  execute 'create_mongodb_user_and_db' do
    command 'mongo mydb --eval "db.createUser({user: \'student\', pwd: \'password\', roles:[{role:\'readWrite\', db:\'mydb\'}]});"'
    not_if 'mongo mydb --eval "db.getUser(\'student\')" | grep student'
  end
  