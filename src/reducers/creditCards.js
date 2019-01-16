import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createCreditCard: 'CREDIT_CARDS/CREATE',
  fetchCreditCards: 'CREDIT_CARDS/FETCH',
  updateCreditCard: 'CREDIT_CARDS/UPDATE',
  deleteCreditCard: 'CREDIT_CARDS/DELETE',
  setCreditCards: 'CREDIT_CARDS/SET',
};

export const createCreditCard = createAction(actions.createCreditCard);
export const fetchCreditCards = createAction(actions.fetchCreditCards);
export const updateCreditCard = createAction(actions.updateCreditCard);
export const deleteCreditCard = createAction(actions.deleteCreditCard);

const initialState = {
  creditCards: [],
};

export default handleActions(
  {
    [actions.setCreditCards]: (state, { payload }) =>
      produce(state, draft => {
        draft.creditCards = payload
      }),
  },
  initialState
);
