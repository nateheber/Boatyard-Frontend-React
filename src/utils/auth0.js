import Auth0Lock from 'auth0-lock';
const mode = process.env.REACT_APP_STAGE;

export const AUTH_CONFIG = {
  domain: 'boatyard.auth0.com',
  clientId: mode === 'production' ? 'NBL64luwiwLVcHHwdcsyEhDdve5ZyU55' : 'gfgy9ShWFqBnHpPCOonIuXkPV0YRZ3K3',
}

export const Auth0Logout = () => {
  const lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain);
  lock.logout({returnTo: `${window.location.origin}/login`});
}