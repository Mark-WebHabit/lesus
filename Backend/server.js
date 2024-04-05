import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

// custom middleware file
import { errorLogger } from "./middlewares/errorLogger.js";

// config
import { corsOptions } from "./config/corsOptions.js";

// routers
import AuthRouter from "./routes/AuthRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// allow access to environment variables
dotenv.config();
const PORT = process.env.PORT || 8081;

app.use(cookieParser());

app.set("trust-proxy", true);

// restrict cors to un-specified whitelist(list of accesptable origins)
app.use(cors(corsOptions));

// accep formdata
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// public route
app.use("/auth", AuthRouter);

// only during developemet
// custom middleware to catch errors
app.use(errorLogger);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
