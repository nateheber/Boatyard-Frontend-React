import { createAction, handleActions } from 'redux-actions';

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
  loading: false,
  email: '',
  firstName: '',
  lastName: ''
};

export default handleActions(
  {
    [actions.setAuthState]: (
      state,
      {
        payload: {
          authToken,
          errorMessage,
          loading,
          email,
          firstName,
          lastName
        }
      }
    ) => ({
      ...state,
      authToken,
      email,
      firstName,
      lastName,
      errorMessage,
      loading
    })
  },
  initialState
);
