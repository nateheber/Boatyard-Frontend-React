export const destroyInterceptor = (client, authType) => {
  client.interceptors.request.use(
    async config => {
      const { data } = config;
      // if (data) {
      //   data.replace(/"destroy"/gi, '"_destroy"');
      // }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  return client;
};
