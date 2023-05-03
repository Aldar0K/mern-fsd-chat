import { Router } from "express";

import {
  allUsers,
  authUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.route("/login").post(authUser);

export default router;
