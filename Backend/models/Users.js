import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "guest",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    verified: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
);

export const Users = mongoose.model("Users", userSchema);
