import { findIndex, get } from 'lodash'
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
  return `Order placed by ${userName} ${dateString}`
}

export const getUpdatedStatus = (order) => {
  const updatedAt = get(order, 'data.attributes.updatedAt');
  const dateString = moment(updatedAt).format('MMM D, YYYY [at] hh:mm A');
  return `Order updated ${dateString}`
}

export const generateOrderTimeline = (order) => {
  const creationInfo = getCreationInfo(order);
  const updateInfo = getUpdatedStatus(order);
  return [creationInfo, updateInfo]
}