import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  avatar: { type: String },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  authCode: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
  },
  role: { type: String, required: true, default: "user" },
});
const User = mongoose.model("User", userSchema);
export default User;
