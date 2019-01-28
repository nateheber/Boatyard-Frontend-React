import { findIndex, get, isEmpty, sortBy } from 'lodash'
import moment from 'moment'

export const getUserName = (order) => {
  const userId = get(order, 'data.relationships.user.data.id');
  const included = get(order, 'included');
  const idx = findIndex(included, item => item.id === userId && item.type === 'users')
  const firstName = get(included, `[${idx}].attributes.firstName`);
  const lastName = get(included, `[${idx}].attributes.lastName`);
  return `${firstName} ${lastName}`
}

export const getCreationInfo = (order) => {
  const userName = getUserName(order);
  const createdAt = get(order, 'data.attributes.createdAt');
  const dateString = moment(createdAt).format('MMM D, YYYY [at] hh:mm A');
  return { time: moment(createdAt).valueOf(), message: `Order placed by ${userName} ${dateString}`}
}

export const getUpdatedStatus = (order) => {
  const updatedAt = get(order, 'data.attributes.updatedAt');
  const dateString = moment(updatedAt).format('MMM D, YYYY [at] hh:mm A');
  return { time: moment(updatedAt).valueOf(), message: `Order updated ${dateString}`}
}

export const getOrderProcessInfo = (order) => {
  const timeStamps = get(order, 'data.attributes.historicTimestamps');
  const keys = Object.keys(timeStamps);
  const result = [];
  for (let i = 0; i < keys.length; i += 1) {
    const time = get(timeStamps, keys[i]);
    switch(keys[i]) {
      case 'assignedAt':
        if (!isEmpty(time)) {
          result.push({time: moment(time).valueOf(), message: `Order assigned at ${moment(time).format('MMM D, YYYY [at] hh:mm A')}`});
        }
        break;
      case 'provisionedAt':
        if (!isEmpty(time)) {
          result.push({time: moment(time).valueOf(), message: `Order provisioned at ${moment(time).format('MMM D, YYYY [at] hh:mm A')}`});
        }
        break;
      case 'scheduledAt':
        if (!isEmpty(time)) {
          result.push({time: moment(time).valueOf(), message: `Order scheduled at ${moment(time).format('MMM D, YYYY [at] hh:mm A')}`});
        }
        break;
      case 'invoicedAt':
        if (!isEmpty(time)) {
          result.push({time: moment(time).valueOf(), message: `Order invoiced at ${moment(time).format('MMM D, YYYY [at] hh:mm A')}`});
        }
        break;
      default: break;
    }
  }
  return result;
}

export const generateOrderTimeline = (order) => {
  const creationInfo = getCreationInfo(order);
  const updateInfo = getUpdatedStatus(order);
  const timeLine = getOrderProcessInfo(order);
  const result = [creationInfo, updateInfo, ...timeLine ];
  return sortBy(result, ['time'])
}

export const getProviderIdFromOrder = (order) => {
  const { included } = order;
  const idx = findIndex(included, item => item.type === 'providers');
  return get(included, `[${idx}].id`)
}

export const getLocationAddressFromOrder = (order) => {
  const { included } = order;
  const idx = findIndex(included, item => item.type === 'locations');
  return get(included, `[${idx}].relationships.address`)
}