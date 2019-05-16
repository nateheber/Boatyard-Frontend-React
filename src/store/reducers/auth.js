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
  providerId: '',
  taxRate: ''
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
    [actionTypes.GET_USER_PERMISSION_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.adminToken = payload;
        draft.errors = null;
      }),
    [actionTypes.GET_USER_PERMISSION_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.SET_PROVIDER_INFO]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { id, attributes: { authorizationToken, taxRate }} = payload;
        draft.currentStatus = type;
        draft.providerToken = authorizationToken;
        draft.providerId = id;
        draft.taxRate = taxRate;
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
