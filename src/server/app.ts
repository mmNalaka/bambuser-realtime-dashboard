import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Apply middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export { app };
