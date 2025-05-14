const express = require('express');
const SMB2 = require('smb2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// SMB2 client configuration
const smb2Client = new SMB2({
  share: '\\\\172.16.120.102\\Photo Library',
  domain: 'EVERRBEST',
  username: 'jiajie.chan',
  password: 'Everbest@1234',
});

// List files/folders in a directory
app.get('/api/files', (req, res) => {
  const folderPath = req.query.path || '';
  smb2Client.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(files);
  });
});

// Download a file
app.get('/api/download', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) return res.status(400).json({ error: 'Missing file path' });
  smb2Client.createReadStream(filePath).pipe(res);
});

// TODO: Add upload and create folder endpoints as needed

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
}); 