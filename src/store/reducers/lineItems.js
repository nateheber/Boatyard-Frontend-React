import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createLineItem: 'LINE_ITEMS/CREATE',
  createLineItems: 'LINE_ITEMS/CREATE_BATCH',
  fetchLineItems: 'LINE_ITEMS/FETCH',
  updateLineItem: 'LINE_ITEMS/UPDATE',
  updateLineItems: 'LINE_ITEMS/UPDATE_BATCH',
  deleteLineItem: 'LINE_ITEMS/DELETE',
  setLineItems: 'LINE_ITEMS/SET'
};

export const createLineItem = createAction(actions.createLineItem);
export const createLineItems = createAction(actions.createLineItems);
export const fetchLineItems = createAction(actions.fetchLineItems);
export const updateLineItem = createAction(actions.updateLineItem);
export const updateLineItems = createAction(actions.updateLineItems);
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
