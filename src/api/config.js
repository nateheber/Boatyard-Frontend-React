const mode = process.env.REACT_APP_STAGE;

let apiUrl = '';
switch (mode) {
  case 'sandbox':
    apiUrl = 'https://sandbox-api.boatyard.com/api/v2';
    break;
  case 'staging':
    apiUrl = 'https://staging-api.boatyard.com/api/v2';
    break;
  case 'production':
    apiUrl = 'https://ap-aye.boatyard.com/api/v2';
    break;
  default:
    apiUrl = 'https://staging-api.boatyard.com/api/v2';
}

export const apiBaseUrl = apiUrl;
export const spreedlyApiUrl = 'https://core.spreedly.com/v1/payment_methods.json?environment_key=7LAxQHurhgD3H3bqnU3XTtXjXlt';
export const spreedlyApiToken = '3Xp9txPFczmh4YA7PXaO4QOmShmjaNaRyIp44d8Ya347uxS8O3xH3NfPG2KSP7wk=';
export const intercomAppId = 'oshrxea5';
