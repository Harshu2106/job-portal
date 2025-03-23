import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";

import { userUpdateController } from "../controllers/userController.js";
const router = express.Router();

// update user|| put
router.put(`/user-update`, userAuth, userUpdateController);

export default router;
