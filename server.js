const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Armazenar localizações em memória
const locations = [];

// API para salvar localização
app.post('/api/location', (req, res) => {
    const { latitude, longitude } = req.body;
    locations.push({
        latitude,
        longitude,
        timestamp: new Date().toISOString()
    });
    res.json({ success: true });
});

// API para listar localizações
app.get('/api/locations', (req, res) => {
    res.json(locations);
});

// Porta padrão da Vercel
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});