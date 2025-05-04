const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurações básicas com CORS mais permissivo
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());
app.use(express.static('public'));

// Armazenar as localizações em memória
let locations = [];

// Rota para receber a localização
app.post('/api/location', (req, res) => {
    try {
        const { latitude, longitude, timestamp } = req.body;
        
        if (!latitude || !longitude) {
            return res.status(400).json({ 
                success: false, 
                error: 'Latitude e longitude são obrigatórios' 
            });
        }

        locations.push({
            latitude,
            longitude,
            timestamp: timestamp || new Date().toISOString(),
            id: Date.now()
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar localização:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro interno ao salvar localização' 
        });
    }
});

// Rota para obter todas as localizações
app.get('/api/locations', (req, res) => {
    try {
        res.json(locations);
    } catch (error) {
        console.error('Erro ao buscar localizações:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Erro ao buscar localizações' 
        });
    }
});

// Tratamento para rotas não encontradas
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});