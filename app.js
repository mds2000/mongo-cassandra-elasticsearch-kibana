import gamesRoutes from "./routes/gamesRoutes.js";
import activityTrackingRoutes from "./routes/activityTrackingRoutes.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Client } from 'cassandra-driver';

dotenv.config();

const app = express();
const port = 3000;
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

/*Cassandra*/

const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'your_keyspace'
});

client.connect()
    .then(() => console.log('Connected to Cassandra'))
    .catch(err => console.error('Failed to connect to Cassandra', err));

/*Cassandra*/

main();
