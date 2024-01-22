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
router.route("/getdata").get(Verifyjwt, getUserData);
router.route("/refresh").get(getRefreshToken);

// router.route("/getdata").get(Verifyjwt);
// router.route("/token").get(Verifyjwt, getUserData);
// router.route("/refresh").get*

export default router;
