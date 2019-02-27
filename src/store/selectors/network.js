import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

export const networksSelector = (state) => state.network.networks;
export const includedSelector = (state) => state.network.included;

export const refinedNetworkSelector = createSelector(
  networksSelector, includedSelector,
  (networks, included) => {
    const parsedData = networks.map((network) => {
      const ownerInfo = get(network, 'relationships.owner.data');
      let ownerDetail = {};
      if (ownerInfo && !isEmpty(ownerInfo)) {
        ownerDetail = get(included, `[${ownerInfo.type}][${ownerInfo.id}]`);
      }
      return ({
        id: network.id,
        owner: ownerDetail
      });  
    });
    return {networks: parsedData};
  }
);