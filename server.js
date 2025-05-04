const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurações básicas
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Armazenar as localizações (em um ambiente real, você usaria um banco de dados)
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

// Rota para obter todas as localizações (sem autenticação)
app.get('/api/locations', (req, res) => {
    res.json(locations);
});

// Rota para a página admin
app.get('/admin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Rota padrão
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});