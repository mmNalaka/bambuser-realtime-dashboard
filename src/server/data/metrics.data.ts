import { data, Metric } from "./store";

export type CreatePayload = Pick<
  Metric,
  "name" | "value" | "color" | "unitSymbol"
>;
export type UpdatePayload = Pick<
  Metric,
  "id" | "name" | "value" | "color" | "unitSymbol"
>;

export const getMetrics = () => {
  return data.Metrics;
};

export const getMetricById = (id: number) => {
  return data.Metrics.find((metric) => metric.id === id);
};

export const createMetric = (metric: CreatePayload) => {
  const newMetric: Metric = {
    id: data.Metrics.length + 1,
    min: metric.value,
    max: metric.value,
    ...metric,
  };

  data.Metrics.push(newMetric);
  return newMetric;
};

export const updateMetricValue = (metric: UpdatePayload, userId: number) => {
  const index = data.Metrics.findIndex((m) => m.id === metric.id);

  if (index > -1) {
    data.Metrics[index] = {
      ...data.Metrics[index],
      value: metric.value,
      color: metric.color || data.Metrics[index].color,
      unitSymbol: metric.unitSymbol || data.Metrics[index].unitSymbol,
      name: metric.name || data.Metrics[index].name,
      min: Math.min(data.Metrics[index].min, metric.value),
      max: Math.max(data.Metrics[index].max, metric.value),
    };

    logChange(data.Metrics[index], userId);
    return data.Metrics[index];
  }
};

export const getChangeLog = (
  limit: number = 10,
  order: "asc" | "dsc" = "dsc"
) => {
  return data.MetricsChangeLog.slice(0, limit).sort((a, b) => {
    if (order === "asc") {
      return a.timestamp.getTime() - b.timestamp.getTime();
    } else {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }
  });
};

const logChange = (metric: Metric, userId: number) => {
  const log = {
    id: data.MetricsChangeLog.length + 1,
    userId,
    metricId: metric.id,
    metricName: metric.name,
    value: metric.value,
    previousValue: metric.value,
    timestamp: new Date(),
  };

  data.MetricsChangeLog.push(log);
  return log;
};
