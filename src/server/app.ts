import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { corsMw } from "./middlewares/cors.mw";
import { sessionMw } from "./middlewares/session.mw";
import {
  checkHandler,
  loginHandler,
  isAuthenticated,
  logoutHandler,
  registerHandler,
} from "./modules/auth.module";
import {
  createMetricHandler,
  getMetricsHandler,
  updateMetricHandler,
} from "./modules/metrics.modules";

const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(corsMw);
app.use(sessionMw);

// Routes
app.get("/api/auth/check", checkHandler);
app.get("/api/auth/logout", logoutHandler);
app.post("/api/auth/login", loginHandler);
app.post("/api/auth/register", registerHandler);

app.get("/api/metrics", isAuthenticated, getMetricsHandler(app));
app.post("/api/metrics", isAuthenticated, createMetricHandler(app));
app.put("/api/metrics/:id", isAuthenticated, updateMetricHandler(app));

export { app };
