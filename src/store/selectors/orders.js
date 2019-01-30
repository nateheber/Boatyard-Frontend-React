import { get, set, filter, forEach, findIndex, sortBy, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

const currentOrderSelector = state => {
  let order = state.order.currentOrder;
  const included = state.order.included;
  if (!isEmpty(order)) {
    for(const key in order.relationships) {
      let value = order.relationships[key].data;
      if(value) {
        if (key !== 'lineItems') {
          order.relationships[key] = included[value.type][value.id];
          if (key === 'boat') {
            const location = get(order.relationships[key], 'relationships.location.data');
            const locationInfo = get(included, `[${location.type}][${location.id}]`);
            set(order, `relationships[${key}].location`, locationInfo )
          }
        }
      }
    }
  }
  return order;
}

const allOrdersSelector = (state, orderType) => {
  switch (orderType) {
    case 'new': {
      return state.order.newOrders.orders;
    }
    case 'scheduled': {
      return state.order.scheduledOrders.orders;
    }
    case 'assigned': {
      return state.order.assignedOrders.orders;
    }
    case 'open': {
      return state.order.openOrders.orders;
    }
    case 'paid': {
      return state.order.paidOrders.orders;
    }
    default: {
      return state.order.orders.orders;
    }
  }
};
const includedSelector = (state, orderType) => {
  switch (orderType) {
    case 'new': {
      return state.order.newOrders.included;
    }
    case 'scheduled': {
      return state.order.scheduledOrders.included;
    }
    case 'assigned': {
      return state.order.assignedOrders.included;
    }
    case 'open': {
      return state.order.openOrders.included;
    }
    case 'paid': {
      return state.order.paidOrders.included;
    }
    default: {
      return state.order.orders.included;
    }
  }
};

const lineItemsSelector = state => {
  const currentOrder = state.order.currentOrder;
  const lineItems = get(currentOrder, 'data.relationships.lineItems.data');
  const included = get(currentOrder, 'included');
  const lineItemDetail = filter(included, info => info.type === 'line_items');
  const data = [];
  forEach(lineItems, (lineItem) => {
    const includedIdx = findIndex(lineItemDetail, detail => detail.id === lineItem.id && detail.type === lineItem.type);
    const attributes= get(lineItemDetail, `[${includedIdx}].attributes`);
    const serviceInfo = get(lineItemDetail, `[${includedIdx}].relationships.service.data`);
    const serviceIdx = findIndex(included, info => info.type === serviceInfo.type && info.id === serviceInfo.id);
    const serviceAttributes = get(included, `[${serviceIdx}].attributes`);
    return data.push({
      ...lineItem,
      attributes,
      serviceId: serviceInfo.id,
      serviceAttributes,
    })
  })
  return sortBy(data, ['id']);
};

export const orderSelector = state => ({
  lineItems: lineItemsSelector(state),
  currentOrder: currentOrderSelector(state),
});

export const refinedOrdersSelector = createSelector(
  allOrdersSelector,
  includedSelector,
  (allOrders, included) => {
    return allOrders.map(order => {
      for(const key in order.relationships) {
        let value = order.relationships[key].data;
        if(value) {
          if (key === 'lineItems') {
            if (value.length > 0) {
              order.relationships[key] = value.map(obj => {
                return included[obj.type][obj.id];
              });
              for(const subKey in order.relationships[key][0].relationships) {
                const subValue = order.relationships[key][0].relationships[subKey].data;
                if (subValue) {
                  order.relationships[subKey] = included[subValue.type][subValue.id];
                }
              }
            }
          } else {
            order.relationships[key] = included[value.type][value.id];
          }
        }
      }
      return order;
    });
  }
);
