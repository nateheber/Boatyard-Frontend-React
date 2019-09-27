import { get, orderBy } from 'lodash';
import { createSelector } from 'reselect';

import { refineMessage } from 'utils/conversations';

export const conversationsSelector = (state) => state.conversation.conversations;
export const includedSelector = (state) => state.conversation.included;
export const currentConversationSelector = (state) => state.conversation.message;
export const privilegeSelector = (state) => state.auth.privilege;
export const profileSelector = (state) => state.profile;
export const authSelector = (state) => state.auth;
export const loggedInProviderSelector = (state) => get(state, 'provider.loggedInProvider');

export const refinedConversationSelector = createSelector(
  conversationsSelector, includedSelector,
  (conversations, included) => {
    console.log(conversations);
    const parsedData = conversations.filter(
        c => get(c, 'relationships.mostRecentMessage.data') && get(c, 'relationships.sender.data') && get(c, 'relationships.recipient.data')
      ).map((conversation) => {
      const senderInfo = get(conversation, 'relationships.sender.data');
      // const senderProfileInfo = get(included, `[${senderInfo.type}][${senderInfo.id}].relationships.owner.data`);
      const senderProfile = get(included, `[${senderInfo.type}][${senderInfo.id}]`);
      const recipientInfo = get(conversation, 'relationships.recipient.data') || {};
      // const recipientProfileInfo = get(included, `[${recipientInfo.type}][${recipientInfo.id}].relationships.owner.data`, {});
      const recipientProfile = get(included, `[${recipientInfo.type}][${recipientInfo.id}]`, {});
      const messageInfo = get(conversation, 'relationships.mostRecentMessage.data') || {};
      const  mostRecentMessage = get(included, `[${messageInfo.type}][${messageInfo.id}]`);
      return {
        conversation,
        senderProfile,
        recipientProfile,
        mostRecentMessage
      }
    });
    return {conversations: orderBy(parsedData, [function(o){ return o.mostRecentMessage.attributes.createdAt; }], ['desc'])};
  }
);

export const refinedMessageSelector = createSelector(
  profileSelector,
  currentConversationSelector,
  authSelector,
  refineMessage
);
