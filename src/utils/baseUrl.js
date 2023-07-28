const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL;
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const staging = process.env.REACT_APP_NODENV;
export const BaseUrl =  process.env.NODE_ENV === "production" ? productionUrl : process.env.NODE_ENV === "development" ? developmentUrl : staging === "staging" && developmentUrl;
console.log("🚀 ~ file: baseUrl.js:5 ~ BaseUrl:", process.env.NODE_ENV, staging);