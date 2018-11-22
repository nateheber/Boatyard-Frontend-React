import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createUsers: 'USERS/CREATE',
  fetchUsers: 'USERS/FETCH',
  updateUsers: 'USERS/UPDATE',
  deleteUsers: 'USERS/DELETE',
  setUsers: 'USERS/SET'
};

export const createUsers = createAction(actions.createUsers);
export const fetchUsers = createAction(actions.fetchUsers);
export const updateUsers = createAction(actions.updateUsers);
export const deleteUsers = createAction(actions.deleteUsers);

const initialState = {
  users: []
};

export default handleActions(
  {
    [actions.setUsers]: (state, { payload }) =>
      produce(state, draft => {
        draft.users = payload;
      })
  },
  initialState
);
