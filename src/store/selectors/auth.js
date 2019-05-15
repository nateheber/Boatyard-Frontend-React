import { get, isEmpty } from 'lodash';

export const authSelector = state => get(state, 'auth');
export const isAuthenticatedSelector = state => isEmpty(get(state, 'auth.adminToken')) && isEmpty(get(state, 'auth.providerToken'));
export const getPrevilage = state => get(state, 'auth.privilege');
