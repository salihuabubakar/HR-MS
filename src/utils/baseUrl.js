const developmentUrl = "https://www.jakago.com.ng";
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const staging = process.env.REACT_APP_NODENV;
export const BaseUrl =  process.env.NODE_ENV === "production" ? developmentUrl : process.env.NODE_ENV === "development" ? developmentUrl : staging === "staging" && developmentUrl;
console.log("env", process.env.NODE_ENV, staging, developmentUrl);