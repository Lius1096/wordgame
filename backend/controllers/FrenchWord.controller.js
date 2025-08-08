const FrenchWord = require('../models/FrenchWord');

exports.getRandomFrenchWord = async (req, res) => {
  try {
    const category = req.query.category;
    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    const candidates = await FrenchWord.aggregate([
      { $match: { category, word: { $exists: true }, length: { $gte: 4, $lte: 10 } } },
      { $sample: { size: 1 } }
    ]);

    if (!candidates.length) {
      return res.status(404).json({ error: 'Aucun mot trouvé pour cette catégorie' });
    }

    const word = candidates[0];
    return res.json({
      word: word.word,
      hint: word.hint || null
    });
  } catch (err) {
    console.error("Erreur getRandomFrenchWord :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
