import { createAction } from 'redux-actions'

export const actionTypes = {
  GET_ORDERS: '[ORDERS] - Get orders',
  GET_ORDERS_SUCCESS: '[ORDERS] - Get orders Success',
  GET_ORDERS_FAILURE: '[ORDERS] - Get orders Failure',

  GET_NEW_ORDERS: '[ORDERS ] - Get new orders',
  GET_NEW_ORDERS_SUCCESS: '[ORDERS ] - Get new orders Success',
  GET_NEW_ORDERS_FAILURE: '[ORDERS ] - Get new orders Failure',

  GET_SCHEDULED_ORDERS: '[ ORDERS ] - Get scheduled orders',
  GET_SCHEDULED_ORDERS_SUCCESS: '[ ORDERS ] - Get scheduled orders Success',
  GET_SCHEDULED_ORDERS_FAILURE: '[ ORDERS ] - Get scheduled orders Failure',

  GET_ASSIGNED_ORDERS: '[ ORDERS ] - Get orders assigned to me',
  GET_ASSIGNED_ORDERS_SUCCESS: '[ ORDERS ] - Get orders assigned to me Success',
  GET_ASSIGNED_ORDERS_FAILURE: '[ ORDERS ] - Get orders assigned to me Failure',

  GET_OPEN_ORDERS: '[ ORDERS ] - Get orders that are open invoices',
  GET_OPEN_ORDERS_SUCCESS: '[ ORDERS ] - Get orders that are open invoices Success',
  GET_OPEN_ORDERS_FAILURE: '[ ORDERS ] - Get orders that are open invoices Failure',

  GET_ORDER: '[ORDERS] - Get order',
  GET_ORDER_SUCCESS: '[ORDERS] - Get order Success',
  GET_ORDER_FAILURE: '[ORDERS] - Get order Failure',

  CREATE_ORDER: '[ORDERS] - Create new order',
  CREATE_ORDER_SUCCESS: '[ORDERS] - Create new order Success',
  CREATE_ORDER_FAILURE: '[ORDERS] - Create new order Failure',

  UPDATE_ORDER: '[ORDERS] - Update new order',
  UPDATE_ORDER_SUCCESS: '[ORDERS] - Update new order Success',
  UPDATE_ORDER_FAILURE: '[ORDERS] - Update new order Failure',

  DELETE_ORDER: '[ORDERS] - Delete new order',
  DELETE_ORDER_SUCCESS: '[ORDERS] - Delete new order Success',
  DELETE_ORDER_FAILURE: '[ORDERS] - Delete new order Failure'
};

export const GetOrders = createAction(actionTypes.GET_ORDERS, payload => payload);
export const GetOrdersSuccess = createAction(actionTypes.GET_ORDERS_SUCCESS);
export const GetOrdersFailure = createAction(actionTypes.GET_ORDERS_FAILURE);

export const GetNewOrders = createAction(actionTypes.GET_NEW_ORDERS, payload => payload);
export const GetNewOrdersSuccess = createAction(actionTypes.GET_NEW_ORDERS_SUCCESS);
export const GetNewOrdersFailure = createAction(actionTypes.GET_NEW_ORDERS_FAILURE);

export const GetScheduledOrders = createAction(actionTypes.GET_SCHEDULED_ORDERS, payload => payload);
export const GetScheduledOrdersSuccess = createAction(actionTypes.GET_SCHEDULED_ORDERS_SUCCESS);
export const GetScheduledOrdersFailure = createAction(actionTypes.GET_SCHEDULED_ORDERS_FAILURE);

export const GetAssignedOrders = createAction(actionTypes.GET_ASSIGNED_ORDERS, payload => payload);
export const GetAssignedOrdersSuccess = createAction(actionTypes.GET_ASSIGNED_ORDERS_SUCCESS);
export const GetAssignedOrdersFailure = createAction(actionTypes.GET_ASSIGNED_ORDERS_FAILURE);

export const GetOpenOrders = createAction(actionTypes.GET_OPEN_ORDERS, payload => payload);
export const GetOpenOrdersSuccess = createAction(actionTypes.GET_OPEN_ORDERS_SUCCESS);
export const GetOpenOrdersFailure = createAction(actionTypes.GET_OPEN_ORDERS_FAILURE);

export const GetOrder = createAction(actionTypes.GET_ORDER, payload => payload);
export const GetOrderSuccess = createAction(actionTypes.GET_ORDER_SUCCESS);
export const GetOrderFailure = createAction(actionTypes.GET_ORDER_FAILURE);

export const CreateOrder = createAction(actionTypes.CREATE_ORDER, payload => payload);
export const CreateOrderSuccess = createAction(actionTypes.CREATE_ORDER_SUCCESS);
export const CreateOrderFailure = createAction(actionTypes.CREATE_ORDER_FAILURE);

export const UpdateOrder = createAction(actionTypes.UPDATE_ORDER, payload => payload);
export const UpdateOrderSuccess = createAction(actionTypes.UPDATE_ORDER_SUCCESS);
export const UpdateOrderFailure = createAction(actionTypes.UPDATE_ORDER_FAILURE);

export const DeleteOrder = createAction(actionTypes.DELETE_ORDER, payload => payload);
export const DeleteOrderSuccess = createAction(actionTypes.DELETE_ORDER_SUCCESS);
export const DeleteOrderFailure = createAction(actionTypes.DELETE_ORDER_FAILURE);
