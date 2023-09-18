import { app } from "./app";
import ViteExpress from "vite-express";
import { config } from "./config";

// Start the server
const server = ViteExpress.listen(app, config.port, () => {
  console.log(`🚀 ${config.name} 🚀`);
  console.log(
    `🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`
  );
});

// Graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  server.close(() => {
    console.log("🛑 Server closed 🛑");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("🛑 Server did not close in time, force shut down! 🛑");
    process.exit(1);
  }, 10_000);
}
