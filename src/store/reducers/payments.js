import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createPayment: 'PAYMENTS/CREATE',
  fetchPayments: 'PAYMENTS/FETCH',
  updatePayment: 'PAYMENTS/UPDATE',
  deletePayment: 'PAYMENTS/DELETE',
  setPayments: 'PAYMENTS/SET'
};

export const createPayment = createAction(actions.createPayment);
export const fetchPayments = createAction(actions.fetchPayments);
export const updatePayment = createAction(actions.updatePayment);
export const deletePayment = createAction(actions.deletePayment);

const initialState = {
  payments: [],
};

export default handleActions(
  {
    [actions.setPayments]: (state, { payload }) =>
      produce(state, draft => {
        draft.payments = payload
      }),
  },
  initialState
);
