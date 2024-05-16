const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const nodeEnv = process.env.NODE_ENV;
const vercelEnv = process.env.VERCEL_ENV;

const dev2Url = process.env.REACT_APP_DEV_URL;
const prod2Url = process.env.REACT_APP_PROD_URL;
const preview2Url = process.env.REACT_APP_PREVIEW_URL;

export const BaseUrl =
  vercelEnv === "preview"
    ? developmentUrl
    : nodeEnv === "production" || vercelEnv === "production"
    ? productionUrl
    : developmentUrl;


export const Base2Url = nodeEnv === "production" ||  vercelEnv === "production" ? prod2Url : (vercelEnv === "preview") ? preview2Url : dev2Url; 
