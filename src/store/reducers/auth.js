import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from '../actions/auth';
import { get } from 'lodash';

const initialState = {
  currentStatus: '',
  authToken: '',
  adminToken: '',
  providerToken: '',
  providerLocationToken: '',
  isLocationAdmin: false,
  isAdmin: false,
  errors: null,
  privilege: '',
  providerId: '',
  providerLocationId: '',
  providerLocations: [],
  taxRate: '',
  refreshPage: false,
  locationName: '',
};

export default handleActions(
  {
    [actionTypes.AUTH_LOGIN_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.authToken = payload;
      }),
    [actionTypes.CREATE_PASSWORD_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.authToken = payload;
      }),
    [actionTypes.CREATE_PASSWORD_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.CREATE_CUSTOMER_PASSWORD_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.CREATE_CUSTOMER_PASSWORD_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
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
    [actionTypes.SET_PROVIDER_LOCATIONS]: (state, action) =>
      produce(state, draft => {
        const { payload: {providerLocations} } = action;
        draft.providerLocations = providerLocations;
        draft.errors = null;
      }),
    [actionTypes.SET_PRIVILEGE]: (state, action) =>
      produce(state, draft => {
        const { type, payload: {privilege, isLocationAdmin, providerLocationId, locationName} } = action;
        draft.currentStatus = type;
        draft.privilege = privilege;
        draft.isLocationAdmin = isLocationAdmin;
        draft.locationName = locationName;
        draft.providerLocationId = providerLocationId;
        draft.errors = null;
      }),
    [actionTypes.SET_ADMIN]: (state, action) =>
      produce(state, draft => {
        const { payload: {isAdmin} } = action;
        draft.isAdmin = isAdmin;
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
    }),
    [actionTypes.SET_REFRESH_FLAG_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.refreshPage = payload;
        draft.errors = null;
      }),
    [actionTypes.SET_REFRESH_FLAG_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      })
  },
  initialState
);
