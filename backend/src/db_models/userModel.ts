import mongoose from "mongoose";

const userSchem = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchem);

export default User;
