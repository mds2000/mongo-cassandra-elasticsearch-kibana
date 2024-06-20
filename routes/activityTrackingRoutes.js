import { Router } from "express";
const router = Router();

//router.post("/games", addGame);

export default router;

// Dynamic import of cassandra-driver
import('cassandra-driver').then((cassandra) => {
    // Crea una instancia del cliente
    const client = new cassandra.Client({
        contactPoints: ['localhost'],
        localDataCenter: 'datacenter1',
        keyspace: 'activitytrackingdata',
        credentials: { username: 'admin', password: 'admin' }
    });

    // Define los datos que quieres insertar
    const userId = cassandra.types.Uuid.random();
    const gameId = cassandra.types.Uuid.random();
    const sessionId = cassandra.types.Uuid.random();
    const eventType = 'start';
    const eventTimestamp = new Date();
    const eventData = { 'score': '1000', 'lives': '3' };
    const levelAchieved = '1';

    // Define la consulta de inserción
    const query = 'INSERT INTO user_activity (user_id, game_id, session_id, event_type, event_timestamp, event_data, level_achieved) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [userId, gameId, sessionId, eventType, eventTimestamp, eventData, levelAchieved];

    // Ejecuta la consulta
    client.execute(query, params, { prepare: true })
        .then(result => console.log('Row inserted'))
        .catch(error => console.error(error))
        .finally(() => client.shutdown());
});
/*
* // Dynamic import of cassandra-driver
import('cassandra-driver').then((cassandra) => {
  // Crea una instancia del cliente
  const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'activitytrackingdata',
    credentials: { username: 'admin', password: 'admin' }
  });

  // Define los datos que quieres insertar
  const userId = cassandra.types.Uuid.random();
  const gameId = cassandra.types.Uuid.random();
  const sessionId = cassandra.types.Uuid.random();
  const eventType = 'start';
  const eventTimestamp = new Date();
  const eventData = { 'score': '1000', 'lives': '3' };
  const levelAchieved = '1';

  // Define la consulta de inserción
  const query = 'INSERT INTO user_activity (user_id, game_id, session_id, event_type, event_timestamp, event_data, level_achieved) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const params = [userId, gameId, sessionId, eventType, eventTimestamp, eventData, levelAchieved];

  // Ejecuta la consulta
  client.execute(query, params, { prepare: true })
    .then(result => console.log('Row inserted'))
    .catch(error => console.error(error))
    .finally(() => client.shutdown());
});
* 
* 
* */

/*
CREATE TABLE IF NOT EXISTS user_activity (
    user_id uuid,
    game_id uuid,
    session_id uuid,
    event_type text,
    event_timestamp timestamp,
    event_data map<text, text>,
    PRIMARY KEY ((user_id, game_id), event_timestamp, session_id)
) WITH CLUSTERING ORDER BY (event_timestamp DESC);

INSERT INTO user_activity (user_id, game_id, session_id, event_type, event_timestamp, event_data)
VALUES (uuid(), uuid(), uuid(), 'achievement_unlocked', toTimeStamp(now()), {'achievement_name': 'First Steps', 'achievement_points': '10'});

SELECT * FROM user_activity WHERE user_id = ? AND game_id = ?;
*/