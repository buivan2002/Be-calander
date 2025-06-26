const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ["https://calander-inky.vercel.app", "http://localhost:3000"],
  credentials: true,
}));

// Routes
const calanderRoutes = require('./routes/index');
app.use('/api', calanderRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
