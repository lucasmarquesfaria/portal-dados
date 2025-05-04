const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configurações de segurança básicas
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.ALLOWED_ORIGIN : '*'
}));
app.use(bodyParser.json());

// Servir arquivos estáticos
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

// Rota para obter todas as localizações
app.get('/api/locations', (req, res) => {
    // Adiciona verificação básica de senha para a rota admin
    const adminKey = process.env.ADMIN_KEY || 'admin123';
    const providedKey = req.headers['x-admin-key'];

    if (providedKey !== adminKey) {
        return res.status(401).json({ error: 'Acesso não autorizado' });
    }
    
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