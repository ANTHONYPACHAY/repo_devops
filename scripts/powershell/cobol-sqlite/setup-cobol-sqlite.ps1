# Variables
$CobolVersion = "3.1.2"
$SQLiteVersion = "3.35.5"

# Actualizar paquetes
Write-Output "Actualizando paquetes..."
choco upgrade chocolatey

# Instalación de GnuCOBOL
Write-Output "Instalando GnuCOBOL..."
choco install gnucobol -y --version $CobolVersion

# Verificar instalación de GnuCOBOL
Write-Output "Verificando instalación de GnuCOBOL..."
cobc -V

# Instalación de SQLite
Write-Output "Instalando SQLite..."
choco install sqlite -y --version $SQLiteVersion

# Verificar instalación de SQLite
Write-Output "Verificando instalación de SQLite..."
sqlite3 --version

# Crear una base de datos SQLite y una tabla de ejemplo
Write-Output "Creando base de datos SQLite y tabla de ejemplo..."
sqlite3 mydatabase.db "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);"

# Crear un archivo COBOL simple para interactuar con SQLite
Write-Output "Creando un archivo COBOL para interactuar con SQLite..."
$CobolProgram = @"
       IDENTIFICATION DIVISION.
       PROGRAM-ID. SQLiteExample.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-SQLITE-DB PIC X(100) VALUE 'mydatabase.db'.
       01 WS-SQLITE-CONN PIC S9(9) COMP.
       01 WS-SQL-QUERY PIC X(100) VALUE 'INSERT INTO users (name) VALUES (''John Doe'')'.
       01 WS-ERROR-MESSAGE PIC X(100).

       PROCEDURE DIVISION.
       MAIN-PARA.
           CALL 'sqlite3_open' USING BY REFERENCE WS-SQLITE-DB
                                  BY REFERENCE WS-SQLITE-CONN
           IF RETURN-CODE NOT = 0
               DISPLAY 'Error al conectar a la base de datos SQLite'
               STOP RUN
           END-IF
           CALL 'sqlite3_exec' USING BY VALUE WS-SQLITE-CONN
                                 BY REFERENCE WS-SQL-QUERY
                                 BY REFERENCE WS-ERROR-MESSAGE
           IF RETURN-CODE NOT = 0
               DISPLAY 'Error al ejecutar la consulta SQL'
               DISPLAY WS-ERROR-MESSAGE
               STOP RUN
           END-IF
           DISPLAY 'Registro insertado en la base de datos SQLite!'
           CALL 'sqlite3_close' USING BY VALUE WS-SQLITE-CONN
           STOP RUN.
"@
$CobolProgram | Out-File -FilePath .\SQLiteExample.cbl

# Compilar el programa COBOL
Write-Output "Compilando el programa COBOL..."
cobc -x -o SQLiteExample.exe SQLiteExample.cbl -lsqlite3

# Ejecutar el programa COBOL
Write-Output "Ejecutando el programa COBOL..."
.\SQLiteExample.exe

# Información de finalización
Write-Output "Instalación y configuración completas."
Write-Output "GnuCOBOL version: $(cobc -V)"
Write-Output "SQLite version: $(sqlite3 --version)"
Write-Output "Programa COBOL 'SQLiteExample' ejecutado correctamente."
