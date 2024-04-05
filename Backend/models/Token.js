import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    emailVerificationToken: {
      type: String,
      required: true,
    },
    forgotPassToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Tokens = mongoose.model("Tokens", tokenSchema);
