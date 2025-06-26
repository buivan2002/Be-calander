const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "https://calander-inky.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Cho phép nếu không có origin (VD: curl, postman) hoặc nằm trong danh sách
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy không cho phép truy cập từ origin này."));
      }
    },
    credentials: true, // Cho phép cookie
  })
);

// Routes
const calanderRoutes = require('./routes/index');
app.use('/api', calanderRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
