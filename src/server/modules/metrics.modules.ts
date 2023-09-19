import { Express, RequestHandler } from "express";

import {
  UpdatePayload,
  createMetric,
  getChangeLog,
  getMetricById,
  getMetrics,
  updateMetricValue,
} from "../data/metrics.data";

type Handler = (app: Express) => RequestHandler;

const eventSourceHeaders = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
};

const setRandomColor = () => {
  const colors = [
    "#F78CA2",
    "#FFCC70",
    "#AED2FF",
    "#E4E4D0",
    "#FF6969",
    "#BEADFA",
    "#FFC6AC",
    "#CD6688",
    "#D4E2D4",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

// GET /api/metrics
export const getMetricsHandler: Handler =
  (app: Express) => (_req, res, next) => {
    try {
      const metrics = getMetrics();
      res.writeHead(200, eventSourceHeaders);
      res.write("data: " + JSON.stringify(metrics) + "\n\n");

      const onMetricsUpdated = () => {
        try {
          const metrics = getMetrics();
          res.write("data: " + JSON.stringify(metrics) + "\n\n");
        } catch (err) {
          next(err);
        }
      };

      app.on("metrics-updated", onMetricsUpdated);

      res.on("close", () => {
        app.removeListener("metrics-updated", onMetricsUpdated);
      });
    } catch (e) {
      next(e);
    }
  };

// POST /api/metrics
export const createMetricHandler: Handler =
  (app: Express) => (req, res, next) => {
    try {
      const { name, value, color, unitSymbol } = req.body;
      if (!name || !value) {
        return res.sendStatus(400);
      }

      const payload = {
        name,
        value,
        color: color || setRandomColor(),
        unitSymbol: unitSymbol || "",
      };

      createMetric(payload);

      res.status(201).json({ success: true, message: "Metric created" });
      app.emit("metrics-updated");
    } catch (e) {
      next(e);
    }
  };
// PUT /api/metrics/:id
export const updateMetricHandler: Handler =
  (app: Express) => (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.sendStatus(400);
        return;
      }

      const metric = getMetricById(Number(id));
      if (!metric) {
        res.sendStatus(404);
        return;
      }

      const data = req.body;
      if (!data || !data.value) {
        res.sendStatus(400);
        return;
      }

      const value = Number(data.value);
      if (isNaN(value)) {
        res.sendStatus(400);
        return;
      }

      const updatePayload: UpdatePayload = {
        id: Number(id),
        name: data.name || metric.name,
        value,
        color: data.color || metric.color,
        unitSymbol: data.unitSymbol || metric.unitSymbol,
      };
      updateMetricValue(updatePayload, req.session.user!);

      res.status(200).json({ success: true, message: "Metric updated" });
      app.emit("metrics-updated");
    } catch (e) {
      next(e);
    }
  };

// GET /api/metrics/changelog
export const getChangeLogHandler: RequestHandler = (_req, res, next) => {
  try {
    const logs = getChangeLog();
    res.status(200).json({ success: true, data: logs });
  } catch (e) {
    next(e);
  }
};
