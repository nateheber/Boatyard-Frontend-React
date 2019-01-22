import { get } from 'lodash';

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
  }, (err) => {
    console.log(err);
    return [];
  });
  return client;
};

export const spreedlyResponseInterceptor = client => {
  client.interceptors.response.use((response) => {
    return response.data;
  }, () => ({ error: true }));
  return client;
}