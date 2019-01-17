import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { set, get } from 'lodash'

export const actions = {
  createOrders: 'ORDERS/CREATE',
  fetchOrders: 'ORDERS/FETCH',
  getOrder: 'ORDERS/FETCH_ONE',
  getUserOrders: 'ORDERS/FETCH_USER',
  resetOrders: 'ORDERS/RESET',
  updateOrders: 'ORDERS/UPDATE',
  deleteOrders: 'ORDERS/DELETE',
  setOrders: 'ORDERS/SET',
  setOrder: 'ORDERS/SET_ONE'
}

export const createOrders = createAction(actions.createOrders)
export const getOrder = createAction(actions.getOrder)
export const getUserOrders = createAction(actions.getUserOrders)
export const resetOrders = createAction(actions.resetOrders)
export const fetchOrders = createAction(actions.fetchOrders)
export const updateOrders = createAction(actions.updateOrders)
export const deleteOrders = createAction(actions.deleteOrders)

const initialState = {
  orders: [],
  included: {},
  currentOrder: {},
  loading: false,
  page: 0,
  perPage: 20,
  total: 0,
}

export default handleActions(
  {
    [actions.fetchOrders]: (state, { payload }) =>
      produce(state, draft => {
        draft.page = get(payload, 'page', 1)
        draft.loading = true
      }),
    [actions.getUserOrders]: (state, { payload }) =>
      produce(state, draft => {
        draft.page = payload.page
        draft.loading = true
      }),
    [actions.resetOrders]: state =>
      produce(state, draft => {
        draft.orders = []
        draft.page = 1
        draft.perPage = 20
        draft.total = 0
      }),
    [actions.setOrders]: (state, { payload }) =>
      produce(state, draft => {
        const { total, perPage, orders, included } = payload
        draft.total = total
        draft.perPage = perPage
        draft.orders = orders
        draft.included = {}
        for ( let i = 0; i < included.length; i += 1 ) {
          const { type, id } = included[i]
          set(draft.included, `${type}.${id}`, {...included[i]})
        }
      }),
    [actions.setOrder]: (state, { payload }) =>
      produce(state, draft => {
        draft.currentOrder = payload
      })
  },
  initialState
)
