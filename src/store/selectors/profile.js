import { get } from 'lodash';
export const profileSelector = state => get(state, 'profile');