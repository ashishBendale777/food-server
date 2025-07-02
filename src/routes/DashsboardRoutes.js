import { fetchCounters } from "../controllers/DashboardController.js";

import express from "express";

const counterRouter = express.Router();

counterRouter.get("/fetchcounter", fetchCounters);

export { counterRouter }