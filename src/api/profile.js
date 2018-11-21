import axios from 'axios';
import applyCaseConverter from 'axios-case-converter';

import applyAuthInterceptor from './core/auth';
import applyResponseInterceptor from './core/response';

import { apiBaseUrl } from './config';

applyCaseConverter(applyResponseInterceptor(applyAuthInterceptor(axios)));

export const getUserProfile = id => axios.get(`${apiBaseUrl}/users/${id}`);

export const updateUserProfile = (id, data) =>
  axios.patch(`${apiBaseUrl}/users/${id}`, { user: data });

export const deleteUser = id => axios.delete(`${apiBaseUrl}/users/${id}`);
