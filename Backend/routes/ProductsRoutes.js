import express from "express";

// controllers
import {
  fetchAllProducts,
  addProduct,
  getProduct,
  editProduct,
  getThruModelNumber,
  updateProductAfterWalkInSell,
  deleteProductImage,
  uploadImage,
} from "../controller/ProductsController.js";

const router = express.Router();

router.get("/", fetchAllProducts);
router.get("/:id", getProduct);
router.post("/add", addProduct);
router.post("/edit", editProduct);
router.get("/product/:model", getThruModelNumber);
router.patch("/product/update", updateProductAfterWalkInSell);
router.patch("/product/rm/img", deleteProductImage);
router.patch("/product/mk/img", uploadImage);

export default router;
