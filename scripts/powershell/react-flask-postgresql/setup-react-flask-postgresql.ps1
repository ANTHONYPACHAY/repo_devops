# Variables
$NodeVersion = "14.x"
$PostgresUser = "student"
$PostgresPassword = "password"
$PostgresDatabase = "studentdb"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Node.js y React
Write-Output "Instalando Node.js y React..."
choco install -y nodejs-lts
npm install -g create-react-app

# Crear un nuevo proyecto React
Write-Output "Creando proyecto React..."
npx create-react-app my-react-app

# Instalación de Python y Flask
Write-Output "Instalando Python y Flask..."
choco install -y python
pip install Flask

# Instalación y configuración de PostgreSQL
Write-Output "Instalando PostgreSQL..."
choco install -y postgresql
Write-Output "Configurando PostgreSQL..."
Start-Service postgresql-x64-13
Set-Service -Name postgresql-x64-13 -StartupType Automatic
psql -U postgres -c "CREATE USER $PostgresUser WITH PASSWORD '$PostgresPassword';"
psql -U postgres -c "CREATE DATABASE $PostgresDatabase OWNER $PostgresUser;"
psql -U postgres -c "ALTER USER $PostgresUser CREATEDB;"

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "Node.js version: $(node -v)"
Write-Output "NPM version: $(npm -v)"
Write-Output "React app creada en 'my-react-app'."
Write-Output "Python version: $(python --version)"
Write-Output "Flask version: $(flask --version)"
Write-Output "Base de datos PostgreSQL '$PostgresDatabase' creada con el usuario '$PostgresUser'."
