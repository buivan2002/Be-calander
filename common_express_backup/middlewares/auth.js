const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "calendar_dev_secret";

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verify Error:", {
      error: err.message,
      tokenPrefix: token.substring(0, 20) + "..."
    });
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
