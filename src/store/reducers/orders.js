import { handleActions } from 'redux-actions'
import { produce } from 'immer'
import { set, get } from 'lodash'

import { actionTypes } from '../actions/orders';
import { refactorIncluded } from 'utils/basic';

const ordersState = {
  orders: [],
  included: {},
  page: 1,
  perPage: 20,
  total: 0,
  dispatched: false,
  teamMemberData: [],
  unselectedColumns: []
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
  loading: false,
  errors: null
};

export default handleActions(
  {
    [actionTypes.SET_DISPATCHED_FLAG]: (state, action) =>
      produce(state, draft => {
        const { payload } = action;
        draft.dispatched = payload;
      }),
    [actionTypes.GET_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        set(draft, 'orders.page', get(payload, 'params.page', 1));
        draft.loading = true;
        draft.errors = null;
      }),
    [actionTypes.GET_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        draft.loading = false;
        set(draft, 'orders.total', total);
        set(draft, 'orders.perPage', perPage);
        set(draft, 'orders.orders', orders);
        set(draft, 'orders.included', refactorIncluded(included));
      }),
    [actionTypes.GET_ORDERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.loading = false;
        draft.errors = payload;
      }),

    [actionTypes.GET_NEW_ORDERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        set(draft, 'newOrders.page', get(payload, 'params.page', 1));
        draft.errors = null;
      }),
    [actionTypes.GET_NEW_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        set(draft, 'newOrders.total', total);
        set(draft, 'newOrders.perPage', perPage);
        set(draft, 'newOrders.orders', orders);
        set(draft, 'newOrders.included', refactorIncluded(included));
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
        set(draft, 'scheduledOrders.page', get(payload, 'params.page', 1));
        draft.errors = null;
      }),
    [actionTypes.GET_SCHEDULED_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        set(draft, 'scheduledOrders.total', total);
        set(draft, 'scheduledOrders.perPage', perPage);
        set(draft, 'scheduledOrders.orders', orders);
        set(draft, 'scheduledOrders.included', refactorIncluded(included));
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
        set(draft, 'assignedOrders.page', get(payload, 'params.page', 1));
        draft.errors = null;
      }),
    [actionTypes.GET_ASSIGNED_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        set(draft, 'assignedOrders.total', total);
        set(draft, 'assignedOrders.perPage', perPage);
        set(draft, 'assignedOrders.orders', orders);
        set(draft, 'assignedOrders.included', refactorIncluded(included));
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
        set(draft, 'openOrders.page', get(payload, 'params.page', 1));
        draft.errors = null;
      }),
    [actionTypes.GET_OPEN_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        set(draft, 'openOrders.total', total);
        set(draft, 'openOrders.perPage', perPage);
        set(draft, 'openOrders.orders', orders);
        set(draft, 'openOrders.included', refactorIncluded(included));
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
        set(draft, 'paidOrders.page', get(payload, 'params.page', 1));
        draft.errors = null;
      }),
    [actionTypes.GET_PAID_ORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, orders, included } = payload;
        draft.currentStatus = type;
        set(draft, 'paidOrders.total', total);
        set(draft, 'paidOrders.perPage', perPage);
        set(draft, 'paidOrders.orders', orders);
        set(draft, 'paidOrders.included', refactorIncluded(included));
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
        draft.loading = true;
        draft.errors = null;
      }),
    [actionTypes.GET_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { order, included } } = action;
        draft.currentStatus = type;
        draft.currentOrder = order;
        draft.loading = false;
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.GET_ORDER_PROVIDER_LOCATION_TEAM_MEMBER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { teamMemberData} } = action;
        draft.currentStatus = type;
        draft.teamMemberData = teamMemberData;
      }),
    [actionTypes.GET_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.loading = false;
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
        const { type, payload: { order, included } } = action;
        draft.currentStatus = type;
        draft.currentOrder = order;
        draft.included = refactorIncluded(included);
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
        const { type, payload: { order, included } } = action;
        draft.currentStatus = type;
        draft.currentOrder = order;
        draft.included = refactorIncluded(included);
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
      }),
    [actionTypes.DISPATCH_ORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DISPATCH_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DISPATCH_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.SEND_QUOTE]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.SEND_QUOTE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { order } } = action;
        draft.currentStatus = type;
        draft.currentOrder = order;
      }),
    [actionTypes.SEND_QUOTE_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.SEND_INVOICE]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.SEND_INVOICE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { order } } = action;
        draft.currentStatus = type;
        draft.currentOrder = order;
      }),
    [actionTypes.SEND_INVOICE_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.ACCEPT_ORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.ACCEPT_ORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { order, included } } = action;
        draft.currentStatus = type;
        draft.currentOrder = order;
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.ACCEPT_ORDER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.UPDATE_SELECTED_COLUMNS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { unselectedColumns} } = action;
        draft.unselectedColumns = unselectedColumns;
        draft.currentStatus = type;
      }),
      [actionTypes.RESET_PAGES]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        set(draft, 'orders.page', 1);
        draft.errors = null;
      })
    },
  initialState
);
