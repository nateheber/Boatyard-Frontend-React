import { handleActions } from 'redux-actions'
import { produce } from 'immer'
import { set, get } from 'lodash'

import { actionTypes } from '../actions/orders';

function refactorIncluded(included) {
  let refactored = {};
  for ( let i = 0; i < included.length; i += 1 ) {
    const { type, id } = included[i]
    set(refactored, `${type}.${id}`, {...included[i]})
  }
  return refactored;
}

const ordersState = {
  orders: [],
  included: {},
  page: 1,
  perPage: 20,
  total: 0
};

const initialState = {
  currentStatus: '',
  currentOrder: {},
  orders: ordersState,
  newOrders: ordersState,
  scheduledOrders: ordersState,
  assignedOrders: ordersState,
  openOrders: ordersState,
  paidOrders: ordersState,
  errors: null
};

export default handleActions(
  {
    [actionTypes.GET_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.orders.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.orders.total = total;
        draft.orders.perPage = perPage;
        draft.orders.orders = orders;
        draft.orders.included = refactorIncluded(included);
      }),
    [actionTypes.GET_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_NEW_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.newOrders.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_NEW_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.newOrders.total = total;
        draft.newOrders.perPage = perPage;
        draft.newOrders.orders = orders;
        draft.newOrders.included = refactorIncluded(included);
      }),
    [actionTypes.GET_NEW_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_SCHEDULED_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.scheduledOrders.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_SCHEDULED_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.scheduledOrders.total = total;
        draft.scheduledOrders.perPage = perPage;
        draft.scheduledOrders.orders = orders;
        draft.scheduledOrders.included = refactorIncluded(included);
      }),
    [actionTypes.GET_SCHEDULED_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_ASSIGNED_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.assignedOrders.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_ASSIGNED_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.assignedOrders.total = total;
        draft.assignedOrders.perPage = perPage;
        draft.assignedOrders.orders = orders;
        draft.assignedOrders.included = refactorIncluded(included);
      }),
    [actionTypes.GET_ASSIGNED_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_OPEN_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.openOrders.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_OPEN_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.openOrders.total = total;
        draft.openOrders.perPage = perPage;
        draft.openOrders.orders = orders;
        draft.openOrders.included = refactorIncluded(included);
      }),
    [actionTypes.GET_OPEN_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_PAID_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.paidOrders.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_PAID_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.paidOrders.total = total;
        draft.paidOrders.perPage = perPage;
        draft.paidOrders.orders = orders;
        draft.paidOrders.included = refactorIncluded(included);
      }),
    [actionTypes.GET_PAID_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_ORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentOrder = payload;
      }),
    [actionTypes.GET_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.CREATE_ORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.CREATE_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.CREATE_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.UPDATE_ORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.UPDATE_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.UPDATE_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.DELETE_ORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DELETE_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DELETE_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      })
    },
  initialState
);
