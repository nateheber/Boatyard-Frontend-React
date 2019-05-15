import { createAuthClient } from './core';

import { apiBaseUrl } from './config';

const authClient = createAuthClient();

export const login = (email, password) =>
  authClient
    .post(`${apiBaseUrl}/users/sessions`, {
      session: {
        email,
        password
      }
    });

export const signup = (email, password) =>
  authClient
    .post(`${apiBaseUrl}/users/registrations`, {
      user: {
        email,
        password
      }
    });
