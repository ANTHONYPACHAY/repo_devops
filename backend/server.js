const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurar CORS
app.use(cors());

// Ruta para descargar el archivo
app.get('/download', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error fetching file');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
