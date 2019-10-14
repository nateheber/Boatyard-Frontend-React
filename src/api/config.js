const mode = process.env.REACT_APP_STAGE;

let apiUrl = '';
let locationApiUrl = '';
switch (mode) {
  case 'sandbox':
    apiUrl = 'https://sandbox-api.boatyard.com/api/v2';
    locationApiUrl = 'https://sandbox-api.boatyard.com/api/v3';
    break;
  case 'staging':
    apiUrl = 'https://staging-api.boatyard.com/api/v2';
    locationApiUrl = 'https://staging-api.boatyard.com/api/v3';
    break;
  case 'production':
    apiUrl = 'https://production-api.boatyard.com/api/v2';
    locationApiUrl = 'https://production-api.boatyard.com/api/v3';
    break;
  default:
    apiUrl = 'https://staging-api.boatyard.com/api/v2';
    locationApiUrl = 'https://staging-api.boatyard.com/api/v3';
}

export const apiBaseUrl = apiUrl;
export const locationApiBaseUrl = locationApiUrl;
export const spreedlyApiUrl = 'https://core.spreedly.com/v1/payment_methods.json?environment_key=7LAxQHurhgD3H3bqnU3XTtXjXlt';
export const spreedlyApiToken = '3Xp9txPFczmh4YA7PXaO4QOmShmjaNaRyIp44d8Ya347uxS8O3xH3NfPG2KSP7wk=';
export const intercomAppId = 'oshrxea5';
export const mmIntercomAppId = 'gykkzpcq';
