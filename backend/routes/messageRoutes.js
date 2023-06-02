import { Router } from "express";

import { sendMessage, allMessages } from "../controllers/messageControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

export default router;
