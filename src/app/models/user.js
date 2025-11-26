import mongoose, { models, Schema } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null, // Profile image URL
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
