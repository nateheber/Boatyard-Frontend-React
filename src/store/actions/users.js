import { createAction } from 'redux-actions';


export const actionTypes = {
  GET_USERS: '[USERS] - Get users',
  GET_USERS_SUCCESS: '[USERS] - Get users Success',
  GET_USERS_FAILURE: '[USERS] - Get users Failure',

  FILTER_USERS: '[USERS] - Filter users',
  FILTER_USERS_SUCCESS: '[USERS] - Filter users Success',
  FILTER_USERS_FAILURE: '[USERS] - Filter users Failure',

  GET_USER: '[USERS] - Get user',
  GET_USER_SUCCESS: '[USERS] - Get user Success',
  GET_USER_FAILURE: '[USERS] - Get user Failure',

  CREATE_USER: '[USERS] - Create new user',
  CREATE_USER_SUCCESS: '[USERS] - Create new user Success',
  CREATE_USER_FAILURE: '[USERS] - Create new user Failure',

  UPDATE_USER: '[USERS] - Update user',
  UPDATE_USER_SUCCESS: '[USERS] - Update Success',
  UPDATE_USER_FAILURE: '[USERS] - Update user Failure',

  DELETE_USER: '[USERS] - Delete user',
  DELETE_USER_SUCCESS: '[USERS] - Delete user Success',
  DELETE_USER_FAILURE: '[USERS] - Delete user Failure',
  
  FILTER_EXTERNAL_CUSTOMERS: '[USERS] - Filter external connections',
};

export const GetUsers = createAction(actionTypes.GET_USERS, payload => payload);
export const GetUsersSuccess = createAction(actionTypes.GET_USERS_SUCCESS);
export const GetUsersFailure = createAction(actionTypes.GET_USERS_FAILURE);

export const FilterUsers = createAction(actionTypes.FILTER_USERS, payload => payload);
export const FilterUsersSuccess = createAction(actionTypes.FILTER_USERS_SUCCESS);
export const FilterUsersFailure = createAction(actionTypes.FILTER_USERS_FAILURE);

export const GetUser = createAction(actionTypes.GET_USER, payload => payload);
export const GetUserSuccess = createAction(actionTypes.GET_USER_SUCCESS);
export const GetUserFailure = createAction(actionTypes.GET_USER_FAILURE);

export const CreateUser = createAction(actionTypes.CREATE_USER, payload => payload);
export const CreateUserSuccess = createAction(actionTypes.CREATE_USER_SUCCESS);
export const CreateUserFailure = createAction(actionTypes.CREATE_USER_FAILURE);

export const UpdateUser = createAction(actionTypes.UPDATE_USER, payload => payload);
export const UpdateUserSuccess = createAction(actionTypes.UPDATE_USER_SUCCESS);
export const UpdateUserFailure = createAction(actionTypes.UPDATE_USER_FAILURE);

export const DeleteUser = createAction(actionTypes.DELETE_USER, payload => payload);
export const DeleteUserSuccess = createAction(actionTypes.DELETE_USER_SUCCESS);
export const DeleteUserFailure = createAction(actionTypes.DELETE_USER_FAILURE);

export const FilterExternalConnections = createAction(actionTypes.FILTER_EXTERNAL_CUSTOMERS, payload => payload);