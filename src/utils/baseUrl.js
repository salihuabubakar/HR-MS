const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;
// process.env.NODE_ENV === 'production' ? productionUrl
export const BaseUrl =  process.env.NODE_ENV === "production" ? 'https://www.portal.jakago.com.ng' : process.env.NODE_ENV === "development" ? 'https://www.jakago.com.ng' : 'https://www.jakago.com.ng';
console.log("🚀 ~ file: baseUrl.js:5 ~ BaseUrl:", process.env.NODE_ENV)