import { get } from 'lodash';

export const getPrevilage = state => get(state, 'auth.privilege')