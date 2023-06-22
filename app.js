import express from "express";
import cors from "cors";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { body, check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAunthenticated from "./middleware/isAunthenticated.js";
import logout from "./controller/auth/logout.js";
import isAdmin from "./middleware/isAdmin.js";
import checkStatus from "./controller/health/checkStatus.js";

const app = express();
app.use(express.json());
app.use(cors());

// public routes
app.get("/", checkStatus);

app.get("/public", (req, res) =>
  res.status(200).json({ message: "Public Route" })
);

app.post(
  "/api/register",
  check("email").notEmpty().bail().isEmail().bail(),
  check("username").notEmpty().bail().isLength({ min: 2 }).bail(),
  check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  register
);
// we call this a route, setiap route ada controller
app.post(
  "/api/login",
  check("identifier").notEmpty().bail(),
  check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
  validatorResponse,
  login
);

// private routes
app.get("/private", isAunthenticated, (req, res) =>
  res.status(200).json({ message: "Private Route", user: req.user })
);

app.get("/admin", isAunthenticated, isAdmin, (req, res) =>
  res.status(200).json({ message: "Admin Route", user: req.user })
);

app.get("/api/users", isAunthenticated, listAll);
app.get("/api/users/:username", isAunthenticated, view);

app.put("/api/logout", isAunthenticated, logout);

export default app;
