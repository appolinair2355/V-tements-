const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Routes pour les pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/vetements', (req, res) => {
    res.sendFile(path.join(__dirname, 'vetements.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Rediriger toutes les autres routes vers l'accueil
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 StyleShop server is running on port ${PORT}`);
    console.log(`📱 Access the website at: http://localhost:${PORT}`);
    console.log(`🔐 Admin password: kouame`);
    console.log(`📱 WhatsApp number: +22967924076`);
});
