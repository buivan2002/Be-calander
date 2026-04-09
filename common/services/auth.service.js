const { User } = require("@models");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("@common/config/constants") || { JWT_SECRET: process.env.JWT_SECRET || "calendar_dev_secret" };
const ApiError = require("@utils/ApiError");

class AuthService {
  async register(fname, email, password) {
    const existingUser = await User.findOne({ where: { email } });
    console.log("Checking existing user for registration:", {
      email,
      existingUser: existingUser ? { id: existingUser.id, email: existingUser.email } : null
    });
    if (existingUser) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await argon2.hash(password);

    const user = await User.create({
      fname,
      email,
      password: hashedPassword,
      role: "user",
      is_active: true,
    });

    return {
      id: user.id,
      email: user.email,
      fname: user.fname,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(401, "Invalid user or credentials");
    }

    let isMatch = false;
    try {
        isMatch = await argon2.verify(user.password, password);
    } catch(err) {
        // If password is still bcrypt formatted, argon2 verify throws error. 
        // This is fine since we assume DB is empty or users should reset pass.
    }
    
    if (!isMatch) {
      throw new ApiError(401, "Invalid user or credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        fname: user.fname,
      },
      token,
    };
  }
}

module.exports = new AuthService();
