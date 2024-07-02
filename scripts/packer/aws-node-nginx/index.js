// Importa el módulo HTTP de Node.js
const http = require('http');

// Define el nombre del host y el puerto
const hostname = 'localhost';
const port = 3000;

// Crea un servidor HTTP utilizando la función createServer
const server = http.createServer((req, res) => {
  // Configura el código de estado de la respuesta HTTP a 200 (OK)
  res.statusCode = 200;

  // Configura el encabezado Content-Type de la respuesta a 'text/plain'
  res.setHeader('Content-Type', 'text/plain');

  // Envía la respuesta al cliente 
  res.end('HOLA MUNDO, SOY BRITO CASANOVA GEOVANNY!\n');
});

// Hace que el servidor escuche en el puerto y el host especificados
server.listen(port, hostname, () => {
  // Imprime un mensaje en la consola cuando el servidor está en funcionamiento
  console.log(`Server running at http://${hostname}:${port}/`);
});
