import session from "express-session";

export const sessionMw = session({
  secret: "SUPER_SECRET_KEY",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
});
