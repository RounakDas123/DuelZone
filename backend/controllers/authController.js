const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists", user: null });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, authType: 'local' });
    await user.save();
    res.status(201).json({ message: "Signup successful. Please login.", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error during signup", user: null });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.authType !== 'local')
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({ token, user: { name: user.name, email: user.email }, message: "Login successful!" });
  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};

const googleAuth = async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, authType: 'google' });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Google Auth error" });
  }
};

const getProfile = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }, '-password');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

const updateProfile = async (req, res) => {
  const { email } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOneAndUpdate({ email }, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = { signup, login, googleAuth, getProfile, updateProfile };

