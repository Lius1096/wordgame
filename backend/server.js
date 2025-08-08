const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Score = require('./models/Score');

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/wordgame', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Servir le front statique (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.post('/api/scores', async (req, res) => {
  const { username, score, language } = req.body;
  const newScore = new Score({ username, score, language });
  await newScore.save();
  res.status(201).json({ message: 'Score enregistré.' });
});

app.get('/api/scores', async (req, res) => {
  const scores = await Score.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

// Redirection vers index.html pour routes inconnues (SPA support si besoin)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Lancement du serveur
app.listen(3000, () => {
  console.log(" Serveur sur http://localhost:3000");
});