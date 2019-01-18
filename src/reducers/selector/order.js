import { get, filter, forEach, findIndex } from 'lodash';
import { createSelector } from 'reselect';

const currentOrderSelector = state => state.order.currentOrder;
const allOrdersSelector = state => state.order.orders;
const includedSelector = state =>state.order.included;

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
      serviceAttributes,
    })
  })
  return data;
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
          if (value.length > -1) {
            order.relationships[key] = value.map(obj => {
              return included[obj.type][obj.id];
            });
          } else {
            order.relationships[key] = included[value.type][value.id];
          }
        }
      }
      return order;
    });
  }
);