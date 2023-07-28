const developmentUrl = process.env.REACT_APP_DEVELOPMENT_URL
const productionUrl = process.env.REACT_APP_PRODUCTION_URL;

export const BaseUrl = process.env.NODE_ENV === 'production' ? productionUrl : developmentUrl;