import cassandra from "cassandra-driver";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Create client instance
const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_URI],
  localDataCenter: process.env.CASSANDRA_DATACENTER,
  credentials: {
    username: process.env.CASSANDRA_USER,
    password: process.env.CASSANDRA_PASSWORD,
  },
});

const query1 =
  "CREATE KEYSPACE IF NOT EXISTS tracking WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' };";
const query2 =
  "CREATE TABLE IF NOT EXISTS tracking.user_activity (id UUID PRIMARY KEY, user_id text, game_id text, session_id text, event_type text, event_timestamp text, event_data text, level_achieved text)";

client
  .execute(query1)
  .then(() =>
    client
      .execute(query2)
      .then(() => console.log("Table created"))
      .catch((error) => console.error(error))
      .finally(() => client.shutdown())
  )
  .catch((error) => console.error(error))
  .finally(() => client.shutdown());

export async function insertActivity(req, res) {
  try {
    const client = new cassandra.Client({
      contactPoints: [process.env.CASSANDRA_URI],
      localDataCenter: process.env.CASSANDRA_DATACENTER,
      keyspace: "tracking",
      credentials: {
        username: process.env.CASSANDRA_USER,
        password: process.env.CASSANDRA_PASSWORD,
      },
    });

    // Toma los datos de la solicitud
    const {
      userId,
      gameId,
      sessionId,
      eventType,
      eventTimestamp,
      eventData,
      levelAchieved,
    } = req.body;

    // Define la consulta de inserción
    const query =
      "INSERT INTO user_activity (id, user_id, game_id, session_id, event_type, event_timestamp, event_data, level_achieved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
      randomUUID(),
      userId,
      gameId,
      sessionId,
      eventType,
      eventTimestamp,
      eventData,
      levelAchieved,
    ];

    // Ejecuta la consulta
    const newActivity = await client.execute(query, params, { prepare: true });
    res.status(200).json(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting row");
  } finally {
    client.shutdown();
  }
}

export async function getActivity(req, res) {
  try {
    const client = new cassandra.Client({
      contactPoints: [process.env.CASSANDRA_URI],
      localDataCenter: process.env.CASSANDRA_DATACENTER,
      keyspace: "tracking",
      credentials: {
        username: process.env.CASSANDRA_USER,
        password: process.env.CASSANDRA_PASSWORD,
      },
    });

    // Define la consulta de inserción
    const query = "SELECT * FROM user_activity";

    // Ejecuta la consulta
    const activities = await client.execute(query, [], { prepare: true });
    res.status(200).json(activities.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting row");
  } finally {
    client.shutdown();
  }
}
