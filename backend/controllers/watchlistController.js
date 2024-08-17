const WatchList = require('../models/WatchList');

// Get watchlist for a wallet address
exports.getWatchList = async (req, res) => {
  try {
    const watchList = await WatchList.findOne({ walletAddress: req.params.walletAddress });
    res.json(watchList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add tokens to watchlist
exports.addToWatchList = async (req, res) => {
  const { walletAddress, token } = req.body;

  try {
    let watchList = await WatchList.findOne({ walletAddress });
    
    if (!watchList) {
      watchList = new WatchList({ walletAddress, tokens: [token] });
    } else {
      watchList.tokens.push(token);
    }
    
    await watchList.save();
    res.json(watchList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove token from watchlist
exports.removeFromWatchList = async (req, res) => {
  const { walletAddress, token } = req.body;

  try {
    let watchList = await WatchList.findOne({ walletAddress });
    
    if (watchList) {
      watchList.tokens = watchList.tokens.filter(t => t !== token);
      await watchList.save();
    }
    
    res.json(watchList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
