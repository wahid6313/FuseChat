import express, { Router } from "express";
import {
  editProfile,
  getProfile,
  login,
  logOut,
  register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").get(logOut);
router.route("/:id/profile").get(isAuthenticated, getProfile);
router.route("/profile/edit").post(isAuthenticated);
