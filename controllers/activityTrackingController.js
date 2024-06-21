
import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    credentials: { username: 'admin', password: 'admin' }
});

const query = "CREATE KEYSPACE IF NOT EXISTS your_keyspace WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";

client.execute(query)
    .then(() => console.log('Keyspace created'))
    .catch(error => console.error(error))
    .finally(() => client.shutdown());

export async function insertActivity(req, res) {
    // Create a new client instance
    const client = new cassandra.Client({
        contactPoints: ['localhost'],
        localDataCenter: 'datacenter1',
        credentials: { username: 'admin', password: 'admin' }
    });

    // Toma los datos de la solicitud
    const { userId, gameId, sessionId, eventType, eventTimestamp, eventData, levelAchieved } = req.body;

    // Define la consulta de inserción
    const query = 'INSERT INTO user_activity (user_id, game_id, session_id, event_type, event_timestamp, event_data, level_achieved) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [userId, gameId, sessionId, eventType, eventTimestamp, eventData, levelAchieved];

    // Ejecuta la consulta
    try {
        await client.execute(query, params, { prepare: true });
        res.status(200).send('Row inserted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting row');
    } finally {
        client.shutdown();
    }
}