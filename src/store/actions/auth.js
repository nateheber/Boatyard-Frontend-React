import { createAction } from 'redux-actions';


export const actionTypes = {
  AUTH_LOGIN: '[AUTH] - Log in',
  AUTH_LOGIN_SUCCESS: '[AUTH] - Log in Success',
  AUTH_LOGIN_FAILURE: '[AUTH] - Log in Failure',

  AUTH_SIGNUP: '[AUTH] - Sign up',
  AUTH_SIGNUP_SUCCESS: '[AUTH] - Sign up Success',
  AUTH_SIGNUP_FAILURE: '[AUTH] - Sign up Failure',

  GET_USER_PERMISSION: '[AUTH] - Get permission of user',
  GET_USER_PERMISSION_SUCCESS: '[AUTH] - Get permission of user Success',
  GET_USER_PERMISSION_FAILURE: '[AUTH] - Get permission of user Failure',

  SEND_RESET_REQUEST: '[AUTH] - Send request to reset password',
  SEND_RESET_REQUEST_SUCCESS: '[AUTH] - Send request to reset password Success',
  SEND_RESET_REQUEST_FAILURE: '[AUTH] - Send request to reset password Failure',

  RESET_PASSWORD: '[AUTH] - Reset password',
  RESET_PASSWORD_SUCCESS: '[AUTH] - Reset password Success',
  RESET_PASSWORD_FAILURE: '[AUTH] - Reset password Failure',

  SET_PROVIDER_INFO: '[AUTH] - Set provider token and info',
  SET_PRIVILEGE: '[AUTH] - Set privilege',

  SET_REFRESH_FLAG: '[AUTH] - Set flag to refresh page',
  SET_REFRESH_FLAG_SUCCESS: '[AUTH] - Set flag to refresh page Success',
  SET_REFRESH_FLAG_FAILURE: '[AUTH] - Set flag to refresh page Failure',
  
  AUTH_LOGOUT: '[AUTH] - Log out'
};

export const Login = createAction(actionTypes.AUTH_LOGIN, payload => payload);
export const LoginSuccess = createAction(actionTypes.AUTH_LOGIN_SUCCESS);
export const LoginFailure = createAction(actionTypes.AUTH_LOGIN_FAILURE);

export const Signup = createAction(actionTypes.AUTH_SIGNUP, payload => payload);
export const SignupSuccess = createAction(actionTypes.AUTH_SIGNUP_SUCCESS);
export const SignupFailure = createAction(actionTypes.AUTH_SIGNUP_FAILURE);

export const GetUserPermission = createAction(actionTypes.GET_USER_PERMISSION, payload => payload);
export const GetUserPermissionSuccess = createAction(actionTypes.GET_USER_PERMISSION_SUCCESS);
export const GetUserPermissionFailure = createAction(actionTypes.GET_USER_PERMISSION_FAILURE);

export const SendResetRequest = createAction(actionTypes.SEND_RESET_REQUEST, payload => payload);
export const SendResetRequestSuccess = createAction(actionTypes.SEND_RESET_REQUEST_SUCCESS);
export const SendResetRequestFailure = createAction(actionTypes.SEND_RESET_REQUEST_FAILURE);

export const ResetPassword = createAction(actionTypes.RESET_PASSWORD, payload => payload);
export const ResetPasswordSuccess = createAction(actionTypes.RESET_PASSWORD_SUCCESS);
export const ResetPasswordFailure = createAction(actionTypes.RESET_PASSWORD_FAILURE);

export const SetProviderInfo = createAction(actionTypes.SET_PROVIDER_INFO, payload => payload);
export const SetPrivilege = createAction(actionTypes.SET_PRIVILEGE, payload => payload);

export const SetRefreshFlag = createAction(actionTypes.SET_REFRESH_FLAG, payload => payload);
export const SetRefreshFlagSuccess = createAction(actionTypes.SET_REFRESH_FLAG_SUCCESS);
export const SetRefreshFlagFailure = createAction(actionTypes.SET_REFRESH_FLAG_FAILURE);

export const Logout = createAction(actionTypes.AUTH_LOGOUT, payload => payload);

