export const config = {
  name: "Bambuser real-time app",
  nodeEnv: "development",
  port: 3000,

  corsOrigins: {
    development: "http://localhost:5173",
    production: "none",
  },
} as const;
