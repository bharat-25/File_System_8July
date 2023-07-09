
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/merge', (req, res) => {
  const { file1, file2 } = req.body;

  try {
    const data1 = fs.readFileSync(`uploads/${file1}`);
    const data2 = fs.readFileSync(`uploads/${file2}`);

    const mergedData = Buffer.concat([data1, data2]);
    const mergedFileName = `backup.txt`;

    fs.writeFileSync(`backups/${mergedFileName}`, mergedData);

    res.status(200).json({
      message: 'Files merged successfully',
      fileName: mergedFileName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3004, () => {
  console.log('Server is running on port 3000');
});