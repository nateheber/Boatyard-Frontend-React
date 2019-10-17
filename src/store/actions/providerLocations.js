import { createAction } from 'redux-actions';

export const actionTypes = {
  CREATE_PROVIDER_LOCATION: '[PROVIDER LOCATIONS] - Create Location',
  CREATE_PROVIDER_LOCATION_SUCCESS: '[PROVIDER LOCATIONS] - Create Location Success',
  CREATE_PROVIDER_LOCATION_FAILURE: '[PROVIDER LOCATIONS] - Create Location Failure',
  GET_PROVIDER_LOCATIONS: '[PROVIDER LOCATIONS] - Get Locations',
  GET_PROVIDER_LOCATIONS_SUCCESS: '[PROVIDER LOCATIONS] - Get Locations Success',
  GET_PROVIDER_LOCATIONS_FAILURE: '[PROVIDER LOCATIONS] - Get Locations Failure',
  GET_PROVIDER_LOCATION: '[PROVIDER LOCATIONS] - Get Location',
  GET_PROVIDER_LOCATION_SUCCESS: '[PROVIDER LOCATIONS] - Get Location Success',
  GET_PROVIDER_LOCATION_FAILURE: '[PROVIDER LOCATIONS] - Get Location Failure',
  GET_PROVIDER_LOCATION_SERVICES: '[PROVIDER LOCATIONS] - Get Location Services',
  GET_PROVIDER_LOCATION_SERVICES_SUCCESS: '[PROVIDER LOCATIONS] - Get Location Services Success',
  GET_PROVIDER_LOCATION_SERVICES_FAILURE: '[PROVIDER LOCATIONS] - Get Location Services Failure',
  FILTER_PROVIDER_LOCATIONS: '[PROVIDER LOCATIONS] - Filter Locations',
  FILTER_PROVIDER_LOCATIONS_SUCCESS: '[PROVIDER LOCATIONS] - Filter Locations Success',
  FILTER_PROVIDER_LOCATIONS_FAILURE: '[PROVIDER LOCATIONS] - Filter Locations Failure',
  UPDATE_PROVIDER_LOCATION: '[PROVIDER LOCATIONS] - Update Location',
  UPDATE_PROVIDER_LOCATION_SUCCESS: '[PROVIDER LOCATIONS] - Update Location Success',
  UPDATE_PROVIDER_LOCATION_FAILURE: '[PROVIDER LOCATIONS] - Update Location Failure',
  DELETE_PROVIDER_LOCATION: '[PROVIDER LOCATIONS] - Delete Provider Location',
  DELETE_PROVIDER_LOCATION_SUCCESS: '[PROVIDER LOCATIONS] - Delete Provider Location Success',
  DELETE_PROVIDER_LOCATION_FAILURE: '[PROVIDER LOCATIONS] - Delete Provider Location Failure',
};

export const CreateProviderLocation = createAction(actionTypes.CREATE_PROVIDER_LOCATION);
export const CreateProviderLocationSuccess = createAction(actionTypes.CREATE_PROVIDER_LOCATION_SUCCESS);
export const CreateProviderLocationFailure = createAction(actionTypes.CREATE_PROVIDER_LOCATION_FAILURE);

export const GetProviderLocations = createAction(actionTypes.GET_PROVIDER_LOCATIONS);
export const GetProviderLocationsSuccess = createAction(actionTypes.GET_PROVIDER_LOCATIONS_SUCCESS);
export const GetProviderLocationsFailure = createAction(actionTypes.GET_PROVIDER_LOCATIONS_FAILURE);

export const GetProviderLocation = createAction(actionTypes.GET_PROVIDER_LOCATION);
export const GetProviderLocationSuccess = createAction(actionTypes.GET_PROVIDER_LOCATION_SUCCESS);
export const GetProviderLocationFailure = createAction(actionTypes.GET_PROVIDER_LOCATION_FAILURE);

export const GetProviderLocationServices = createAction(actionTypes.GET_PROVIDER_LOCATION_SERVICES);
export const GetProviderLocationServicesSuccess = createAction(actionTypes.GET_PROVIDER_LOCATION_SERVICES_SUCCESS);
export const GetProviderLocationServicesFailure = createAction(actionTypes.GET_PROVIDER_LOCATION_SERVICES_FAILURE);

export const FilterProviderLocation = createAction(actionTypes.FILTER_PROVIDER_LOCATIONS);
export const FilterProviderLocationSuccess = createAction(actionTypes.FILTER_PROVIDER_LOCATIONS_SUCCESS);
export const FilterProviderLocationFailure = createAction(actionTypes.FILTER_PROVIDER_LOCATIONS_FAILURE);

export const UpdateProviderLocation = createAction(actionTypes.UPDATE_PROVIDER_LOCATION);
export const UpdateProviderLocationSuccess = createAction(actionTypes.UPDATE_PROVIDER_LOCATION_SUCCESS);
export const UpdateProviderLocationFailure = createAction(actionTypes.UPDATE_PROVIDER_LOCATION_FAILURE);

export const DeleteProviderLocation = createAction(actionTypes.DELETE_PROVIDER_LOCATION);
export const DeleteProviderLocationSuccess = createAction(actionTypes.DELETE_PROVIDER_LOCATION_SUCCESS);
export const DeleteProviderLocationFailure = createAction(actionTypes.DELETE_PROVIDER_LOCATION_FAILURE);
