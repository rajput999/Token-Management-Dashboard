const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  tokens: { type: [String], required: true }
});

module.exports = mongoose.model('WatchList', watchListSchema);
