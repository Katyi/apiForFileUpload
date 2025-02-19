const router = require('express').Router();

router.get('/', (req, res) => {
  try {
    res.status(200).json({ message: 'API is working!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
