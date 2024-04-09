import express from "express";

// controllers
import {
  fetchAllSales,
  insertWalkInOrders,
} from "../controller/SalesController.js";

const router = express.Router();

router.get("/", fetchAllSales);
router.post("/walkin/order", insertWalkInOrders);

export default router;
