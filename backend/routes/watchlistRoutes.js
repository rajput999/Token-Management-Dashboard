const express = require('express');
const { getWatchList, addToWatchList, removeFromWatchList ,getHistoricalData} = require('../controllers/watchlistController');
const router = express.Router();

// Routes for managing the token watch list
router.get('/:walletAddress', getWatchList);
router.post('/add', addToWatchList);
router.post('/remove', removeFromWatchList);
router.get('/:walletAddress/:tokenAddress/history', getHistoricalData);

module.exports = router;
