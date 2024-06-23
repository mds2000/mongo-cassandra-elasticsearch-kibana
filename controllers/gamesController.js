import { Game } from "../models/Game.js";
import { runETL } from "../utils/sendDataToElastic.js";
import mongoose from "mongoose";

export async function addGame(req, res) {
  try {
    await Game.validate(req.body);
    const createdGame = await new Game(req.body).save();
    return res.status(201).json(createdGame);
  } catch (error) {
    if (error instanceof mongoose.MongooseError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function getGames(req, res) {
  try {
    const games = await Game.find().limit(10);
    return res.status(200).json(games);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}

export async function syncWithElasticSearch(req, res) {
  try {
    await runETL();
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
}
