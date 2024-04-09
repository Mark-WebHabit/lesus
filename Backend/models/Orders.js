import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  userId: {
    type: String, //make this an objectid
    required: true,
    // ref: "User", // Assuming you have a User model
  },
  amount: {
    type: Number,
    default: 0,
  },
  products: [
    {
      productId: {
        // type: Schema.Types.ObjectId,
        type: String,
        required: true,
        // ref: "Product", // This creates a reference to the Product model
      },
    },
  ],
  status: {
    type: String,
    default: "pending",
  },
  cancelled_at: {
    type: Date,
    default: null,
  },
  completed_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const Orders = mongoose.model("Orders", ordersSchema);
