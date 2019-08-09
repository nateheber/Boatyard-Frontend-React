import { get, isEmpty } from 'lodash';

export const authSelector = state => get(state, 'auth');
export const isAuthenticatedSelector = state => {
  return !isEmpty(get(state, 'auth.adminToken')) || !isEmpty(get(state, 'auth.providerToken'));
};
export const getPrevilage = state => get(state, 'auth.privilege');
export const getLocationName = state => get(state, 'auth.locationName');
export const getAccessRole = state => get(state, 'auth.accessRole');
export const getProviderLocations = state => get(state, 'auth.providerLocations', []);
export const getProviderLocationId = state => get(state, 'auth.providerLocationId');
export const getToken = state =>  get(state, 'auth.adminToken') || get(state, 'auth.providerToken');