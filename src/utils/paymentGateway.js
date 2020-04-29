export const gatewayOptions = [
  {
    value: 'authorize_net',
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
      { name: 'first_name', placeholder: 'First Name' },
      { name: 'last_name', placeholder: 'Last Name' },
      { name: 'email', placeholder: 'Email' }
    ]
  }
];
