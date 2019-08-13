import Auth0Lock from 'auth0-lock';

export const AUTH_CONFIG = {
  domain: 'boatyard.auth0.com',
  clientId: 'NBL64luwiwLVcHHwdcsyEhDdve5ZyU55',
}

export const Auth0Logout = () => {
  const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain);
  lock.logout({returnTo: `${window.location.origin}/login`});
}