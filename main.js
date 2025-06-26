const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,               // Cho phép gửi cookie
}));
const { exec } = require('child_process');


// Routes
const calanderRoutes = require('./routes/index');
app.use('/api', calanderRoutes);

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
