import { isEmpty, get, set, reverse, hasIn } from 'lodash';

export const getProfileData = (included, profileId) => {
  const profileData = get(included, `[profiles][${profileId}]`, {});
  const type = get(profileData, `relationships.owner.data.type`);
  const id = get(profileData, `relationships.owner.data.id`);
  return get(included, `[${type}][${id}]`);
}

export const getOwnership = (profile, senderProfile) => {
  const senderProfileId = get(senderProfile, 'id');
  const senderProfileType = get(senderProfile, 'type');
  const profileId = get(profile, 'id');
  const profileType = get(profile, 'type');
  return senderProfileId === profileId && profileType === senderProfileType;
}

export const parseIncluded = (included) => {
  return included.reduce((prev, item) => {
    const { id, type, attributes, relationships } = item;
    const target = {...prev};
    if (type === 'provider_profiles' || type === 'user_profiles') {
      set(target, `[profiles][${id}]`, { id, type, attributes, relationships });
    } else {
      set(target, `${type}[${id}]`, { id, type, attributes, relationships });
    }
    return target;
  }, {});
}

export const refineMessage = (profile, currentConversation) => {
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
      const senderName = hasIn(senderProfile, 'attributes.name') ? get(senderProfile, 'attributes.name') : `${get(senderProfile, 'attributes.firstName') || ''} ${get(senderProfile, 'attributes.lastName') || ''}`;
      const own = getOwnership(profile, senderProfile );
      return ({
        name: senderName,
        body: content,
        file,
        own,
        time: sentAt
      })
    })
    return { messages: reverse(messages), included: parsedIncluded };
}