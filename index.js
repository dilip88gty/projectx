
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

app.post('/api/send', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  let data = [];
  if (fs.existsSync(dataPath)) {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }

  data.push({ name, message });

  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true });
});

app.get('/api/receive', (req, res) => {
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return res.status(200).json(data);
  } else {
    return res.status(200).json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
