import axios from 'axios';
import applyCaseConverter from 'axios-case-converter';

import { apiBaseUrl } from '../config';
import { authInterceptor } from './auth';
import { responseInterceptor } from './response';

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

export class CRUDClient {
  apiUrl = '';
  client = undefined;
  constructor(query, authType = 'basic') {
    this.apiUrl = `${apiBaseUrl}/${query}/`;
    this.client = createMainClient(authType);
  }
  list = () => {
    return this.client.get(this.apiUrl);
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
