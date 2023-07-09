const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Endpoint to read a text file from the backup folder
app.get('/backups/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'backups', filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading file');
    }

    res.send(data);
  });
});

// Start the server
app.listen(3002, () => {
  console.log('Server is running on port 3000');
});