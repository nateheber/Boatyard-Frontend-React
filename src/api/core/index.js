import axios from 'axios';
import applyCaseConverter from 'axios-case-converter';

import { apiBaseUrl, spreedlyApiToken, spreedlyApiUrl } from '../config';
import { authInterceptor } from './auth';
import { responseInterceptor, spreedlyResponseInterceptor } from './response';

export const createAuthClient = () => {
  const client = responseInterceptor(
    applyCaseConverter(
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

export const createMainClient = authType => {
  const client = responseInterceptor(
    authInterceptor(
      applyCaseConverter(
        axios.create({
          header: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        })
      ),
      authType
    )
  );
  return client;
};

export const createSpreedlyClient = () => {
  const client = spreedlyResponseInterceptor(
    applyCaseConverter(
      axios.create({
        header: {
          'Content-Type': 'application/json',
          'Cache-control': 'no-cache',
          'Authorization': `Bearer ${spreedlyApiToken}`
        }
      })
    )
  )
  return client;
}

export class SpreedlyClient {
  client = undefined;
  constructor() {
    this.client = createSpreedlyClient();
  }
  get = url => {
    return this.client.get(`${spreedlyApiUrl}${url}`);
  };
  post = (url, data) => {
    return this.client.post(`${spreedlyApiUrl}${url}`, data);
  };
  patch = (url, data) => {
    return this.client.patch(`${spreedlyApiUrl}${url}`, data);
  };
  delete = (url, data) => {
    return this.client.delete(`${spreedlyApiUrl}${url}`, data);
  };
}

export class NormalClient {
  client = undefined;
  constructor(authType = 'basic') {
    this.client = createMainClient(authType);
  }
  get = url => {
    return this.client.get(`${apiBaseUrl}${url}`);
  };
  post = (url, data) => {
    return this.client.post(`${apiBaseUrl}${url}`, data);
  };
  patch = (url, data) => {
    return this.client.patch(`${apiBaseUrl}${url}`, data);
  };
  delete = (url, data) => {
    return this.client.delete(`${apiBaseUrl}${url}`, data);
  };
}

export class CRUDClient {
  apiUrl = '';
  client = undefined;
  constructor(query, authType = 'basic') {
    this.apiUrl = `${apiBaseUrl}/${query}/`;
    this.client = createMainClient(authType);
  }
  list = (params = null) => {
    let paramsString = '';

    if (params) {
      params = {
        page: 1,
        ...params
      };
    } else {
      params = {
        page: 1
      };
    }

    const array = [];
    for  (const key in params) {
      if (params.hasOwnProperty(key)) {
        array.push(`${key}=${params[key]}`);
      }
    }
    paramsString = array.join('&');
    return this.client.get(`${this.apiUrl}?${paramsString}`);
  };
  create = data => {
    return this.client.post(`${this.apiUrl}`, data);
  };
  read = id => {
    return this.client.get(`${this.apiUrl}${id}`);
  };
  update = (id, data) => {
    return this.client.patch(`${this.apiUrl}${id}`, data);
  };
  delete = id => {
    return this.client.delete(`${this.apiUrl}${id}`);
  };
}

export class MultiLayerCRUDClient {
  layers = [];
  client = undefined;
  constructor(layers, authType = 'basic') {
    this.layers = layers;
    this.client = createMainClient(authType);
  }
  generateUrl = params => {
    let url = apiBaseUrl;
    for (let i = 0; i < params.length; i += 1) {
      url = `${url}${this.layers[i]}/${params[i]}/`;
    }
    if (params.length + 1 === this.layers.length) {
      url = `${url}/${this.layers[this.layers.length - 1]}/`;
    } else if (params.length === this.layers.length) {
      return url;
    }
    throw new Error('Invalid params configuration');
  };
  list = params => {
    const url = this.generateUrl(params);
    return this.client.get(url);
  };
  create = (params, data) => {
    const url = this.generateUrl(params);
    return this.client.post(url, data);
  };
  read = params => {
    const url = this.generateUrl(params);
    return this.client.get(url);
  };
  update = (params, data) => {
    const url = this.generateUrl(params);
    return this.client.patch(url, data);
  };
  delete = params => {
    const url = this.generateUrl(params);
    return this.client.delete(url);
  };
}
