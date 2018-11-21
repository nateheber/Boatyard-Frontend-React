export const responseInterceptor = client => {
  client.interceptors.response.use(response => response.data, () => []);
  return client;
};
