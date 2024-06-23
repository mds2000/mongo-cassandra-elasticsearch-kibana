import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
import { Game } from "../models/Game.js";
dotenv.config();

export async function runETL() {
  // Conectar a Elasticsearch
  const esClient = new Client({ node: process.env.ELASTIC_SEARCH_URI });

  // Extraer los Datos de MongoDB
  const games = await Game.find();
  for (const game of games) {
    // Transformar los Datos (si es necesario)
    // Aquí puedes realizar cualquier transformación que necesites
    // Cargar los Datos en Elasticsearch
    console.log("Adding: ", game._id.toString());
    await esClient.index({
      index: "games",
      id: game._id.toString(), // Usa el _id de MongoDB como el ID del documento en Elasticsearch
      body: {
        title: game.title,
        category: game.category,
        price: game.price,
        language: game.language,
        offer: game.offer,
        monthlyDownloades: game.monthlyDownloades,
      },
    });
  }

  // Cerrar las Conexiones
  //await mongoClient.close();
  await esClient.close();
}
