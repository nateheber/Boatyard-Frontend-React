import moment from 'moment';
import { isEmpty, get, set, reverse, find } from 'lodash';

const MERGE_RANGE_MINUTES = 5;

export const getProfileData = (included, profileId) => {
  const profileData = get(included, `[profiles][${profileId}]`, {});
  const type = get(profileData, `relationships.owner.data.type`);
  const id = get(profileData, `relationships.owner.data.id`);
  return get(included, `[${type}][${id}]`);
}

export const parseIncludedForMessages = (included) => {
  return included.reduce((prev, item) => {
    const { id, type, attributes, relationships } = item;
    const target = {...prev};
    if (type === 'provider_profiles' || type === 'user_profiles' || type === 'provider_location_profiles') {
      set(target, `[profiles][${id}]`, { id, type, attributes, relationships });
    } else {
      set(target, `${type}[${id}]`, { id, type, attributes, relationships });
    }
    return target;
  }, {});
}

export const parseMessageDetails = (profile, message, included) => {
  if (!message) {
    return {};
  }
  const attachments = get(message, 'relationships.fileAttachments.data', []).map(attachment => find(get(included, 'file_attachments', []), attachment));
  const content = get(message, 'attributes.content', '');
  const sentAt = get(message, 'attributes.data.sentAt');
  const sender = get(message, 'relationships.sender.data') || {};
  const own = sender.id === profile.id;
  const {firstName, lastName} = included.users[sender.id].attributes;
  const senderName = `${firstName} ${lastName}`;
  const profileId = sender.id;

  return { profileId, senderName, content, attachments, own, sentAt };
};

export const refineMessage = (profile, currentConversation, auth) => {
  if(isEmpty(currentConversation) || isEmpty(currentConversation.included))
      return { messages: [] };
    const { data, included } = currentConversation;
    const parsedIncluded = parseIncludedForMessages(included);
    const reversedData = reverse(data);
    const messages = reversedData.map((message, index) => {
      const currMessage = parseMessageDetails(profile, message, parsedIncluded, auth);
      let hasPrev = false;
      let hasNext = false;
      let showDate = false;
      const prevMessage = parseMessageDetails(profile, reversedData[index - 1], parsedIncluded, auth);
      const nextMessage = parseMessageDetails(profile, reversedData[index + 1], parsedIncluded, auth);
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
        attachments: currMessage.attachments,
        own: currMessage.own,
        showDate,
        hasPrev,
        hasNext,
        time: currMessage.sentAt
      });
    });
    return { messages: messages, included: parsedIncluded };
}

export const refineMessages = (profile, data, included) => {
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
  if ((prevMessage.profileId === currMessage.profileId) && mins <= MERGE_RANGE_MINUTES)  {
    return true;
  }
  return false;
};

const hasNextMessage = (currMessage, nextMessage) => {
  const startTime = moment(currMessage.sentAt);
  const end = moment(nextMessage.sentAt);
  const duration = moment.duration(end.diff(startTime));
  const mins = duration.asMinutes();
  if ((currMessage.profileId === nextMessage.profileId) && mins <= MERGE_RANGE_MINUTES)  {
    return true;
  }
  return false;
};
