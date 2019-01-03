import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createUsers: 'USERS/CREATE',
  fetchUsers: 'USERS/FETCH',
  fetchUser: 'USERS/FETCH_ONE',
  updateUsers: 'USERS/UPDATE',
  deleteUsers: 'USERS/DELETE',
  setUsers: 'USERS/SET',
  setUser: 'USERS/SET_ONE',
  filterUsers: 'USERS/FILTER',
  setFilteredUsers: 'USERS/SET_FILTERED_DATA'
};

export const createUsers = createAction(actions.createUsers);
export const fetchUsers = createAction(actions.fetchUsers);
export const updateUsers = createAction(actions.updateUsers);
export const deleteUsers = createAction(actions.deleteUsers);
export const filterUsers = createAction(actions.filterUsers);

const initialState = {
  users: [],
  filtered: [],
  loading: false
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
      }),
    [actions.filterUsers]: (state, { payload }) =>
      produce(state, draft => {
        draft.filtered = [];
        draft.loading = true;
      }),
    [actions.setFilteredUsers]: (state, { payload }) =>
      produce(state, draft => {
        draft.filtered = [...draft.filtered, ...payload];
        draft.loading = false;
      })
  },
  initialState
);
