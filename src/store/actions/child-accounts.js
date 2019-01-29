import { createAction } from 'redux-actions';


export const actionTypes = {
  GET_CHILD_ACCOUNTS: '[CHILDACCOUNTS] - Get childAccounts',
  GET_CHILD_ACCOUNTS_SUCCESS: '[CHILDACCOUNTS] - Get childAccounts Success',
  GET_CHILD_ACCOUNTS_FAILURE: '[CHILDACCOUNTS] - Get childAccounts Failure',

  FILTER_CHILD_ACCOUNTS: '[CHILDACCOUNTS] - Filter childAccounts',
  FILTER_CHILD_ACCOUNTS_SUCCESS: '[CHILDACCOUNTS] - Filter childAccounts Success',
  FILTER_CHILD_ACCOUNTS_FAILURE: '[CHILDACCOUNTS] - Filter childAccounts Failure',

  GET_CHILD_ACCOUNT: '[CHILDACCOUNTS] - Get childAccount',
  GET_CHILD_ACCOUNT_SUCCESS: '[CHILDACCOUNTS] - Get childAccount Success',
  GET_CHILD_ACCOUNT_FAILURE: '[CHILDACCOUNTS] - Get childAccount Failure',

  CREATE_CHILD_ACCOUNT: '[CHILDACCOUNTS] - Create new childAccount',
  CREATE_CHILD_ACCOUNT_SUCCESS: '[CHILDACCOUNTS] - Create new childAccount Success',
  CREATE_CHILD_ACCOUNT_FAILURE: '[CHILDACCOUNTS] - Create new childAccount Failure',

  UPDATE_CHILD_ACCOUNT: '[CHILDACCOUNTS] - Update childAccount',
  UPDATE_CHILD_ACCOUNT_SUCCESS: '[CHILDACCOUNTS] - Update Success',
  UPDATE_CHILD_ACCOUNT_FAILURE: '[CHILDACCOUNTS] - Update childAccount Failure',

  DELETE_CHILD_ACCOUNT: '[CHILDACCOUNTS] - Delete childAccount',
  DELETE_CHILD_ACCOUNT_SUCCESS: '[CHILDACCOUNTS] - Delete childAccount Success',
  DELETE_CHILD_ACCOUNT_FAILURE: '[CHILDACCOUNTS] - Delete childAccount Failure'
};

export const GetChildAccounts = createAction(actionTypes.GET_CHILD_ACCOUNTS, payload => payload);
export const GetChildAccountsSuccess = createAction(actionTypes.GET_CHILD_ACCOUNTS_SUCCESS);
export const GetChildAccountsFailure = createAction(actionTypes.GET_CHILD_ACCOUNTS_FAILURE);

export const FilterChildAccounts = createAction(actionTypes.FILTER_CHILD_ACCOUNTS, payload => payload);
export const FilterChildAccountsSuccess = createAction(actionTypes.FILTER_CHILD_ACCOUNTS_SUCCESS);
export const FilterChildAccountsFailure = createAction(actionTypes.FILTER_CHILD_ACCOUNTS_FAILURE);

export const GetChildAccount = createAction(actionTypes.GET_CHILD_ACCOUNT, payload => payload);
export const GetChildAccountSuccess = createAction(actionTypes.GET_CHILD_ACCOUNT_SUCCESS);
export const GetChildAccountFailure = createAction(actionTypes.GET_CHILD_ACCOUNT_FAILURE);

export const CreateChildAccount = createAction(actionTypes.CREATE_CHILD_ACCOUNT, payload => payload);
export const CreateChildAccountSuccess = createAction(actionTypes.CREATE_CHILD_ACCOUNT_SUCCESS);
export const CreateChildAccountFailure = createAction(actionTypes.CREATE_CHILD_ACCOUNT_FAILURE);

export const UpdateChildAccount = createAction(actionTypes.UPDATE_CHILD_ACCOUNT, payload => payload);
export const UpdateChildAccountSuccess = createAction(actionTypes.UPDATE_CHILD_ACCOUNT_SUCCESS);
export const UpdateChildAccountFailure = createAction(actionTypes.UPDATE_CHILD_ACCOUNT_FAILURE);

export const DeleteChildAccount = createAction(actionTypes.DELETE_CHILD_ACCOUNT, payload => payload);
export const DeleteChildAccountSuccess = createAction(actionTypes.DELETE_CHILD_ACCOUNT_SUCCESS);
export const DeleteChildAccountFailure = createAction(actionTypes.DELETE_CHILD_ACCOUNT_FAILURE);
