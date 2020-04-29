import Auth0Lock from 'auth0-lock';
const mode = process.env.REACT_APP_STAGE;
let client = '';

switch (mode) {
  case 'sandbox':
    client = 'AdRUrBOyuk15EvxhVNi2HZCEOEt9kIKn';
    break;
  case 'staging':
    client = 'gfgy9ShWFqBnHpPCOonIuXkPV0YRZ3K3';
    break;
  case 'production':
    client = 'NBL64luwiwLVcHHwdcsyEhDdve5ZyU55';
    break;
  default:
    client = 'gfgy9ShWFqBnHpPCOonIuXkPV0YRZ3K3';
}

export const AUTH_CONFIG = {
  domain: 'login.boatyard.com',
  clientId: client,
}

export const Auth0Logout = () => {
  const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain);
  lock.logout({returnTo: `${window.location.origin}/login`});
}
