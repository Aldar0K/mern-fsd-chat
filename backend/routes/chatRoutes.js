import { Router } from "express";
import {
  accessChat,
  fetchChat,
  createGroupChat,
} from "../controllers/chatControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChat);
router.route("/group").post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, renameFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

export default router;
