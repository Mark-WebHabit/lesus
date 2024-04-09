import asyncHandler from "express-async-handler";
import { Sales } from "../models/Sales.js";

// utilities
import {
  getCurrentDateYYYYMMDD,
  formatDateYYYYMMDD,
} from "../utilities/dates.js";

export const fetchAllSales = asyncHandler(async (req, res) => {
  const sales = await Sales.find().exec();

  return res.json({ data: sales || [] });
});

export const insertWalkInOrders = asyncHandler(async (req, res) => {
  const { product_name, colors, price, sub_total, orderId } = req.body;

  if (
    !product_name ||
    colors.length === 0 ||
    !price ||
    !sub_total ||
    !orderId
  ) {
    return res
      .status(400)
      .json({ data: "Missing Arguments Please Double Check FIelds" });
  }

  const newDirectOrder = new Sales({
    product_name,
    price,
    sub_total,
    colors,
    orderId,
  });

  let savedNewWalkInOrder = await newDirectOrder.save();
  return res.json({ data: savedNewWalkInOrder });
});
