const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const watchListSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  tokens: { type: [tokenSchema], required: true }
});

module.exports = mongoose.model('WatchList', watchListSchema);
