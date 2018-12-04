import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createManagements: 'MANAGEMENTS/CREATE',
  fetchManagements: 'MANAGEMENTS/FETCH',
  updateManagements: 'MANAGEMENTS/UPDATE',
  deleteManagements: 'MANAGEMENTS/DELETE',
  setManagements: 'MANAGEMENTS/SET',
  appendManagement: 'MANAGEMENTS/APPEND'
};

export const createManagements = createAction(actions.createManagements);
export const fetchManagements = createAction(actions.fetchManagements);
export const updateManagements = createAction(actions.updateManagements);
export const deleteManagements = createAction(actions.deleteManagements);

const initialState = {
  managements: []
};

export default handleActions(
  {
    [actions.setManagements]: (state, { payload }) =>
      produce(state, draft => {
        draft.managements = [...draft.managements, ...payload];
      }),
    [actions.appendManagement]: (state, { payload }) =>
      produce(state, draft => {
        draft.managements = [...draft.managements, payload];
      })
  },
  initialState
);
