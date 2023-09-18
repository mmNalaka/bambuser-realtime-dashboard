import { RequestHandler } from "express";
import { createUser, getUserByEmail } from "../data/users.data";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.session?.user) {
    res.status(401);
    return res.json({ success: false, message: "Unauthorized" });
  }
  next();
};

export const loginHandler: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return res.json({ success: false, message: "Bad request" });
  }

  const user = getUserByEmail(email);
  if (!user || user.password !== password) {
    res.status(401);
    return res.json({ success: false, message: "Invalid credentials" });
  }

  req.session.regenerate(function (err) {
    if (err) next(err);
    req.session.user = user.id;

    req.session.save(function (err) {
      if (err) return next(err);
      res.status(200);
      return res.json({ success: true, email: user.email, id: user.id });
    });
  });
};

export const checkHandler: RequestHandler = (req, res) => {
  if (!req.session?.user) {
    res.status(401);
    return res.json({ success: false, message: "Unauthorized" });
  }

  res.status(200);
  return res.json({
    success: true,
    email: req.session.user,
    id: req.session.id,
  });
};

export const logoutHandler: RequestHandler = (req, res, next) => {
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);

    req.session.regenerate(function (err) {
      if (err) next(err);
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
};

export const registerHandler: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return res.json({ success: false, message: "Bad request" });
  }

  const user = getUserByEmail(email);
  if (user) {
    res.status(409);
    return res.json({ success: false, message: "User already exists" });
  }

  const newUser = createUser({ email, password });
  if (!newUser) {
    res.status(500);
    return res.json({ success: false, message: "Internal server error" });
  }

  req.session.regenerate(function (err) {
    if (err) next(err);
    req.session.user = newUser.id;

    req.session.save(function (err) {
      if (err) return next(err);
      res.status(200);
      return res.json({ success: true, email: email });
    });
  });
};
