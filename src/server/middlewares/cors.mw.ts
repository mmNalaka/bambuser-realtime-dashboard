import cors from "cors";
import { config } from "../config";

export const corsMw = cors({
  origin: config.corsOrigins[config.nodeEnv as keyof typeof config.corsOrigins],
  credentials: true,
});
