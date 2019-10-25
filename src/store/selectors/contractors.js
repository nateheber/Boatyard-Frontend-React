import { find } from 'lodash';

export const getContractorByUserId = ({contractor: {contractors}}, userId) => {
  return find(contractors, c => c.user.id === userId) || {user: {}}
};
