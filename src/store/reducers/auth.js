import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from '../actions/auth';

const initialState = {
  currentStatus: '',
  authToken: '',
  adminToken: '',
  providerToken: '',
  errors: '',
  privilege: '',
  loading: false
};

export default handleActions(
  {
    [actionTypes.AUTH_LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.authToken = payload;
      }),
    [actionTypes.AUTH_LOGIN_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.SET_ADMIN_TOKEN]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.adminToken = payload;
        draft.errors = null;
      }),
    [actionTypes.SET_PROVIDER_TOKEN]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.providerToken = payload;
        draft.errors = null;
      }),
    [actionTypes.SET_PRIVILEGE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.privilege = payload;
        draft.errors = null;
      }),
    [actionTypes.AUTH_LOGOUT]: () => ({
      ...initialState
    })
  },
  initialState
);
