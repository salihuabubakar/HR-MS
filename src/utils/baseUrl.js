const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const staging = process.env.REACT_APP_NODENV;
const environment = process.env.NODE_ENV;
export const BaseUrl =  environment === "production" ? productionUrl : environment === "development" ? developmentUrl : staging === "staging" && developmentUrl;
console.log("Production Environment..:", productionUrl);
console.log("Development Environment..:", developmentUrl);