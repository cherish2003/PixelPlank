import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserData,
  getRefreshToken,
} from "../controllers/userController.js";
import { Verifyjwt } from "../middlewares/verifyJWT.js";

const router = Router();
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getdata/:id").get(Verifyjwt, getUserData);
router.route("/refresh").get(getRefreshToken);

export default router;
