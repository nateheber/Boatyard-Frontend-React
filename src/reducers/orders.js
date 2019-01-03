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
  nextPage: 0,
  hasMore: true
};

export default handleActions(
  {
    [actions.fetchOrders]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = true;
      }),
    [actions.resetOrders]: state =>
      produce(state, draft => {
        draft.orders = [];
        draft.hasMore = true;
        draft.nextPage = 0;
      }),
    [actions.setOrders]: (state, { payload }) =>
      produce(state, draft => {
        if (draft.nextPage === 0) {
          draft.orders = [];
        }
        if (payload.length !== 0) {
          draft.orders = [...draft.orders, ...payload];
          draft.nextPage += 1;
        } else {
          draft.hasMore = false;
        }
        draft.loading = false;
      }),
    [actions.setOrder]: (state, { payload }) =>
      produce(state, draft => {
        draft.currentOrder = payload;
      })
  },
  initialState
);
