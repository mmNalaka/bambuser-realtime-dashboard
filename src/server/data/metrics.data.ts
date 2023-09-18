import { data, Metric } from "./store";

export type CreatePayload = Pick<
  Metric,
  "name" | "value" | "color" | "unitSymbol"
>;
export type UpdatePayload = Pick<
  Metric,
  "id" | "value" | "color" | "unitSymbol"
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

export const updateMetricValue = (metric: UpdatePayload) => {
  const index = data.Metrics.findIndex((m) => m.id === metric.id);

  if (index > -1) {
    data.Metrics[index] = {
      ...data.Metrics[index],
      value: metric.value,
      min: Math.min(data.Metrics[index].min, metric.value),
      max: Math.max(data.Metrics[index].max, metric.value),
    };
    return data.Metrics[index];
  }
};
