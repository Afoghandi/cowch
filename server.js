require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const axios = require('axios');


const app = express();

//connect Database

connectDB();
//Init Middleware
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'https://afoghandi.github.io'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));



// Proxy route for TMDb API
app.use('/api/tmdb', async (req, res) => {
  try {
  
      const tmdbUrl = `https://api.themoviedb.org/3${req.path}`;
      const response = await axios.get(tmdbUrl, {
          params: { ...req.query, api_key: process.env.TMDB_API_KEY }
      });
      res.json(response.data);
  } catch (error) {
    console.error("Error Fetchoing from imdb", error.message)
      res.status(error.response?.status || 500).json({ message: error.message });
  }
});


app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));