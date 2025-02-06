const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'dist' folder
app.use(express.static('dist'));

// Route to serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

// Export the app for testing
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}