require('module-alias/register');
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: ["https://calander-inky.vercel.app", "http://localhost:4000"],
  credentials: true,
}));

// Routes
const route = require('./v1/routes');
route(app);


const PORT = process.env.PORT || 3001;

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
