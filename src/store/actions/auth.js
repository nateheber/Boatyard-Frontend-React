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

  SET_ADMIN_TOKEN: '[AUTH] - Set admin token',
  SET_PROVIDER_TOKEN: '[AUTH] - Set provider token',
  SET_PRIVILEGE: '[AUTH] - Set privilege',
  
  AUTH_LOGOUT: '[AUTH] - Log out',
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

export const SetAdminToken = createAction(actionTypes.SET_ADMIN_TOKEN, payload => payload);
export const SetProviderToken = createAction(actionTypes.SET_PROVIDER_TOKEN, payload => payload);
export const SetPrivilege = createAction(actionTypes.SET_PRIVILEGE, payload => payload);
export const Logout = createAction(actionTypes.AUTH_LOGOUT, payload => payload);

