import { get, forEach } from 'lodash';

const getProviderLocations = (state) => {
  const providerLocations = get(state, 'providerLocation.providerLocations', []);
  return providerLocations;
}

const getProviderIncluded = (state) => {
  const included = get(state, 'providerLocation.included', []);
  const result = {};
  forEach(included, item => {
    const {id, type} = item
  })
}

export const getProviderServices = (state) => {
  const locations = getProviderLocations(state);
  const included = get
}