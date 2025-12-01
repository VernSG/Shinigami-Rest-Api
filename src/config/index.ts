export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDevelopment: process.env.NODE_ENV !== "production",
};

export const API_CONFIG = {
  defaultPageSize: 30,
  maxPageSize: 100,
  requestTimeout: 30000,
};

export const SHINIGAMI_CONFIG = {
  id: "3411809758861089969",
  name: "Shinigami",
  baseUrl: "https://app.shinigami.asia",
  apiUrl: "https://api.shngm.io",
  cdnUrl: "https://storage.shngm.id",
  lang: "id",
  supportsLatest: true,
};
