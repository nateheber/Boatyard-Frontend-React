import { createAction } from 'redux-actions';


export const actionTypes = {
  GET_MANAGEMENTS: '[MANAGEMENTS] - Get managements',
  GET_MANAGEMENTS_SUCCESS: '[MANAGEMENTS] - Get managements Success',
  GET_MANAGEMENTS_FAILURE: '[MANAGEMENTS] - Get managements Failure',

  GET_MANAGEMENT: '[MANAGEMENTS] - Get management',
  GET_MANAGEMENT_SUCCESS: '[MANAGEMENTS] - Get management Success',
  GET_MANAGEMENT_FAILURE: '[MANAGEMENTS] - Get management Failure',

  CREATE_MANAGEMENT: '[MANAGEMENTS] - Create new management',
  CREATE_MANAGEMENT_SUCCESS: '[MANAGEMENTS] - Create new management Success',
  CREATE_MANAGEMENT_FAILURE: '[MANAGEMENTS] - Create new management Failure',

  UPDATE_MANAGEMENT: '[MANAGEMENTS] - Update management',
  UPDATE_MANAGEMENT_SUCCESS: '[MANAGEMENTS] - Update management Success',
  UPDATE_MANAGEMENT_FAILURE: '[MANAGEMENTS] - Update management Failure',

  DELETE_MANAGEMENT: '[MANAGEMENTS] - Delete management',
  DELETE_MANAGEMENT_SUCCESS: '[MANAGEMENTS] - Delete management Success',
  DELETE_MANAGEMENT_FAILURE: '[MANAGEMENTS] - Delete management Failure'
};

export const GetManagements = createAction(actionTypes.GET_MANAGEMENTS, payload => payload);
export const GetManagementsSuccess = createAction(actionTypes.GET_MANAGEMENTS_SUCCESS);
export const GetManagementsFailure = createAction(actionTypes.GET_MANAGEMENTS_FAILURE);

export const GetManagement = createAction(actionTypes.GET_MANAGEMENT, payload => payload);
export const GetManagementSuccess = createAction(actionTypes.GET_MANAGEMENT_SUCCESS);
export const GetManagementFailure = createAction(actionTypes.GET_MANAGEMENT_FAILURE);

export const CreateManagement = createAction(actionTypes.CREATE_MANAGEMENT, payload => payload);
export const CreateManagementSuccess = createAction(actionTypes.CREATE_MANAGEMENT_SUCCESS);
export const CreateManagementFailure = createAction(actionTypes.CREATE_MANAGEMENT_FAILURE);

export const UpdateManagement = createAction(actionTypes.UPDATE_MANAGEMENT, payload => payload);
export const UpdateManagementSuccess = createAction(actionTypes.UPDATE_MANAGEMENT_SUCCESS);
export const UpdateManagementFailure = createAction(actionTypes.UPDATE_MANAGEMENT_FAILURE);

export const DeleteManagement = createAction(actionTypes.DELETE_MANAGEMENT, payload => payload);
export const DeleteManagementSuccess = createAction(actionTypes.DELETE_MANAGEMENT_SUCCESS);
export const DeleteManagementFailure = createAction(actionTypes.DELETE_MANAGEMENT_FAILURE);
