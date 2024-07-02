# Variables
$RustupVersion = "default"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de Rust
Write-Output "Instalando Rust..."
choco install rustup -y --version $RustupVersion

# Agregar Rust al PATH
$env:Path += ";C:\Users\$env:USERNAME\.cargo\bin"

# Verificar instalación de Rust
Write-Output "Verificando instalación de Rust..."
rustup default stable
rustc --version
cargo --version

# Crear directorio de proyecto
Write-Output "Creando directorio de proyecto..."
New-Item -Path "C:\Users\$env:USERNAME\rust\my-rocket-app" -ItemType Directory -Force
Set-Location -Path "C:\Users\$env:USERNAME\rust\my-rocket-app"

# Inicializar proyecto Rust
Write-Output "Inicializando proyecto Rust..."
cargo init --bin

# Modificar Cargo.toml para agregar Rocket
Write-Output "Modificando Cargo.toml para agregar Rocket..."
$CargoToml = @"
[package]
name = "my-rocket-app"
version = "0.1.0"
edition = "2018"

[dependencies]
rocket = "0.4.7"
"@
$CargoToml | Out-File -FilePath .\Cargo.toml

# Crear archivo main.rs
Write-Output "Creando archivo main.rs..."
$MainRs = @"
#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, World!"
}

fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
"@
$MainRs | Out-File -FilePath .\src\main.rs

# Compilar y ejecutar la aplicación
Write-Output "Compilando y ejecutando la aplicación Rocket..."
cargo build
cargo run
