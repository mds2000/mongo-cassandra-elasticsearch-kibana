import { addGame } from "../controllers/searchController.js";
import { Router } from "express";
const router = Router();

router.post("/games", addGame);

export default router;
