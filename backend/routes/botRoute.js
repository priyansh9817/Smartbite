import express from "express";
import { handleBotMessage } from "../controllers/botController.js";

const router = express.Router();

router.post("/message", handleBotMessage);

export default router;
 