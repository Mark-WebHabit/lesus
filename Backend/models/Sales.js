import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    size: { type: String, required: false }, // Change this to Number if size should be a number
    quantity: { type: Number, required: false },
  },
  { _id: false }
);

const colorSizeSchema = new mongoose.Schema(
  {
    color: { type: String, required: false },
    sizes: [sizeSchema], // Now an array of sizeSchema documents
  },
  { _id: false }
);

const salesSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    orderId: { type: String },
    colors: {
      type: [colorSizeSchema],
      required: true,
    },
    price: { type: Number, required: true },
    sub_total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// If you don't want Mongoose to use its default '_id' property name, you need to disable automatic index creation for '_id'
salesSchema.set("autoIndex", false);

export const Sales = mongoose.model("Sales", salesSchema);
