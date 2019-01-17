import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get } from 'lodash';

export const actions = {
  createUsers: 'USERS/CREATE',
  fetchUsers: 'USERS/FETCH',
  fetchUser: 'USERS/FETCH_ONE',
  resetUsers: 'USERS/RESET_USERS',
  updateUsers: 'USERS/UPDATE',
  deleteUsers: 'USERS/DELETE',
  setUsers: 'USERS/SET',
  setUser: 'USERS/SET_ONE',
  filterUsers: 'USERS/FILTER',
  setFilteredUsers: 'USERS/SET_FILTERED_DATA'
};

export const createUsers = createAction(actions.createUsers);
export const fetchUsers = createAction(actions.fetchUsers);
export const fetchUser = createAction(actions.fetchUser);
export const resetusers = createAction(actions.resetUsers);
export const updateUsers = createAction(actions.updateUsers);
export const deleteUsers = createAction(actions.deleteUsers);
export const filterUsers = createAction(actions.filterUsers);

const initialState = {
  users: [],
  filtered: [],
  currentUser: [],
  loading: false,
  page: 0,
  perPage: 20,
  total: 0,
};

export default handleActions(
  {
    [actions.fetchUsers]: (state, { payload }) =>
      produce(state, draft => {
        if (payload) {
          draft.page = payload.page;
        } else {
          draft.page = draft.page === 0 ? 1 : draft.page;
        }
        draft.loading = true;
      }),
    [actions.resetUsers]: state =>
      produce(state, draft => {
        draft.users = [];
        draft.page = 1;
        draft.perPage = 20;
        draft.total = 0;
      }),
    [actions.setUsers]: (state, { payload }) =>
      produce(state, draft => {
        const { total, perPage, users } = payload;
        draft.total = total;
        draft.perPage = perPage;
        draft.users = users;
      }),
    [actions.setUser]: (state, { payload }) =>
      produce(state, draft => {
        draft.currentUser = payload
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
