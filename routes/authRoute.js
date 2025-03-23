import express from "express";
import { registerController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
//router object

const router = express.Router();

//router
//register || post
router.post(`/register`, registerController);

//login || post
router.post(`/login`, loginController);

export default router;
