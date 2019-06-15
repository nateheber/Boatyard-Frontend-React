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
    user: {
      authentication_token: token,
      password: password,
      password_confirmation: password
    }
  });
