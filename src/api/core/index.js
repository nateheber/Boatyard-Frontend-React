import axios from 'axios';

import { apiBaseUrl, locationApiBaseUrl, spreedlyApiToken, spreedlyApiUrl } from '../config';
import { authInterceptor } from './auth';
import { responseInterceptor, spreedlyResponseInterceptor } from './response';

export const createAuthClient = () => {
  const client = responseInterceptor(
    axios.create({
      header: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
  );
  return client;
};

export const createMainClient = authType => {
  const client = responseInterceptor(
    authInterceptor(
      axios.create({
        header: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }),
      authType
    )
  );
  return client;
};

export const createSpreedlyClient = () => {
  const client = spreedlyResponseInterceptor(
    axios.create({
      header: {
        'Content-Type': 'application/json',
        'Cache-control': 'no-cache',
        'Authorization': `Bearer ${spreedlyApiToken}`
      }
    })
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
  list = (url, params = null, version='v2') => {
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
    return this.client.get(`${version === 'v3' ? locationApiBaseUrl :apiBaseUrl}${url}?${paramsString}`);
  };
  get = (url, version='v2') => {
    return this.client.get(`${version === 'v3' ? locationApiBaseUrl :apiBaseUrl}${url}`);
  };
  post = (url, data, version='v2') => {
    return this.client.post(`${version === 'v3' ? locationApiBaseUrl :apiBaseUrl}${url}`, data);
  };
  patch = (url, data, version='v2') => {
    return this.client.patch(`${version === 'v3' ? locationApiBaseUrl :apiBaseUrl}${url}`, data);
  };
  delete = (url, data, version='v2') => {
    return this.client.delete(`${version === 'v3' ? locationApiBaseUrl :apiBaseUrl}${url}`, data);
  };
}

export class CRUDClient {
  client = undefined;
  query = ''
  constructor(query, authType = 'basic') {
    this.query = query;
    this.client = createMainClient(authType);
  }
  list = (params = null, version='v2') => {
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
    const apiUrl = `${version === 'v2' ? apiBaseUrl : locationApiBaseUrl}/${this.query}/`;
    return this.client.get(`${apiUrl}?${paramsString}`);
  };
  create = (data, version='v2') => {
    const apiUrl = `${version === 'v2' ? apiBaseUrl : locationApiBaseUrl}/${this.query}/`;
    if (this.query === 'users') {
      return this.client.post(`${apiUrl}registrations/`, data);
    }
    return this.client.post(apiUrl, data);
  };
  read = (id, version='v2') => {
    const apiUrl = `${version === 'v2' ? apiBaseUrl : locationApiBaseUrl}/${this.query}/`;
    return this.client.get(`${apiUrl}${id}`);
  };
  update = (id, data, version='v2') => {
    const apiUrl = `${version === 'v2' ? apiBaseUrl : locationApiBaseUrl}/${this.query}/`;
    return this.client.patch(`${apiUrl}${id}`, data);
  };
  delete = (id, version='v2') => {
    const apiUrl = `${version === 'v2' ? apiBaseUrl : locationApiBaseUrl}/${this.query}/`;
    return this.client.delete(`${apiUrl}${id}`);
  };
}

export class MultiLayerCRUDClient {
  layers = [];
  version = 'v2';
  client = undefined;
  constructor(layers, authType = 'basic', version='v2') {
    this.layers = layers;
    this.version = version;
    this.client = createMainClient(authType);
  }
  generateUrl = params => {
    let url = this.version === 'v2' ? apiBaseUrl : locationApiBaseUrl;
    for (let i = 0; i < params.length; i += 1) {
      url = `${url}/${this.layers[i]}/${params[i]}`;
    }
    if (params.length + 1 === this.layers.length) {
      url = `${url}/${this.layers[this.layers.length - 1]}/`;
      return url;
    } else if (params.length === this.layers.length) {
      return url;
    }
    throw new Error('Invalid params configuration');
  };
  list = (baseParams, params) => {
    const url = this.generateUrl(baseParams);
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
    return this.client.get(`${url}?${paramsString}`);
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

export class MultiLayersCRUDClient {
  layers = [];
  client = undefined;
  apiUrl = '';
  constructor(layers, authType = 'basic', params) {
    this.layers = layers;
    this.client = createMainClient(authType);
    this.apiUrl = this.generateUrl(params);
  }
  generateUrl = params => {
    let url = this.layers.includes('providers') ? locationApiBaseUrl : apiBaseUrl;
    for (let i = 0; i < params.length; i += 1) {
      url = `${url}/${this.layers[i]}/${params[i]}`;
    }
    if (params.length + 1 === this.layers.length) {
      url = `${url}/${this.layers[this.layers.length - 1]}/`;
      return url;
    } else if (params.length === this.layers.length) {
      return url;
    }
    throw new Error('Invalid params configuration');
  };
  list = (params) => {
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
    return this.client.post(this.apiUrl, data);
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
