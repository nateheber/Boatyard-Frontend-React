import axios from 'axios';

import addAuthenticationInterceptors from './auth';
import addPayloadCasingInterceptors from './response';

const createClient = () => {
  const client = axios.create({
    headers: {
      'Content-Type': 'application/json',

      'Cache-Control': 'no-cache'
    },

    withCredentials: true
  });

  addAuthenticationInterceptors(client);

  addPayloadCasingInterceptors(client);

  return client;
};

export default createClient();
