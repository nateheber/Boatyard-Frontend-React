import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createCreditCard: 'CREDIT_CARDS/CREATE',
  fetchCreditCards: 'CREDIT_CARDS/FETCH',
  updateCreditCard: 'CREDIT_CARDS/UPDATE',
  deleteCreditCard: 'CREDIT_CARDS/DELETE',
  setCreditCards: 'CREDIT_CARDS/SET',
  setError: 'CREDIT_CARDS/SET_ERROR',
  resetError: 'CREDIT_CARDS/RESET_ERROR',
};

export const createCreditCard = createAction(actions.createCreditCard);
export const fetchCreditCards = createAction(actions.fetchCreditCards);
export const updateCreditCard = createAction(actions.updateCreditCard);
export const deleteCreditCard = createAction(actions.deleteCreditCard);
export const resetError = createAction(actions.resetError);

const initialState = {
  creditCards: [],
  error: false,
};

export default handleActions(
  {
    [actions.setCreditCards]: (state, { payload }) =>
      produce(state, draft => {
        draft.creditCards = payload
      }),
    [actions.setError]: (state) =>
      produce(state, draft => {
        draft.error = true
      }),
    [actions.resetError]: (state) =>
      produce(state, draft => {
        draft.error = false
      })
  },
  initialState
);
