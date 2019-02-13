import { get } from 'lodash';
import { camelize } from '@ridi/object-case-converter';

import store from 'store';
import { logout } from 'store/reducers/auth';

export const responseInterceptor = client => {
  client.interceptors.response.use((response) => {
    const perPage = get(response.headers, 'per-page');
    const total = get(response.headers, 'total');
    const data = camelize(response.data, { recursive: true });
    if (perPage || total) {
      return ({
        perPage,
        total,
        data: get(data, 'data', []),
        included: get(data, 'included', [])
      });
    }
    return data;
  }, (error) => {
    const errorData = get(error, 'response.data', {});
    const message = get(error, 'response.data.message', '');
    if (message === 'Signature has expired') {
      store.dispatch(logout());
      return false;
    } else {
      throw errorData;
    }
  });
  return client;
};

export const spreedlyResponseInterceptor = client => {
  client.interceptors.response.use((response) => {
    return camelize(response.data, { recursive: true });
  }, (error) => {
    return get(error, 'response.data.errors', []);
  });
  return client;
}