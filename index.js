const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// POST endpoint for the character sorting task
app.post('/api/sort-string', (req, res) => {
  try {
    // Extract the data from request body
    const { data } = req.body;
    
    // Validate input
    if (!data || typeof data !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid input. Expected a string in the "data" field.' 
      });
    }
    
    // Convert string to array of characters
    const charactersArray = data.split('');
    
    // Sort the array alphabetically
    const sortedArray = charactersArray.sort();
    
    // Return the sorted array as a word
    return res.json({ word: sortedArray });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;