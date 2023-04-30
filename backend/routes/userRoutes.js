import { Router } from "express";

import {
  allUsers,
  authUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);

export default router;
