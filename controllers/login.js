const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// [POST] /register
exports.register = async (req, res) => {
  try {
    const { fname, email, password } = req.body;

    if (!fname || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check email trùng
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lưu user mới
    const user = await User.create({
      fname,
      email,
      password: hashedPassword,
      role: "user",
      is_active: true,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        fname: user.fname,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || "calander";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // Kiểm tra password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Tạo JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d", // hoặc "1h", "2d"
      }
    );

    // Set cookie (HttpOnly giúp chống XSS)
      res.cookie("token", token, {
      httpOnly: true,
      secure: true,              // BẮT BUỘC nếu sameSite: "None"
      sameSite: "None",          // Cho phép cookie cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    // Gửi response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fname: user.fname,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.logout = async (req, res) => {
  res.clearCookie("token"); // hoặc req.session.destroy()
  res.json({ message: "Đăng xuất thành công" });
}