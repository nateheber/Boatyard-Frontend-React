import { get } from 'lodash';
import { createSelector } from 'reselect';
import { refineUsers } from 'utils/users';

export const networksSelector = (state) => state.network.networks;
export const includedSelector = (state) => state.network.included;
export const selectProviderId = (state) => state.auth.providerId;
export const refinedNetworkSelector = createSelector(
  networksSelector, includedSelector,
  (networks, included) => {

    const parsedData = networks.filter(network => get(network, 'relationships.recipient.data') && get(network, 'relationships.sender.data'))
      .map((network) => {
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

export const getRecipients = createSelector(
  includedSelector,
  (included) => {
    return refineUsers(Object.values(included.users || {}));
  }
)
