import { get, filter, forEach, findIndex } from 'lodash';

const currentOrderSelector = state => state.order.currentOrder

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
  return data
}

export const orderSelector = state => ({
  lineItems: lineItemsSelector(state),
  currentOrder: currentOrderSelector(state),
})