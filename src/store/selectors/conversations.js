import { get, isEmpty, hasIn, reverse, set } from 'lodash';
import { createSelector } from 'reselect';

export const conversationsSelector = (state) => state.conversation.conversations;
export const includedSelector = (state) => state.conversation.included;
export const currentConversationSelector = (state) => state.conversation.currentConversation;
export const privilegeSelector = (state) => state.auth.privilege;
export const profileSelector = (state) => state.profile;
export const loggedInProviderSelector = (state) => state.provider.loggedInProvider.data;

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

const getProfileData = (included, profileId) => {
  const providerProfile = get(included, `[provider_profiles][${profileId}]`, {});
  const userProfile = get(included, `[user_profiles][${profileId}]`, {});
  if (!isEmpty(providerProfile)) {
    const type = get(providerProfile, `relationships.owner.data.type`);
    const id = get(providerProfile, `relationships.owner.data.id`);
    return get(included, `[${type}][${id}]`)
  }
  if (!isEmpty(userProfile)) {
    const type = get(userProfile, `relationships.owner.data.type`);
    const id = get(userProfile, `relationships.owner.data.id`);
    return get(included, `[${type}][${id}]`)
  }
  return {}
}

const getOwnership = (profile, privilege, senderProfile, loggedInProvider) => {
  const senderProfileId = get(senderProfile, 'id');
  const senderProfileType = get(senderProfile, 'type');
  if (privilege === 'provider') {
    const currentProviderId = get(loggedInProvider, 'id');
    const currentProviderType = get(loggedInProvider, 'type');
    return senderProfileId === currentProviderId && senderProfileType === currentProviderType
  }
  const profileId = get(profile, 'id');
  const profileType = get(profile, 'type');
  return senderProfileId === profileId && profileType === senderProfileType;
}

const parseIncluded = (included) => {
  return included.reduce((prev, item) => {
    const { id, type, attributes, relationships } = item;
    const target = {...prev};
    set(target, `${type}[${id}]`, { id, type, attributes, relationships });
    return target;
  }, {});
}

export const refinedMessageSelector = createSelector(
  privilegeSelector,
  profileSelector,
  loggedInProviderSelector,
  currentConversationSelector,
  (privilege, profile, loggedInProvider, currentConversation) => {
    if(isEmpty(currentConversation))
      return { messages: [] };
    const { data, included } = currentConversation;
    const parsedIncluded = parseIncluded(included);
    const messages = data.map((message) => {
      const file = get(message, 'attributes.file.url');
      const profileId = get(message, 'attributes.profileId');
      const content = get(message, 'attributes.content', '');
      const sentAt = get(message, 'attributes.data.sentAt');
      const senderProfile = getProfileData(parsedIncluded, profileId);
      const senderName = hasIn(senderProfile, 'attributes.name') ? get(senderProfile, 'attributes.name') : `${get(senderProfile, 'attributes.firstName')} ${get(profile, 'attributes.lastName')}`;
      const own = getOwnership(profile, privilege, senderProfile, loggedInProvider );
      return ({
        name: senderName,
        body: content,
        file,
        own,
        time: sentAt
      })
    })
    return { messages: reverse(messages) };
  }
);