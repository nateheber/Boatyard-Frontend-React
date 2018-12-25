import store from '../../store';

export const authInterceptor = (client, authType) => {
  client.interceptors.request.use(
    config => {
      const {
        auth: { authToken, adminToken, providerToken }
      } = store.getState();
      let token = undefined;
      switch (authType) {
        case 'basic':
          token = authToken;
          break;
        case 'admin':
          token = adminToken;
          break;
        case 'provider':
          token = providerToken;
          break;
        default:
          token = authToken;
          break;
      }
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  return client;
};
