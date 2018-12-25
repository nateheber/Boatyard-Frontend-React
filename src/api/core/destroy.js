export const destroyInterceptor = (client, authType) => {
  client.interceptors.request.use(
    async config => {
      const { data } = config;
      console.log(client.interceptors.request);
      // if (data) {
      //   data.replace(/"destroy"/gi, '"_destroy"');
      // }
      console.log(data);
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  return client;
};
