import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createLineItem: 'LINE_ITEMS/CREATE',
  fetchLineItems: 'LINE_ITEMS/FETCH',
  updateLineItem: 'LINE_ITEMS/UPDATE',
  deleteLineItem: 'LINE_ITEMS/DELETE',
  setLineItems: 'LINE_ITEMS/SET'
};

export const createLineItem = createAction(actions.createLineItem);
export const fetchLineItems = createAction(actions.fetchLineItems);
export const updateLineItem = createAction(actions.updateLineItem);
export const deleteLineItem = createAction(actions.deleteLineItem);

const initialState = {
  lineItems: [],
};

export default handleActions(
  {
    [actions.setLineItems]: (state, { payload }) =>
      produce(state, draft => {
        draft.lineItems = payload
      }),
  },
  initialState
);
