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
  subscriptions: {
    id: { type: String },
    status: { type: String },
    subStartDate: { type: Date },
    subEndDate: { type: Date },
  },
  authCode: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
  },
});
const User = mongoose.model("User", userSchema);
export default User;
