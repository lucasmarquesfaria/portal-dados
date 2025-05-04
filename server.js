const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Armazenar as localizações em memória
let locations = [];

// Rota para receber a localização
app.post('/api/location', (req, res) => {
    const { latitude, longitude, timestamp } = req.body;
    locations.push({
        latitude,
        longitude,
        timestamp,
        id: Date.now()
    });
    res.json({ success: true });
});

// Rota para obter todas as localizações
app.get('/api/locations', (req, res) => {
    res.json(locations);
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});