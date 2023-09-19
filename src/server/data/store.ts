// Simple in-memory data store
export type User = {
  id: number;
  email: string;
  password: string;
  name?: string;
};

export type Metric = {
  id: number;
  name: string;
  value: number;
  min: number;
  max: number;
  color?: string;
  unitSymbol?: string;
  createdBy?: number;
  updatedBy?: number;
  createdAt?: Date;
};

export type MetricChangeLog = {
  id: number;
  userId: number;
  metricId: number;
  metricName: string;
  value: number;
  previousValue: number;
  timestamp: Date;
};

const Users = [
  {
    id: 1,
    name: "John Doe",
    email: "admin@bambuser.com",
    password: "admin",
  },
];

const Metrics: Metric[] = [
  {
    id: 1,
    name: "CPU",
    value: 12,
    color: "#06b6d4",
    unitSymbol: "%",
    createdAt: new Date(),
    createdBy: 1,
    min: 12,
    max: 53,
  },
  {
    id: 2,
    name: "Memory",
    value: 43,
    color: "#34d399",
    unitSymbol: "%",
    createdAt: new Date(),
    createdBy: 1,
    min: 21,
    max: 87,
  },
  {
    id: 3,
    name: "Disk",
    value: 34,
    color: "#a78bfa",
    unitSymbol: "Gb",
    createdAt: new Date(),
    createdBy: 1,
    min: 23,
    max: 98,
  },
  {
    id: 4,
    name: "Network",
    value: 87,
    color: "#EF6262",
    unitSymbol: "Mb/s",
    createdAt: new Date(),
    createdBy: 1,
    min: 12,
    max: 87,
  },
];

const MetricsChangeLog: MetricChangeLog[] = [
  {
    id: 1,
    userId: 1,
    metricId: 1,
    metricName: "CPU",
    value: 12,
    previousValue: 12,
    timestamp: new Date(),
  },
];

export const data = { Users, Metrics, MetricsChangeLog };
