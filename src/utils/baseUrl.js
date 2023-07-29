const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const environment = process.env.NODE_ENV;

console.log(developmentUrl, productionUrl, environment);
export const BaseUrl =  environment === "production" ? productionUrl : environment === "development" ? developmentUrl : developmentUrl;