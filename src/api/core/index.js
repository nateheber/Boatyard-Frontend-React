import axios from 'axios';
import applyConverters from 'axios-case-converter';

import addAuthenticationInterceptors from './auth';
import addPayloadCasingInterceptors from './response';

export const createClient = () => {
  const client = addPayloadCasingInterceptors(
    addAuthenticationInterceptors(
      applyConverters(
        axios.create({
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          },
          withCredentials: true
        })
      )
    )
  );

  return client;
};

export const createAuthClient = () => {
  const client = addPayloadCasingInterceptors(
    applyConverters(
      axios.create({
        header: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })
    )
  );
  return client;
};
