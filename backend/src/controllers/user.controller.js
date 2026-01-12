const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: " Server error" })
  }
}

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).json({ message: "Email tồn tại" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Sai email" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Sai mật khẩu" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user });
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};


exports.googleLogin = async (req, res) => {
  try {
    const { googleIdToken } = req.body;

    if (!googleIdToken) {
      return res.status(400).json({ message: "Missing googleIdToken" });
    }

    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: googleIdToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    // tìm user
    let user = await User.findOne({ email });

    // nếu chưa tồn tại thì tạo mới
    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture,
      });
    }

    // tạo JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    // trả về frontend
     res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
      }
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(403).json({ message: "Invalid Google token" });
  }
};
