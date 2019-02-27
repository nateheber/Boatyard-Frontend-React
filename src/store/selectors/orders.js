import { get, set, filter, forEach, findIndex, sortBy, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

const setLineItemRelationships = (lineItem, included) => {
  const resultData = {...lineItem};
  const { relationships } = lineItem;
  for(const key in relationships) {
    let value = get(relationships, `[${key}].data`);
    if (value && !isEmpty(value)) {
      set(resultData, `relationships[${key}]`, get(included, `[${value.type}][${value.id}]`));
    }
  }
  return lineItem;
}

const currentOrderSelector = state => {
  let order = state.order.currentOrder;
  const included = state.order.included;
  if (!isEmpty(order)) {
    for(const key in order.relationships) {
      const value = get(order, `relationships[${key}].data`);
      if(value) {
        if (key === 'lineItems') {
          const lineItemRelation = get(order, `relationships[${key}].data`, []);
          const lineItems = [];
          forEach(lineItemRelation, (info) => {
            const lineItemDetail = get(included, `[${info.type}][${info.id}]`);
            const parsedLineItem = setLineItemRelationships(lineItemDetail, included);
            lineItems.push(parsedLineItem);
          })
          set(order, 'lineItems', lineItems);
        } else if (key === 'orderDispatches') {
          const dispatchRelation = get(order, `relationships[${key}].data`, []);
          const dispatchIds = [];
          forEach(dispatchRelation, (info) => {
            const dispatchDetail = get(included, `[${info.type}][${info.id}].attributes`);
            const dispatchId = get(dispatchDetail, 'providerId');
            dispatchIds.push(dispatchId);
          })
          set(order, 'dispatchIds', dispatchIds);
        } else {
          order.relationships[key] = get(included, `[${value.type}][${value.id}]`);
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
      return get(state, 'order.newOrders.orders', []);
    }
    case 'scheduled': {
      return get(state, 'order.scheduledOrders.orders', []);
    }
    case 'assigned': {
      return get(state, 'order.assignedOrders.orders', []);
    }
    case 'open': {
      return get(state, 'order.openOrders.orders', []);
    }
    case 'paid': {
      return get(state, 'order.paidOrders.orders', []);
    }
    default: {
      return get(state, 'order.orders.orders', []);
    }
  }
};
const includedSelector = (state, orderType) => {
  switch (orderType) {
    case 'new': {
      return get(state, 'order.newOrders.included', []);
    }
    case 'scheduled': {
      return get(state, 'order.scheduledOrders.included', []);
    }
    case 'assigned': {
      return get(state, 'order.assignedOrders.included', []);
    }
    case 'open': {
      return get(state, 'order.openOrders.included', []);
    }
    case 'paid': {
      return get(state, 'order.paidOrders.included', []);
    }
    default: {
      return get(state, 'order.orders.included', []);
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
        let value = get(order, `relationships[${key}].data`);
        if(value) {
          if (key === 'lineItems') {
            if (value.length > 0) {
              set(order.relationships, `[${key}]`, value.map(obj => {
                return get(included, `[${obj.type}][${obj.id}]`);
              }))
              for(const subKey in get(order, `relationships[${key}][0].relationships`)) {
                const subValue = get(order, `relationships[${key}][0].relationships[${subKey}].data`);
                if (subValue) {
                  order.relationships[subKey] = get(included, `[${subValue.type}][${subValue.id}]`);
                }
              }
            }
          } else {
            order.relationships[key] = get(included, `[${value.type}][${value.id}]`);
            if (key === 'boat') {
              const boatLocationInfo = get(order.relationships[key], 'relationships.location.data');
              if (boatLocationInfo) {
                const locationInfo = get(included, `[${boatLocationInfo.type}][${boatLocationInfo.id}]`);
                set(order.relationships[key], 'relationships.location', { attributes: locationInfo.attributes, address: get(locationInfo, 'relationships.address.data') });
              }
            }
          }
        }
      }
      return order;
    });
  }
);
