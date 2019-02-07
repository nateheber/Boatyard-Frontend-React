export const gatewayOptions = [
  {
    value: 'athorize_net',
    label: 'AUTHORIZE.NET',
    fields: [
      { name: 'login', placeholder: 'Your Authorize.Net API Login ID' },
      { name: 'password', placeholder: 'Your Authorize.Net Transaction Key' }
    ]
  },
  {
    value: 'wepay',
    label: 'WEPAY',
    fields: [
      { name: 'clientId', placeholder: 'Your WePay Client ID' },
      { name: 'accountId', placeholder: 'Your WePay Account ID' },
      { name: 'accessToken', placeholder: 'Your WePay Access Token' },
      { name: 'clientSecret', placeholder: 'Your WePay Client Secret' }
    ]
  }
];
