import express from "express";
//router object
const router = express.Router();
import { testPostController } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

// Routes
router.post("/test-post", userAuth, testPostController);

//exporting router
export default router;
