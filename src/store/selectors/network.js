import { get } from 'lodash';
import { createSelector } from 'reselect';

export const networksSelector = (state) => state.network.networks;
export const includedSelector = (state) => state.network.included;

export const refinedNetworkSelector = createSelector(
  networksSelector, includedSelector,
  (networks, included) => {
    const parsedData = networks.map((network) => {
      const senderInfo = get(network, 'relationships.sender.data');
      const senderDetail = get(included, `[${senderInfo.type}][${senderInfo.id}]`);
      const recipientInfo = get(network, 'relationships.recipient.data');
      const recipientDetail = get(included, `[${recipientInfo.type}][${recipientInfo.id}]`);
      return ({
        id: network.id,
        sender: senderDetail,
        recipient: recipientDetail,
      });
    });
    return {networks: parsedData};
  }
);