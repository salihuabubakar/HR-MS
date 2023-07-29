const developmentUrl = "https://www.jakago.com.ng";
const productionUrl = "https://www.portal.jakago.com.ng";
// const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
const staging = process.env.REACT_APP_NODENV;
export const BaseUrl =  process.env.NODE_ENV === "production" ? developmentUrl : process.env.NODE_ENV === "development" ? developmentUrl : staging === "staging" && developmentUrl;
console.log("env", process.env.NODE_ENV);
console.log("pro", process.env.REACT_APP_PRODUCTION_URL);
console.log("dev", process.env.REACT_APP_DEVELOPMENT_URL);
console.log("stage",staging);