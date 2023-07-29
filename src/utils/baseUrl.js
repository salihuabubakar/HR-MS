const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const nodeEnv = process.env.NODE_ENV;
const vercelEnv = process.env.VERCEL_ENV;

export const BaseUrl =
  vercelEnv === "preview"
    ? developmentUrl
    : nodeEnv === "production"
    ? productionUrl
    : developmentUrl;

console.log("baseUrl: ", BaseUrl, "nodeEnv: ", nodeEnv, "vercelEnv: ", vercelEnv);
