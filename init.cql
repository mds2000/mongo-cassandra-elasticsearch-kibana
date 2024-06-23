CREATE KEYSPACE IF NOT EXISTS  activitytrackingdata WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE  activitytrackingdata;

CREATE TABLE IF NOT EXISTS user_activity (
                                             user_id uuid,
                                             game_id uuid,
                                             session_id uuid,
                                             event_type text,
                                             event_timestamp timestamp,
                                             event_data map<text, text>,
                                             level_achieved text,
                                             PRIMARY KEY ((user_id, game_id), event_timestamp, session_id)
) WITH CLUSTERING ORDER BY (event_timestamp DESC);

/*

Dentro del cqlsh, ejecutar el siguiente comando para cargar el archivo init.cql

*/