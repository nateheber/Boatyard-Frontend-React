import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createBoats: 'BOATS/CREATE',
  fetchBoats: 'BOATS/FETCH',
  updateBoats: 'BOATS/UPDATE',
  deleteBoats: 'BOATS/DELETE',
  setBoats: 'BOATS/SET',
  getUserBoats: 'BOATS/FETCH_USER_BOATS'
};

export const createBoats = createAction(actions.createBoats);
export const fetchBoats = createAction(actions.fetchBoats);
export const getUserBoats = createAction(actions.getUserBoats);
export const updateBoats = createAction(actions.updateBoats);
export const deleteBoats = createAction(actions.deleteBoats);

const initialState = {
  boats: [],
  included: []
};

export default handleActions(
  {
    [actions.setBoats]: (state, { payload }) =>
      produce(state, draft => {
        const { boats, included } = payload
        draft.boats = boats
        draft.included = included
      })
  },
  initialState
);
