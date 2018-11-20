import { get } from 'lodash';

import store from '../../store';

export default client => {
  client.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();
      if (authToken) {
        config.headers.Authorization = authToken;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  return client;
};
