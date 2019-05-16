import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from '../actions/auth';
import { get } from 'lodash';

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
        const { id, attributes: { taxRate }} = payload;
        const authorizationToken = get(payload, 'attributes.authorizationToken');
        draft.currentStatus = type;
        if (authorizationToken) {
          draft.providerToken = authorizationToken;
        }
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
    [actionTypes.SEND_RESET_REQUEST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.SEND_RESET_REQUEST_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.RESET_PASSWORD_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.RESET_PASSWORD_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.AUTH_LOGOUT]: () => ({
      ...initialState
    })
  },
  initialState
);
