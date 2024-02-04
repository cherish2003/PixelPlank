import { Router } from "express";
import { joinRoom } from "../controllers/canvasController.js";
const router = Router();
router.route("/link/:username").get(joinRoom);

export default router;
