const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./src/database/db");  // ✅ FIXED
const User = require("./src/Model/Schema");  // ✅ FIXED
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// ✅ REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password, phone });
    await user.save();

    res.status(200).json({ message: "Registered Successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // token generate
    const token = await user.generateToken();

    res.status(200).json({
      message: "Login Successful",
      token: token
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET USERS (Navbar)
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});