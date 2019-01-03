import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createBoats: 'SERVICES/CREATE',
  fetchBoats: 'SERVICES/FETCH',
  updateBoats: 'SERVICES/UPDATE',
  deleteBoats: 'SERVICES/DELETE',
  setBoats: 'SERVICES/SET',
  getUserBoats: 'SERVICES/FETCH_USER_BOATS'
};

export const createBoats = createAction(actions.createBoats);
export const fetchBoats = createAction(actions.fetchBoats);
export const getUserBoats = createAction(actions.getUserBoats);
export const updateBoats = createAction(actions.updateBoats);
export const deleteBoats = createAction(actions.deleteBoats);

const initialState = {
  boats: []
};

export default handleActions(
  {
    [actions.setBoats]: (state, { payload }) =>
      produce(state, draft => {
        draft.boats = payload;
      })
  },
  initialState
);
