import { get } from 'lodash';

import store from 'store';
import { logout } from 'store/reducers/auth';

export const responseInterceptor = client => {
  client.interceptors.response.use((response) => {
    const { perPage, total } = response.headers;
    if (perPage || total) {
      return ({
        perPage,
        total,
        data: get(response.data, 'data', []),
        included: get(response.data, 'included', [])
      });
    }
    return response.data;
  }, (error) => {
    const errorData = get(error, 'response.data', {});
    const message = get(error, 'response.data.message')
    if (message === 'Signature has expired') {
      store.dispatch(logout());
      return false;
    } else {
      return {error: errorData};
    }
  });
  return client;
};

export const spreedlyResponseInterceptor = client => {
  client.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    return get(error, 'response.data.errors', []);
  });
  return client;
}