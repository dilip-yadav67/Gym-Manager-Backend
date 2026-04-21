require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// ✅ Generate JWT Token
UserSchema.methods.generateToken = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

const User = mongoose.model("userData", UserSchema);

module.exports = User;