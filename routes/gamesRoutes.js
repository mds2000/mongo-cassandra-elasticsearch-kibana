import {
  addGame,
  getGames,
  syncWithElasticSearch,
} from "../controllers/gamesController.js";
import { Router } from "express";
const router = Router();

router.post("/", addGame);
router.get("/", getGames);
router.post("/sync-elastic", syncWithElasticSearch);

export default router;
