# Instrucciones para estandarizar el entorno y ejecutar una aplicación básica en .NET utilizando PowerShell

### Requisitos previos:

1. **Instalación de PowerShell:**
   - PowerShell debe estar instalado en tu sistema. Es recomendable usar PowerShell 5.1 o superior.

### Pasos para ejecutar el script:

1. **Guardar el archivo de configuración:**
   - Guarda el contenido del script en un archivo llamado `setup-dotnet-app.ps1`.

2. **Ejecutar el script de PowerShell:**
   - Abre PowerShell como administrador y navega hasta el directorio donde guardaste el archivo.
   - Ejecuta el siguiente comando para ejecutar el script:
     ```ps1
     .\setup-dotnet-app.ps1
     ```

### Descripción del script:

1. **Obtener el directorio donde se encuentra el script PS1:**
   - El script obtiene el directorio en el que se encuentra para usarlo como base para crear la aplicación.

2. **Verificar si .NET SDK está instalado:**
   - El script verifica si .NET SDK está instalado en el sistema. Si no está instalado, procede a descargar e instalar la versión correspondiente según el sistema operativo.

3. **Crear un directorio para la aplicación en el mismo directorio del script PS1:**
   - El script crea un directorio para la nueva aplicación .NET en el mismo directorio donde se encuentra el script.

4. **Crear una aplicación de consola en .NET:**
   - El script genera una nueva aplicación de consola utilizando .NET SDK y reemplaza el contenido del archivo `Program.cs` con un ejemplo de aplicación.

5. **Restaurar las dependencias del proyecto:**
   - El script ejecuta `dotnet restore` para restaurar las dependencias del proyecto.

6. **Compilar el proyecto:**
   - El script ejecuta `dotnet build` para compilar el proyecto.

7. **Ejecutar el proyecto:**
   - El script ejecuta `dotnet run` para ejecutar la aplicación de consola.

### Script de PowerShell:

```ps1
# Script PowerShell para estandarizar el entorno y ejecutar una aplicación básica en el mismo directorio

# Obtener el directorio donde se encuentra el script PS1
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Verificar si .NET SDK está instalado
$dotnetInstalled = Get-Command dotnet -ErrorAction SilentlyContinue

if (-not $dotnetInstalled) {
    Write-Host ".NET SDK no está instalado. Procediendo a la instalación..."
    
    # Determinar el sistema operativo y la arquitectura
    $is64Bit = [Environment]::Is64BitOperatingSystem
    $osVersion = [System.Environment]::OSVersion.Version
    $osName = $osVersion.Major

    # Descargar e instalar .NET SDK
    if ($osName -eq 10) {
        $dotnetInstallerUrl = "https://download.visualstudio.microsoft.com/download/pr/7f44110c-0d5f-480d-a9db-b92d5e21f819/20cfbfcac71097d7df0cd42b6a735849/dotnet-sdk-6.0.300-win-x64.exe"
    } elseif ($osName -eq 6) {
        $dotnetInstallerUrl = "https://download.visualstudio.microsoft.com/download/pr/9df5b8a5-6f25-4724-9bdf-e6e65031cb09/8c9b49f61a4da10e4b1f4a53adfd8cbb/dotnet-sdk-5.0.408-win-x64.exe"
    } else {
        Write-Host "Sistema operativo no soportado. Instalación manual requerida."
        exit 1
    }

    $installerPath = "$env:TEMP\dotnet-sdk-installer.exe"
    Invoke-WebRequest -Uri $dotnetInstallerUrl -OutFile $installerPath

    # Ejecutar el instalador
    Start-Process -FilePath $installerPath -ArgumentList "/quiet" -Wait

    # Verificar nuevamente si .NET SDK está instalado
    $dotnetInstalled = Get-Command dotnet -ErrorAction SilentlyContinue
    if (-not $dotnetInstalled) {
        Write-Host "La instalación de .NET SDK falló. Por favor, instala manualmente."
        exit 1
    }
}

Write-Host ".NET SDK está instalado. Creando y ejecutando la aplicación de ejemplo..."

# Crear un directorio para la aplicación en el mismo directorio del script PS1
$appDir = Join-Path $scriptDir "DotNetApp"
New-Item -ItemType Directory -Force -Path $appDir

# Crear una aplicación de consola en .NET
dotnet new console -o $appDir

# Cambiar el contenido del archivo Program.cs
$programPath = Join-Path $appDir "Program.cs"
Set-Content -Path $programPath -Value @'
using System;

namespace DotNetApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hola, esta es una aplicación de ejemplo en .NET!");
            // Aquí se puede empezar a modificar el código para agregar nuevas funcionalidades
            // Por ejemplo, una calculadora básica:
            Console.WriteLine("Ingrese el primer número:");
            double num1 = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Ingrese el segundo número:");
            double num2 = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Ingrese la operación (+, -, *, /):");
            string operacion = Console.ReadLine();

            double resultado = 0;

            switch (operacion)
            {
                case "+":
                    resultado = num1 + num2;
                    break;
                case "-":
                    resultado = num1 - num2;
                    break;
                case "*":
                    resultado = num1 * num2;
                    break;
                case "/":
                    if (num2 != 0)
                    {
                        resultado = num1 / num2;
                    }
                    else
                    {
                        Console.WriteLine("No se puede dividir por cero.");
                        return;
                    }
                    break;
                default:
                    Console.WriteLine("Operación no válida.");
                    return;
            }

            Console.WriteLine($"El resultado de {num1} {operacion} {num2} es: {resultado}");
        }
    }
}
'@

# Restaurar las dependencias del proyecto
dotnet restore

# Compilar el proyecto
dotnet build

# Ejecutar el proyecto
dotnet run

Write-Host "Aplicación ejecutada exitosamente. Ahora puede ser modificada para otros fines, como una calculadora."

### Solución de problemas comunes:

1. **Error al instalar .NET SDK:**
   - Asegúrate de que PowerShell está configurado para permitir la ejecución de scripts y que tienes acceso a Internet.

2. **Problemas de PATH:**
   - Si .NET SDK no se reconoce después de la instalación, asegúrate de que se agregó correctamente al PATH del sistema y reinicia PowerShell.

3. **Errores durante la ejecución del script:**
   - Verifica los mensajes de error en PowerShell para identificar posibles problemas y busca soluciones en la documentación oficial de .NET.

Si tienes alguna duda o problema al seguir estas instrucciones, por favor, contacta con el soporte técnico de tu institución para obtener ayuda adicional.
