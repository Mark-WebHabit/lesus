import asyncHandler from "express-async-handler";
import { Orders } from "../models/Orders.js";

export const fetchAllOrders = asyncHandler(async (req, res) => {
  const orders = await Orders.find().exec();

  return res.json({ data: orders || [] });
});
