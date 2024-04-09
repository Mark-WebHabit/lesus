import asyncHandler from "express-async-handler";
import { Products } from "../models/Products.js";

// utlities
import { hasFalsyElement } from "../utilities/array.js";

export const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find().exec();

  return res.json({ data: products || [] });
});

export const editProduct = asyncHandler(async (req, res) => {
  const { id, product_name, colors, price, images } = req.body;

  if (!id)
    return res.status(400).json({ data: "Invalid Arguments, ID Missing" });
  if (!product_name)
    return res
      .status(400)
      .json({ data: "Invalid Arguments, Product Name Missing" });
  if (!price)
    return res.status(400).json({ data: "Invalid Arguments, Price Missing" });

  const product = await Products.findById(id);

  if (!product) return res.status(404).json({ data: "Product does not exist" });

  // Assuming you want to delete the product if there are no colors.
  // This logic might need to be revisited based on your actual requirements.
  if (colors && colors.length === 0) {
    await Products.findByIdAndDelete(id);
    return res.json({ data: "No color variation available, product deleted" });
  }

  // Update the product
  const updatedProduct = await Products.findByIdAndUpdate(
    id,
    { product_name, price, colors, images }, // This assumes colors is an array of color objects
    { new: true } // Return the updated document
  );

  return res.json({ data: updatedProduct });
});

export const addProduct = asyncHandler(async (req, res) => {
  const { productName, price, color, size, images, modelNo } = req.body;

  if (hasFalsyElement(productName, price, color, size)) {
    return res.status(400).json({ data: "Provide All Necessary Information" });
  }

  const productNameRegex = new RegExp(`^${productName}$`, "i");

  let product = await Products.findOne({
    product_name: productNameRegex,
    price,
  });

  if (product) {
    // Check if the color already exists in the product
    const colorIndex = product.colors.findIndex((c) => c.color === color);

    if (colorIndex !== -1) {
      // Check if the size already exists within the color
      const sizeIndex = product.colors[colorIndex].sizes.findIndex(
        (s) => s.size === size
      );

      if (sizeIndex !== -1) {
        // Size exists, increment stock
        product.colors[colorIndex].sizes[sizeIndex].stock += 1;
      } else {
        // Size doesn't exist, add new size with stock 1
        product.colors[colorIndex].sizes.push({ size, stock: 1 });
      }
    } else {
      // Color doesn't exist, add new color with the size and stock 1
      product.colors.push({ color, sizes: [{ size, stock: 1 }] });
    }

    // Check if images are provided and push them to the images array
    if (images && images.length) {
      product.images.push(...images);
    }

    // Check if modelNo is provided and add it to the modelNumbers array if not already present
    if (modelNo && !product.modelNumbers.includes(modelNo)) {
      product.modelNumbers.push(modelNo);
    }
    // Save the updated product
    await product.save();

    return res.status(200).json({ data: "Product updated successfully" });
  } else {
    // Product doesn't exist, create a new one
    const newProductData = {
      product_name: productName,
      price,
      colors: [{ color, sizes: [{ size, stock: 1 }] }],
      // Initialize modelNumbers with modelNo if provided
      modelNumbers: modelNo ? [modelNo] : [],
    };

    // Only add images to newProductData if they are provided
    if (images && images.length) {
      newProductData.images = images;
    }

    const newProduct = new Products(newProductData);

    await newProduct.save();

    return res.status(201).json({ data: "Product added successfully" });
  }
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Products.findOne({ _id: id });

  if (!product) {
    return res.status(400).json({ data: "Coudnt find product" });
  }

  return res.json({ data: product });
});

export const getThruModelNumber = asyncHandler(async (req, res) => {
  const { model } = req.params;

  if (!model) return res.status(400).json({ data: "No Model Number Found" });

  const regex = new RegExp(`^${model}$`, "i");
  const product = await Products.findOne({ modelNumbers: { $regex: regex } });

  if (!product) {
    return res.status(404).json({ data: "Model number not found" });
  }

  return res.json({ data: product });
});

export const updateProductAfterWalkInSell = asyncHandler(async (req, res) => {
  const { _id, colors } = req.body;

  const product = await Products.findOneAndUpdate(
    { _id },
    { colors },
    { new: true }
  );

  return res.json(product);
});

export const deleteProductImage = asyncHandler(async (req, res) => {
  const { url, _id } = req.body;

  const product = await Products.findOneAndUpdate(
    { _id },
    { $pull: { images: url } },
    { new: true }
  );

  return res.json(product);
});

export const uploadImage = asyncHandler(async (req, res) => {
  const { url, _id } = req.body;

  if (!url || !_id)
    return res
      .status(400)
      .json({ data: "Missing Arguments ID or Downalodable URL" });

  const product = await Products.findOneAndUpdate(
    { _id },
    { $push: { images: url } },
    { new: true }
  );

  return res.json(product);
});
