import { find } from 'lodash';

export const getContractorByUserId = ({contractors: {contractors}}, userId) => {
  return find(contractors, c => c.user.id === userId) || {user: {}}
};
