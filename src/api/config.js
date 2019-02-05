const hostName = window.location.hostname;

let apiUrl = '';
switch(hostName) {
  case 'secret-staging.boatyard.com':
    apiUrl = 'https://staging-api.boatyard.com/api/v2';
    break;
  case 'secret-production.boatyard.com':
    apiUrl = 'https://production-api.boatyard.com/api/v2';
    break;
  default:
    apiUrl = 'http://development-api.boatyard.com/api/v2';
}

export const apiBaseUrl = apiUrl;
export const spreedlyApiUrl = 'https://core.spreedly.com/v1/payment_methods.json?environment_key=7LAxQHurhgD3H3bqnU3XTtXjXlt';
export const spreedlyApiToken = '3Xp9txPFczmh4YA7PXaO4QOmShmjaNaRyIp44d8Ya347uxS8O3xH3NfPG2KSP7wk=';