import { findIndex, get, isEmpty, sortBy, /*filter,*/find } from 'lodash';
import moment from 'moment';

export const getUserFromOrder = (order, privilege = 'admin') => {
  // let user = get(order, 'relationships.user');
  // if (privilege !== 'admin') {
  //   user = get(order, 'relationships.childAccount');
  // }
  // if (!isEmpty(user)) {
  //   return {
  //     id: user.id,
  //     type: user.type,
  //     ...user.attributes
  //   };
  // }
  let user = get(order, 'relationships.childAccount');
  if (!isEmpty(user)) {
    if (user.hasOwnProperty('data')) {
      user = get(order, 'relationships.user');
    }
    if (!isEmpty(user)) {
      return {
        id: user.id,
        type: user.type,
        ...user.attributes
      };
    }
  }
  return user;
};

export const getChildAccountFromOrder = order => {
  const user = get(order, 'relationships.childAccount');
  if (!isEmpty(user)) {
    return {
      id: user.id,
      type: user.type,
      ...user.attributes
    };
  }
  return user;
};

export const getBoatFromOrder = order => {
  let boat = get(order, 'relationships.boat', {});
  if (!isEmpty(boat)) {
    boat = {
      id: boat.id,
      ...boat.attributes,
      location: boat.location
    };
  }
  return boat;
};

export const getProviderFromOrder = order => {
  let provider = get(order, 'relationships.provider', {});
  if (!isEmpty(provider)) {
    provider = {
      id: provider.id,
      ...provider.attributes,
      ...provider.relationships
    };
  }
  return provider;
};

export const getCustomerName = (order, privilege = 'admin') => {
  const user = getUserFromOrder(order, privilege);
  const firstName = get(user, 'firstName', '') || '';
  const lastName = get(user, 'lastName', '') || '';
  return `${firstName} ${lastName}`;
};

export const getCreationInfo = order => {
  const customerName = getCustomerName(order);
  const createdAt = get(order, 'attributes.createdAt');
  const dateString = moment(createdAt).format('MMM D, YYYY [at] hh:mm A');
  return {
    time: moment(createdAt).valueOf(),
    message: `Order placed by ${customerName} on ${dateString}`
  };
};

export const getUpdatedStatus = order => {
  const updatedAt = get(order, 'attributes.updatedAt');
  const dateString = moment(updatedAt).format('MMM D, YYYY [at] hh:mm A');
  return {
    time: moment(updatedAt).valueOf(),
    message: `Order updated on ${dateString}`
  };
};

export const getOrderProcessInfo = order => {
  const result = [];
  if (!isEmpty(order)) {
    const timeStamps = get(order, 'attributes.historicTimestamps', {});
    const keys = Object.keys(timeStamps);
    for (let i = 0; i < keys.length; i += 1) {
      const time = get(timeStamps, keys[i]);
      switch (keys[i]) {
        case 'assignedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order assigned on ${moment(time).format(
                'MMM D, YYYY [at] hh:mm A'
              )}`
            });
          }
          break;
        case 'provisionedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order quoted on ${moment(time).format(
                'MMM D, YYYY [at] hh:mm A'
              )}`
            });
          }
          break;
        case 'scheduledAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order in progress on ${moment(time).format(
                'MMM D, YYYY [at] hh:mm A'
              )}`
            });
          }
          break;
        case 'invoicedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order invoiced on ${moment(time).format(
                'MMM D, YYYY [at] hh:mm A'
              )}`
            });
          }
          break;
        default:
          break;
      }
    }
  }
  return result;
};

export const generateOrderTimeline = order => {
  const creationInfo = getCreationInfo(order);
  const updateInfo = getUpdatedStatus(order);
  const timeLine = getOrderProcessInfo(order);
  const result = [creationInfo, updateInfo, ...timeLine];
  return sortBy(result, ['time']).reverse();
};

export const getLocationAddressFromOrder = order => {
  const { included } = order;
  const idx = findIndex(included, item => item.type === 'locations');
  return get(included, `[${idx}].relationships.address`);
};

export const getTeamMemberData = (data, included) => {
  // filter(data, ({attributes: {access }}) => access !== 'admin')
  return sortBy(
    data.map(row => {
      const {id, attributes: {firstName, lastName }} = find(included, row);
      return {id, fullName: `${firstName} ${lastName}` };
    }),
    ['fullName']
  )
}
