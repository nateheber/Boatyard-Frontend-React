import { get } from 'lodash';

export const responseInterceptor = client => {
  client.interceptors.response.use((response) => {
    const { perPage, total } = response.headers;
    if (perPage || total) {
      return ({
        perPage,
        total,
        data: get(response.data, 'data', [])
      });
    }
    return response.data;
  }, () => []);
  return client;
};
