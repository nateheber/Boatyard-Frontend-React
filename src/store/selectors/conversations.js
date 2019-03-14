import { get } from 'lodash';
import { createSelector } from 'reselect';

import { refineMessage } from 'utils/conversations';

export const conversationsSelector = (state) => state.conversation.conversations;
export const includedSelector = (state) => state.conversation.included;
export const currentConversationSelector = (state) => state.conversation.currentConversation;
export const privilegeSelector = (state) => state.auth.privilege;
export const profileSelector = (state) => state.profile;
export const loggedInProviderSelector = (state) => get(state, 'provider.loggedInProvider.data');

export const refinedConversationSelector = createSelector(
  conversationsSelector, includedSelector,
  (conversations, included) => {
    const parsedData = conversations.map((conversation) => {
      const senderInfo = get(conversation, 'relationships.sender.data');
      const senderProfileInfo = get(included, `[${senderInfo.type}][${senderInfo.id}].relationships.owner.data`);
      const senderProfile = get(included, `[${senderProfileInfo.type}][${senderProfileInfo.id}]`);
      const recipientInfo = get(conversation, 'relationships.recipient.data');
      const recipientProfileInfo = get(included, `[${recipientInfo.type}][${recipientInfo.id}].relationships.owner.data`);
      const recipientProfile = get(included, `[${recipientProfileInfo.type}][${recipientProfileInfo.id}]`);
      const messageInfos = get(conversation, 'relationships.ongoingMessages.data', []);
      const messages = messageInfos.map(info => get(included, `[${info.type}][${info.id}]`));
      return {
        conversation,
        senderProfile,
        recipientProfile,
        messages
      }
    });
    return {conversations: parsedData};
  }
);

export const refinedMessageSelector = createSelector(
  profileSelector,
  currentConversationSelector,
  refineMessage
);