const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://fe-to-do-list-gamma.vercel.app', // chỉ cho phép domain này
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));app.use(express.json());

// Routes
const todoRoutes = require('./routes/index');
app.use('/api', todoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
