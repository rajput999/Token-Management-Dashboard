const express = require('express');
const cors = require('cors');  // Import cors
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(express.json());
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://token-management-dashboard-gwn1-git-deploy-rajput999s-projects.vercel.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// Base URL route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Routes
app.use('/api/watchlist', require('./routes/watchlistRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
