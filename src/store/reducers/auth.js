import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  signup: 'AUTH/SIGNUP',
  login: 'AUTH/LOGIN',
  logout: 'AUTH/LOGOUT',
  setAuthState: 'AUTH/SET_AUTH_STATE',
  getUserPermission: 'AUTH/GET_USER_PERMISSION',
  setAdminToken: 'AUTH/SET_ADMIN_TOKEN',
  setProviderToken: 'AUTH/SET_PROVIDER_TOKEN',
  setPrevilage: 'AUTH/SET_PREVILAGE'
};

export const signup = createAction(actions.signup);
export const login = createAction(actions.login);
export const logout = createAction(actions.logout);

const initialState = {
  authToken: '',
  adminToken: '',
  providerToken: '',
  errorMessage: '',
  previlage: '',
  loading: false
};

export default handleActions(
  {
    [actions.setAuthState]: (
      state,
      { payload: { authToken, errorMessage, loading } }
    ) =>
      produce(state, draftState => {
        draftState.authToken = authToken;
        draftState.errorMessage = errorMessage;
        draftState.loading = loading;
      }),
    [actions.setAdminToken]: (state, { payload }) =>
      produce(state, draftState => {
        draftState.adminToken = payload;
      }),
    [actions.setProviderToken]: (state, { payload }) =>
      produce(state, draftState => {
        draftState.providerToken = payload;
      }),
    [actions.setPrevilage]: (state, { payload }) =>
      produce(state, draftState => {
        draftState.previlage = payload;
      }),
    [actions.logout]: () => ({
      ...initialState
    })
  },
  initialState
);
