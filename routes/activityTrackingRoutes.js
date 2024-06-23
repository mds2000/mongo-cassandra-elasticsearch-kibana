import { Router } from "express";
import {
  insertActivity,
  getActivity,
} from "../controllers/activityTrackingController.js";
const router = Router();

router.post("/activity", insertActivity);
router.get("/activity", getActivity);

export default router;
