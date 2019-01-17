import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createOrders: 'ORDERS/CREATE',
  fetchOrders: 'ORDERS/FETCH',
  getOrder: 'ORDERS/FETCH_ONE',
  resetOrders: 'ORDERS/RESET',
  updateOrders: 'ORDERS/UPDATE',
  deleteOrders: 'ORDERS/DELETE',
  setOrders: 'ORDERS/SET',
  setOrder: 'ORDERS/SET_ONE'
};

export const createOrders = createAction(actions.createOrders);
export const getOrder = createAction(actions.getOrder);
export const resetOrders = createAction(actions.resetOrders);
export const fetchOrders = createAction(actions.fetchOrders);
export const updateOrders = createAction(actions.updateOrders);
export const deleteOrders = createAction(actions.deleteOrders);

const initialState = {
  orders: [],
  currentOrder: {},
  loading: false,
  page: 0,
  perPage: 20,
  total: 0,
};

export default handleActions(
  {
    [actions.fetchOrders]: (state, { payload }) =>
      produce(state, draft => {
        draft.page = payload.page;
        draft.loading = true;
      }),
    [actions.resetOrders]: state =>
      produce(state, draft => {
        draft.orders = [];
        draft.page = 1;
        draft.perPage = 20;
        draft.total = 0;
      }),
    [actions.setOrders]: (state, { payload }) =>
      produce(state, draft => {
        const { total, perPage, orders } = payload;
        draft.total = total;
        draft.perPage = perPage;
        draft.orders = orders;
      }),
    [actions.setOrder]: (state, { payload }) =>
      produce(state, draft => {
        draft.currentOrder = payload;
      })
  },
  initialState
);
