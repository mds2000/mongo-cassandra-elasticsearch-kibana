import searchRoutes from './routes/searchRoutes.js'
import activityTrackingRoutes from './routes/activityTrackingRoutes.js'
import express from "express";
import dotenv from "dotenv";


/*Cassandra*/
import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'your_keyspace'
});

client.connect()
    .then(() => console.log('Connected to Cassandra'))
    .catch(err => console.error('Failed to connect to Cassandra', err));

/*Cassandra*/

dotenv.config();

const app = express();
const port = process.env.PORT;
const main = async () => {
  app.use(express.json());
  app.use("/api/search", searchRoutes);
  app.use("/api/tracking", activityTrackingRoutes);

  app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

main();
