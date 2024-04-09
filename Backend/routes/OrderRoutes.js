import express from "express";

// controllers
import { fetchAllOrders } from "../controller/OrderCOntroller.js";

const router = express.Router();

router.get("/", fetchAllOrders);

export default router;
