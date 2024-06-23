import gamesRoutes from "./routes/gamesRoutes.js";
import activityTrackingRoutes from "./routes/activityTrackingRoutes.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
const main = async () => {
  app.use(express.json());
  app.use("/api/games", gamesRoutes);
  app.use("/api/tracking", activityTrackingRoutes);

  app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Conection to database established successfully.");
    } catch (error) {
      console.error("Cannot connect to database:", error);
    }
  });
};

main();
