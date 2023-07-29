const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const environment = process.env.NODE_ENV;
const staging = process.env.REACT_APP_STAGING;
export const BaseUrl =  environment === "production" ? developmentUrl : staging === "staging" ? developmentUrl : productionUrl ? developmentUrl : developmentUrl;
if(environment === "production") {
  console.log("Production Environment..:", productionUrl);
}else if(environment === "development") {
  console.log("Development Environment..:", developmentUrl);
}else if (staging === "staging") {
  console.log("Staging Environment..:", staging);
}