import { isEmpty, get, set, reverse, hasIn } from 'lodash';
import moment from 'moment';

const MERGE_RANGE_MINUTES = 5;

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

export const parseIncludedForMessages = (included) => {
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

export const refactorIncluded = (included) => {
  let refactored = {};
  for ( let i = 0; i < included.length; i += 1 ) {
    const { type, id } = included[i];
    set(refactored, `${type}.${id}`, {...included[i]});
  }
  return refactored;
};

export const parseMessageDetails = (profile, message, included) => {
  const profileId = get(message, 'attributes.profileId');
  const file = get(message, 'attributes.file.url');
  const content = get(message, 'attributes.content', '');
  const sentAt = get(message, 'attributes.data.sentAt');
  const senderProfile = getProfileData(included, profileId);
  // const senderName = hasIn(senderProfile, 'attributes.name') ? get(senderProfile, 'attributes.name') : `${get(senderProfile, 'attributes.firstName') || ''} ${get(senderProfile, 'attributes.lastName') || ''}`;
  const senderName = hasIn(senderProfile, 'attributes.name') ? get(senderProfile, 'attributes.name') : `${get(senderProfile, 'attributes.firstName') || ''}`;
  const own = getOwnership(profile, senderProfile);
  return { profileId, senderName, content, file, own, sentAt };
};

export const refineMessage = (profile, currentConversation) => {
  if(isEmpty(currentConversation))
      return { messages: [] };
    const { data, included } = currentConversation;
    const parsedIncluded = parseIncludedForMessages(included);
    const reversedData = reverse(data);
    const messages = reversedData.map((message, index) => {
      const currMessage = parseMessageDetails(profile, message, parsedIncluded);
      let hasPrev = false;
      let hasNext = false;
      let showDate = false;
      const prevMessage = parseMessageDetails(profile, reversedData[index - 1], parsedIncluded);
      const nextMessage = parseMessageDetails(profile, reversedData[index + 1], parsedIncluded);
      if (index === 0) {
        showDate = true;
        hasNext = hasNextMessage(currMessage, nextMessage);
      } else {
        const startDay = moment(prevMessage.sentAt).date();
        const endDay = moment(currMessage.sentAt).date();
        if (startDay !== endDay) {
          showDate = true;
        }
        hasPrev = hasPreviousMessage(prevMessage, currMessage);
        if (index < reversedData.length - 1) {
          hasNext = hasNextMessage(currMessage, nextMessage);
        }
      }

      return ({
        name: currMessage.senderName,
        body: currMessage.content,
        file: currMessage.file,
        own: currMessage.own,
        showDate,
        hasPrev,
        hasNext,
        time: currMessage.sentAt
      });
    });
    return { messages: messages, included: parsedIncluded };
}

const hasPreviousMessage = (prevMessage, currMessage) => {
  const startTime = moment(prevMessage.sentAt);
  const end = moment(currMessage.sentAt);
  const duration = moment.duration(end.diff(startTime));
  const mins = duration.asMinutes();
  if ((prevMessage.own === currMessage.own) && mins <= MERGE_RANGE_MINUTES)  {
    return true;
  }
  return false;
};

const hasNextMessage = (currMessage, nextMessage) => {
  const startTime = moment(currMessage.sentAt);
  const end = moment(nextMessage.sentAt);
  const duration = moment.duration(end.diff(startTime));
  const mins = duration.asMinutes();
  if ((currMessage.own === nextMessage.own) && mins <= MERGE_RANGE_MINUTES)  {
    return true;
  }
  return false;
};
