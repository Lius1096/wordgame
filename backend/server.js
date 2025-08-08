require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const frenchWordsRoutes = require('./routes/frenchWords.routes');
const Score = require('./models/Score');

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;

// Connexion MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));


app.use('/api/french-words', frenchWordsRoutes);

app.post('/api/scores', async (req, res) => {
  try {
    const { username, score, language } = req.body;
    const newScore = new Score({ username, score, language });
    await newScore.save();
    res.status(201).json({ message: 'Score enregistré.' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement du score.' });
  }
});

app.get('/api/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des scores.' });
  }
});

// Servir front statique après les routes API
app.use(express.static(path.join(__dirname, 'public')));

//catch-all SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
