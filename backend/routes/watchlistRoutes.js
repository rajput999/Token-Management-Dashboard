const express = require('express');
const { getWatchList, addToWatchList, removeFromWatchList } = require('../controllers/watchlistController');
const router = express.Router();

// Routes for managing the token watch list
router.get('/:walletAddress', getWatchList);
router.post('/add', addToWatchList);
router.post('/remove', removeFromWatchList);

module.exports = router;
