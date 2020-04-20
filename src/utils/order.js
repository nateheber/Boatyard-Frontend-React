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
  const dateString = moment(createdAt).format('MMM D, YYYY [at] h:mm A');
  return {
    time: moment(createdAt).valueOf(),
    message: `Order placed by ${customerName} on ${dateString}`
  };
};

export const getUpdatedStatus = order => {
  const updatedAt = get(order, 'attributes.updatedAt');
  const dateString = moment(updatedAt).format('MMM D, YYYY [at] h:mm A');
  return {
    time: moment(updatedAt).valueOf(),
    message: `Order updated on ${dateString}`
  };
};

export const getActivityInfo = order => {
  const result = [];
  if (!isEmpty(order)) {
    const activities = get(order, 'attributes.activityFeed');
    if (!isEmpty(activities)) {
      activities.forEach(activity => {
        const full_name = `${activity.actor.firstName} ${activity.actor.lastName}`;
        switch (activity.type) {
          case 'order_placed':
            result.push({
              time: moment(activity.at).valueOf(),
              message: `Order placed by ${full_name} on ${moment(activity.at).format('MMM D, YYYY [at] h:mm A')}`
            });
            break;
          case 'order_accepted':
            result.push({
              time: moment(activity.at).valueOf(),
              message: `Order accepted by ${full_name} on ${moment(activity.at).format('MMM D, YYYY [at] h:mm A')}`
            });
            break;
          case 'order_assigned':
            break;
          case 'order_completed':
            result.push({
              time: moment(activity.at).valueOf(),
              message: `Order completed on ${moment(activity.at).format('MMM D, YYYY [at] h:mm A')}`
            });
            break;
          case 'invoice_sent':
            result.push({
              time: moment(activity.at).valueOf(),
              message: `Invoice sent by ${full_name} on ${moment(activity.at).format('MMM D, YYYY [at] h:mm A')}`
            });
            break;
          case 'quote_sent':
            result.push({
              time: moment(activity.at).valueOf(),
              message: `Quote sent by ${full_name} on ${moment(activity.at).format('MMM D, YYYY [at] h:mm A')}`
            });
            break;
          default:
            break;
        }
      })
    }
  }
  return result;
}

export const getOrderProcessInfo = order => {
  const result = [];
  // console.log(order);
  if (!isEmpty(order)) {
    const timeStamps = get(order, 'attributes.historicTimestamps', {});
    const acceptance = get(order, 'attributes.acceptanceHistory', {});
    const acceptanceLocation = acceptance[Object.keys(acceptance)[0]];
    const keys = Object.keys(timeStamps);
    for (let i = 0; i < keys.length; i += 1) {
      const time = get(timeStamps, keys[i]);
      switch (keys[i]) {
        case 'assignedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order assigned on ${moment(time).format(
                'MMM D, YYYY [at] h:mm A'
              )}`
            });
          }
          break;
        case 'provisionedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order quoted on ${moment(time).format(
                'MMM D, YYYY [at] h:mm A'
              )}`
            });
          }
          break;
        case 'scheduledAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order in progress on ${moment(time).format(
                'MMM D, YYYY [at] h:mm A'
              )}`
            });
          }
          break;
        case 'invoicedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order invoiced on ${moment(time).format(
                'MMM D, YYYY [at] h:mm A'
              )}`
            });
          }
          break;
        case 'acceptedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order accepted by ${acceptanceLocation} on ${moment(time).format(
                'MMM D, YYYY [at] h:mm A'
              )}`
            });
          }
          break;
        case 'dispatchedAt':
          if (!isEmpty(time)) {
            result.push({
              time: moment(time).valueOf(),
              message: `Order dispatched on ${moment(time).format(
                'MMM D, YYYY [at] h:mm A'
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
  const activity_feed = get(order, 'attributes.activityFeed');
  //const creationInfo = getCreationInfo(order);
  //const updateInfo = getUpdatedStatus(order);
  const timeLine = isEmpty(activity_feed) ? getOrderProcessInfo(order) : getActivityInfo(order);
  //const activity = getActivityInfo(order);
  const result = [/*creationInfo,*/ ...timeLine];
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
