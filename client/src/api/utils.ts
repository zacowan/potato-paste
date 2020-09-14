const DEV_API_URL = 'http://localhost:5001/potato-paste/us-central1/api';
const PROD_API_URL = '';

export const API_URL =
  process.env.NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL;
