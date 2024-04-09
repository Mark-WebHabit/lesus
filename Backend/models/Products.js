import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    size: { type: String, required: false }, // Change this to Number if size should be a number
    stock: { type: Number, required: false },
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

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true },
    colors: {
      type: [colorSizeSchema],
      required: true,
    },
    modelNumbers: [{ type: String, unique: true }],
    price: { type: Number, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

// If you don't want Mongoose to use its default '_id' property name, you need to disable automatic index creation for '_id'
productSchema.set("autoIndex", false);

export const Products = mongoose.model("Products", productSchema);
