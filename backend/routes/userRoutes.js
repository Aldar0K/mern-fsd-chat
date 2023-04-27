import { Router } from "express";

import registerUser from "../controllers/userControllers.js";

const router = Router();

router.route("/").post(registerUser);
// router.route('/login', authUser)

export default router;
