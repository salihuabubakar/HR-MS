const nextDevelopmentUrl = process.env.NEXT_PUBLIC_REACT_APP_DEVELOPMENT_URL
const nextProductionUrl = process.env.NEXT_PUBLIC_REACT_APP_PRODUCTION_URL ;
const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL
const productionUrl = process.env.REACT_APP_PRODUCTION_URL ;
// process.env.NODE_ENV === 'production' ? productionUrl
export const BaseUrl =  process.env.NODE_ENV === "production" ? nextDevelopmentUrl : process.env.NODE_ENV === "development" ? developmentUrl : developmentUrl;
console.log("🚀 ~ file: baseUrl.js:5 ~ BaseUrl:", process.env.NODE_ENV)