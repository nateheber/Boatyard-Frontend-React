import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createUsers: 'USERS/CREATE',
  fetchUsers: 'USERS/FETCH',
  fetchUser: 'USERS/FETCH_ONE',
  updateUsers: 'USERS/UPDATE',
  deleteUsers: 'USERS/DELETE',
  setUsers: 'USERS/SET',
  setUser: 'USERS/SET_ONE'
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
      }),
    [actions.setUser]: (state, { payload }) =>
      produce(state, draft => {
        draft.users = [...draft.users, payload];
      })
  },
  initialState
);
