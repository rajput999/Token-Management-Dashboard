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

    const newToken = { token, date: Date.now() };

    if (!watchList) {
      // Create a new watchlist if none exists
      watchList = new WatchList({ walletAddress, tokens: [newToken] });
    } else {
      // Push the new token object (with date) to the tokens array
      watchList.tokens.push(newToken);
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
      const tokenIndex = watchList.tokens.findIndex(t => t.token === token);
      if (tokenIndex !== -1) {
        watchList.tokens.splice(tokenIndex, 1);
        await watchList.save();
      }
    }

    res.json(watchList);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHistoricalData = async (req, res) => {
  const { walletAddress, tokenAddress } = req.params;
  const { startDate, endDate } = req.query;

  try {
    // Convert startDate and endDate to Date objects, assuming they are in ISO format in the request
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    console.log(walletAddress, tokenAddress, start, end);

    const history = await WatchList.find({
      walletAddress,
      tokens: {
        $elemMatch: {
          token: tokenAddress,
          date: { $gte: start, $lte: end }
        }
      }
    }, {
      "tokens.$": 1 // Project only the matched token
    });

    res.status(200).json(history);
  } catch (err) {
    console.error("Error fetching historical data:", err);
    res.status(500).json({ error: err.message });
  }
};
