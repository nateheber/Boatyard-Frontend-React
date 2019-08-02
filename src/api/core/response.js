import { get, isEmpty, isArray, startCase } from 'lodash';
import { camelize } from '@ridi/object-case-converter';

import store from 'store';
import { Logout } from 'store/actions/auth';

export const responseInterceptor = client => {
  client.interceptors.response.use((response) => {
    const perPage = get(response.headers, 'per-page');
    const total = get(response.headers, 'total');
    const isBoatyardAdmin = get(response.headers, 'boatyard-admin');
    const unreadNotifications = get(response.headers, 'x-unread-notifications');
    const data = camelize(response.data, { recursive: true });
    if (perPage || total || isBoatyardAdmin || unreadNotifications) {
      return ({
        perPage,
        total,
        isBoatyardAdmin,
        unreadNotifications,
        data: get(data, 'data', []),
        included: get(data, 'included', [])
      });
    }
    return data;
  }, (error) => {
    const errorData = get(error, 'response.data', {});
    let message = 'Unknown Error';
    if (errorData && !isEmpty(errorData)) {
      message = get(error, 'response.data.message', '');
      if (!(message && message.length > 0)) {
        const keys = Object.keys(errorData);
        if (keys.length > 0) {
          message = `${startCase(keys[0])} ${get(errorData, `${keys[0]}`, '')}`;
        } else {
          message = errorData;
        }
      }
    }
    if(isArray(message) && message.length > 0) {
      message = message[0];
    }
    if (message === 'Signature has expired') {
      store.dispatch(Logout());
      return false;
    } else {
      const err = { message };
      throw err;
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