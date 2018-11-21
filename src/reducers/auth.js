import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  signup: 'AUTH/SIGNUP',
  login: 'AUTH/LOGIN',
  logout: 'AUTH/LOGOUT',
  setAuthState: 'AUTH/SET_AUTH_STATE'
};

export const signup = createAction(actions.signup);
export const login = createAction(actions.login);
export const logout = createAction(actions.logout);

const initialState = {
  authToken: '',
  errorMessage: '',
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
    [actions.logout]: () => ({
      ...initialState
    })
  },
  initialState
);
