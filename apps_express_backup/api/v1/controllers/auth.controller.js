const authService = require("@services/auth.service");
const catchAsync = require("@utils/catchAsync");

exports.register = catchAsync(async (req, res) => {
  const { fname, email, password } = req.body;

  if (!fname || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await authService.register(fname, email, password);

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user,
  });
});

exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Đăng xuất thành công" });
});