import { createAuthClient } from './core';

import { apiBaseUrl } from './config';

const authClient = createAuthClient();

export const login = (email, password) =>
  authClient.post(`${apiBaseUrl}/users/sessions`, {
    session: {
      email,
      password
    }
  });

export const loginWithAuth0Token = (id_token) =>
  authClient.post(`${apiBaseUrl}/users/authentications`, {
    authentication: {
      id_token
    }
  });
export const signup = (email, password) =>
  authClient.post(`${apiBaseUrl}/users/registrations`, {
    user: {
      email,
      password
    }
  });

export const sendResetRequest = (email) =>
  authClient.post(`${apiBaseUrl}/users/recoveries`, {
    recovery: {
      email
    }
  });

export const resetPassword = (token, password) =>
  authClient.patch(`${apiBaseUrl}/users/recoveries`, {
    recovery: {
      reset_password_token: token,
      password: password,
      password_confirmation: password
    }
  });

export const createPassword = (token, password) =>
  authClient.patch(`${apiBaseUrl}/users/invitations`, {
    invitation: {
      invitation_token: token,
      password: password,
      password_confirmation: password
    }
  });


export const createCustomerPassword = (token, password) =>
  authClient.patch(`${apiBaseUrl}/users/generations`, {
    user: {
      authentication_token: token,
      password: password,
      password_confirmation: password
    }
  });
