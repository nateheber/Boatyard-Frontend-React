import { get, set, forEach, sortBy, isEmpty, isArray, find, filter } from 'lodash';
import { createSelector } from 'reselect';
import { getProviderLocations, getPrevilage, getProviderLocationId } from './auth';

const ORDER_COLUMNS = [
  { label: 'order', value: 'name', width: 1 },
  { label: 'order placed', value: 'createdAt', width: 1.2 },
  {
    label: 'CUSTOMER',
    value: [
      'relationships.user.attributes.firstName/relationships.user.attributes.lastName'
    ],
    isCustomer: true,
    width: 1.2
  },
  { label: 'service', value: ['relationships.service.attributes.name', 'relationships.providerLocationService.attributes.name'], width: 1, isService: true },
  // {
  //   label: 'location',
  //   value: 'relationships.boat.relationships.location.address.street/relationships.boat.relationships.location.address.city/relationships.boat.relationships.location.address.state',
  //   combines: [', ', ', '],
  //   width: 2.5
  // },
  { label: 'provider', value: 'relationships.provider.attributes.name', width: 1 },
  { label: 'location', value: 'locationAddress', width: 1.2 },
  {
    label: 'boat location',
    street: 'relationships.boat.relationships.location.address.street',
    city: 'relationships.boat.relationships.location.address.city',
    state: 'relationships.boat.relationships.location.address.state',
    isLocation: true,
    width: 2.3
  },
  { label: 'boat name', value: 'relationships.boat.attributes.name', width: 1.5, },
  { label: 'boat', value: 'relationships.boat.attributes.make', width: 1.2, },
  { label: 'total', value: 'total', isValue: true, isCurrency: true, prefix: '$', width: 0.8, },
  { label: 'order status', value: 'stateAlias', width: 1.2 },
];

const ORDER_STATUSES = [
  { label: 'Draft', value: 'draft'},
  { label: 'Dispatched', value: 'dispatched'},
  { label: 'Accepted', value: 'accepted'},
  { label: 'Invoiced', value: 'invoiced'},
  { label: 'Completed', value: 'completed'}
];

const PROVIDER_STATUSES = [
  { label: 'Awaiting Acceptance', value: 'awaiting_acceptance'},
  { label: 'Quote Sent', value: 'quote_sent'},
  { label: 'In Progress', value: 'in_progress'},
  { label: 'Invoiced', value: 'invoiced'},
  { label: 'Completed', value: 'completed'}
];

export const statusSelector = createSelector(
  () => {
    return ORDER_STATUSES;
  }
);

export const providerStatusSelector = createSelector(
  () => {
    return PROVIDER_STATUSES;
  }
);

const setLineItemRelationships = (lineItem, included) => {
  const resultData = {...lineItem};
  const { relationships } = lineItem;
  for(const key in relationships) {
    let value = get(relationships, `[${key}].data`);
    if (value && !isEmpty(value)) {
      if (isArray(value)) {
        set(resultData, `relationships[${key}]`, []);
        for(const index in value) {
          const subValue = value[index];
          set(resultData, `relationships[${key}][${index}]`, get(included, `[${subValue.type}][${subValue.id}]`));
        }
      } else {
        set(resultData, `relationships[${key}]`, get(included, `[${value.type}][${value.id}]`));
      }
    }
  }
  return lineItem;
}

const currentOrderSelector = state => {
  let order = state.order.currentOrder;
  const included = state.order.included;
  // console.log(order);
  // console.log(included);
  if (!isEmpty(order)) {
    for(const key in order.relationships) {
      const value = get(order, `relationships[${key}].data`);
      if(value && ((isArray(value) && value.length >0) || !isArray(value))) {
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
            const dispatchId = get(dispatchDetail, 'providerLocationId');
            if (dispatchId) {
              dispatchIds.push(dispatchId);
            }
          })
          set(order, 'dispatchIds', dispatchIds);
        } else {
          const item = get(included, `[${value.type}][${value.id}]`);
          order.relationships[key] = item;
          if (key === 'boat') {
            const location = get(order.relationships[key], 'relationships.location.data');
            const locationInfo = location ? get(included, `[${location.type}][${location.id}]`) : {};
            set(order, `relationships[${key}].location`, locationInfo);
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
  const lineItems = get(currentOrder, 'relationships.lineItems.data');
  const included = state.order.included;
  const lineItemsDetail = (included && included.hasOwnProperty('line_items')) ? included['line_items'] : {};
  const data = [];
  forEach(lineItems, (lineItem) => {
    const attributes= get(lineItemsDetail, `${lineItem.id}.attributes`);
    const relationShips = get(lineItemsDetail, `${lineItem.id}.relationships`);
    let serviceInfo = get(relationShips, 'service');
    if (get(relationShips, 'providerLocationService') &&
      get(relationShips, 'providerLocationService').hasOwnProperty('id')) {
      serviceInfo = get(relationShips, 'providerLocationService');
    }
    const serviceAttributes = get(serviceInfo, 'attributes');
    return data.push({
      ...lineItem,
      attributes,
      serviceId: serviceInfo.id,
      serviceAttributes,
    })
  });
  return sortBy(data, ['id']);
};

export const orderSelector = state => ({
  lineItems: lineItemsSelector(state),
  currentOrder: currentOrderSelector(state),
});

const getUnselectedColumns = state => get(state, 'order.unselectedColumns', []);

export const columnsSelector = createSelector(
  getPrevilage,
  getProviderLocationId,
  currentOrderSelector,
  (previlage, providerLocationId) => {
    const columns = ORDER_COLUMNS.slice(0)
    if (previlage === 'provider') {
      columns.splice(4, 1);
      columns[2]['value'] = ['customerName'];
      if (providerLocationId) {
        columns.splice(4, 1);
      }
    } else {
      columns.splice(5, 1);
    }
    return columns;
  }
)

export const selectedColumnsSelector = createSelector(
  columnsSelector,
  getUnselectedColumns,
  (columns, unselectedLabels) => {
    return filter(columns, c => unselectedLabels.indexOf(c.label) === -1);
  }
)

export const refinedOrdersSelector = createSelector(
  allOrdersSelector,
  includedSelector,
  getProviderLocations,
  (allOrders, included, providerLocations) => {
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
      const providerLocation = find(providerLocations, {providerLocationId: order.providerLocationId});
      if (providerLocation) {
        order.locationAddress = providerLocation.locationName;
      } else {
        order.locationAddress = '';
      }
      return order;
    });
  }
);
