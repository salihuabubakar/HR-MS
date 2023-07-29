const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const nodeAndVercelEnv = process.env.NODE_ENV || process.env.VERCEL_ENV;

export const BaseUrl = nodeAndVercelEnv  === "production" ? productionUrl : nodeAndVercelEnv === "development" || nodeAndVercelEnv === "preview" && developmentUrl;
console.log("baseUrl: ", BaseUrl, "env: ", nodeAndVercelEnv);
