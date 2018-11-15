import axios from 'axios';

import { apiBaseUrl } from './config';

export const login = (email, password) =>
  axios
    .post(`${apiBaseUrl}/users/session`, {
      session: {
        email,
        password
      }
    })
    .then(response => response.data)
    .catch(err => err);

export const signup = (email, password) =>
  axios
    .post(`${apiBaseUrl}/users/registrations`, {
      user: {
        email,
        password
      }
    })
    .then(response => response.data)
    .catch(err => err);
