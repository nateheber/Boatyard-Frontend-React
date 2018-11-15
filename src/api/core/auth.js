import { get } from 'lodash';

import { actions } from '../../reducers/auth';
import { store } from '../../store';

const addBearer = async (request, force) => {
  const {
    auth: { authToken }
  } = store.getState();
  if (
    authToken &&
    (!request || !request.headers || !request.headers.Authorization || force)
  ) {
    request.headers = request.headers || {};

    request.headers.Authorization = `Bearer ${authToken}`; // eslint-disable-line no-param-reassign

    request.headers['Cache-Control'] = 'no-cache';
  }
  return request;
};

export default client => {
  client.interceptors.request.use(
    async request => {
      await addBearer(request);
      return request;
    },

    e => e
  );
  client.interceptors.response.use(
    response => response || {},
    async error => {
      const { response } = error;
      const tokenExpired =
        get(response, 'headers.x-amz-error-code') === 'NoSuchKey' ||
        response.status === 401;
      if (tokenExpired) {
        store.dispatch({
          type: actions.logout
        });
      }
      return error;
    }
  );
  return client;
};
