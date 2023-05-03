import { Router } from "express";
import {
  accessChat,
  addToChat,
  createGroupChat,
  fetchChat,
  removeFromChat,
  renameChat,
} from "../controllers/chatControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameChat);
router.route("/groupadd").put(protect, addToChat);
router.route("/groupremove").put(protect, removeFromChat);

export default router;
