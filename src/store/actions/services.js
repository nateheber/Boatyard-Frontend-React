import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_SERVICES: '[SERVICES] - Get services',
  GET_SERVICES_SUCCESS: '[SERVICES] - Get services Success',
  GET_SERVICES_FAILURE: '[SERVICES] - Get services Failure',

  GET_ALL_SERVICES: '[SERVICES] - Get all services',
  GET_ALL_SERVICES_SUCCESS: '[SERVICES] - Get all services Success',
  GET_ALL_SERVICES_FAILURE: '[SERVICES] - Get all services Failure',

  FILTER_SERVICES: '[SERVICES] - Filter services',
  FILTER_SERVICES_SUCCESS: '[SERVICES] - Filter services Success',
  FILTER_SERVICES_FAILURE: '[SERVICES] - Filter services Failure',

  FILTER_ALL_SERVICES: '[SERVICES] - Filter all services',
  FILTER_ALL_SERVICES_SUCCESS: '[SERVICES] - Filter all services Success',
  FILTER_ALL_SERVICES_FAILURE: '[SERVICES] - Filter all services Failure',

  GET_SERVICE: '[SERVICES] - Get service',
  GET_SERVICE_SUCCESS: '[SERVICES] - Get service Success',
  GET_SERVICE_FAILURE: '[SERVICES] - Get service Failure',

  CREATE_SERVICE: '[SERVICES] - Create new service',
  CREATE_SERVICE_SUCCESS: '[SERVICES] - Create new service Success',
  CREATE_SERVICE_FAILURE: '[SERVICES] - Create new service Failure',

  UPDATE_SERVICE: '[SERVICES] - Update service',
  UPDATE_SERVICE_SUCCESS: '[SERVICES] - Update Success',
  UPDATE_SERVICE_FAILURE: '[SERVICES] - Update service Failure',

  DELETE_SERVICE: '[SERVICES] - Delete service',
  DELETE_SERVICE_SUCCESS: '[SERVICES] - Delete service Success',
  DELETE_SERVICE_FAILURE: '[SERVICES] - Delete service Failure'
};

export const GetServices = createAction(actionTypes.GET_SERVICES, payload => payload);
export const GetServicesSuccess = createAction(actionTypes.GET_SERVICES_SUCCESS);
export const GetServicesFailure = createAction(actionTypes.GET_SERVICES_FAILURE);

export const GetAllServices = createAction(actionTypes.GET_ALL_SERVICES, payload => payload);
export const GetAllServicesSuccess = createAction(actionTypes.GET_ALL_SERVICES_SUCCESS);
export const GetAllServicesFailure = createAction(actionTypes.GET_ALL_SERVICES_FAILURE);

export const FilterServices = createAction(actionTypes.FILTER_SERVICES, payload => payload);
export const FilterServicesSuccess = createAction(actionTypes.FILTER_SERVICES_SUCCESS);
export const FilterServicesFailure = createAction(actionTypes.FILTER_SERVICES_FAILURE);

export const GetService = createAction(actionTypes.GET_SERVICE, payload => payload);
export const GetServiceSuccess = createAction(actionTypes.GET_SERVICE_SUCCESS);
export const GetServiceFailure = createAction(actionTypes.GET_SERVICE_FAILURE);

export const CreateService = createAction(actionTypes.CREATE_SERVICE, payload => payload);
export const CreateServiceSuccess = createAction(actionTypes.CREATE_SERVICE_SUCCESS);
export const CreateServiceFailure = createAction(actionTypes.CREATE_SERVICE_FAILURE);

export const UpdateService = createAction(actionTypes.UPDATE_SERVICE, payload => payload);
export const UpdateServiceSuccess = createAction(actionTypes.UPDATE_SERVICE_SUCCESS);
export const UpdateServiceFailure = createAction(actionTypes.UPDATE_SERVICE_FAILURE);

export const DeleteService = createAction(actionTypes.DELETE_SERVICE, payload => payload);
export const DeleteServiceSuccess = createAction(actionTypes.DELETE_SERVICE_SUCCESS);
export const DeleteServiceFailure = createAction(actionTypes.DELETE_SERVICE_FAILURE);
