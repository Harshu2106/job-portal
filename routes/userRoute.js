import express from "express";
import { userUpdateController } from "../controllers/userController.js";

import userAuth from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USERS || GET

// UPDATE USER || PUT
router.put("/user-update", userAuth, userUpdateController);

export default router;
