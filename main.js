const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();

app.use(cors({
  origin: 'https://fe-to-do-list-gamma.vercel.app', // chỉ cho phép domain này
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));app.use(express.json());

// Routes
const todoRoutes = require('./routes/index');
app.use('/api', todoRoutes);
app.get('/run-migrate', async (req, res) => {
  exec('npx sequelize-cli db:migrate --env production', (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(`Migration error: ${stderr}`);
    }
    res.send(`Migration success: ${stdout}`);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
