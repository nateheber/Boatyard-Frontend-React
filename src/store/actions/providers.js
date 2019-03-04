import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_PROVIDERS: '[PROVIDERS] - Get providers',
  GET_PROVIDERS_SUCCESS: '[PROVIDERS] - Get providers Success',
  GET_PROVIDERS_FAILURE: '[PROVIDERS] - Get providers Failure',

  FILTER_PROVIDERS: '[PROVIDERS] - Filter providers',
  FILTER_PROVIDERS_SUCCESS: '[PROVIDERS] - Filter providers Success',
  FILTER_PROVIDERS_FAILURE: '[PROVIDERS] - Filter providers Failure',

  GET_PREFERRED_PROVIDERS: '[PROVIDERS] - Get preferred providers',
  GET_PREFERRED_PROVIDERS_SUCCESS: '[PROVIDERS] - Get preferred providers Success',
  GET_PREFERRED_PROVIDERS_FAILURE: '[PROVIDERS] - Get preferred providers Failure',

  LOGIN_WITH_PROVIDER: '[PROVIDERS] - Login with provider',
  LOGIN_WITH_PROVIDER_SUCCESS: '[PROVIDERS] - Login with provider Success',
  LOGIN_WITH_PROVIDER_FAILURE: '[PROVIDERS] - Login with provider Failure',

  GET_PROVIDER: '[PROVIDERS] - Get provider',
  GET_PROVIDER_SUCCESS: '[PROVIDERS] - Get provider Success',
  GET_PROVIDER_FAILURE: '[PROVIDERS] - Get provider Failure',

  CREATE_PROVIDER: '[PROVIDERS] - Create new provider',
  CREATE_PROVIDER_SUCCESS: '[PROVIDERS] - Create new provider Success',
  CREATE_PROVIDER_FAILURE: '[PROVIDERS] - Create new provider Failure',

  ADD_PREFERRED_PROVIDER: '[PROVIDERS] - Add preferred provider',
  ADD_PREFERRED_PROVIDER_SUCCESS: '[PROVIDERS] - Add preferred provider Success',
  ADD_PREFERRED_PROVIDER_FAILURE: '[PROVIDERS] - Add preferred provider Failure',

  UPDATE_PROVIDER: '[PROVIDERS] - Update provider',
  UPDATE_PROVIDER_SUCCESS: '[PROVIDERS] - Update Success',
  UPDATE_PROVIDER_FAILURE: '[PROVIDERS] - Update provider Failure',

  DELETE_PROVIDER: '[PROVIDERS] - Delete provider',
  DELETE_PROVIDER_SUCCESS: '[PROVIDERS] - Delete provider Success',
  DELETE_PROVIDER_FAILURE: '[PROVIDERS] - Delete provider Failure',

  DELETE_PREFERRED_PROVIDER: '[PROVIDERS] - Delete preferred provider',
  DELETE_PREFERRED_PROVIDER_SUCCESS: '[PROVIDERS] - Delete preferred provider Success',
  DELETE_PREFERRED_PROVIDER_FAILURE: '[PROVIDERS] - Delete preferred provider Failure'
};

export const GetProviders = createAction(actionTypes.GET_PROVIDERS, payload => payload);
export const GetProvidersSuccess = createAction(actionTypes.GET_PROVIDERS_SUCCESS);
export const GetProvidersFailure = createAction(actionTypes.GET_PROVIDERS_FAILURE);

export const FilterProviders = createAction(actionTypes.FILTER_PROVIDERS, payload => payload);
export const FilterProvidersSuccess = createAction(actionTypes.FILTER_PROVIDERS_SUCCESS);
export const FilterProvidersFailure = createAction(actionTypes.FILTER_PROVIDERS_FAILURE);

export const GetPreferredProviders = createAction(actionTypes.GET_PREFERRED_PROVIDERS, payload => payload);
export const GetPreferredProvidersSuccess = createAction(actionTypes.GET_PREFERRED_PROVIDERS_SUCCESS);
export const GetPreferredProvidersFailure = createAction(actionTypes.GET_PREFERRED_PROVIDERS_FAILURE);

export const LoginWithProvider = createAction(actionTypes.LOGIN_WITH_PROVIDER, payload => payload);
export const LoginWithProviderSuccess = createAction(actionTypes.LOGIN_WITH_PROVIDER_SUCCESS);
export const LoginWithProviderFailure = createAction(actionTypes.LOGIN_WITH_PROVIDER_FAILURE);

export const GetProvider = createAction(actionTypes.GET_PROVIDER, payload => payload);
export const GetProviderSuccess = createAction(actionTypes.GET_PROVIDER_SUCCESS);
export const GetProviderFailure = createAction(actionTypes.GET_PROVIDER_FAILURE);

export const CreateProvider = createAction(actionTypes.CREATE_PROVIDER, payload => payload);
export const CreateProviderSuccess = createAction(actionTypes.CREATE_PROVIDER_SUCCESS);
export const CreateProviderFailure = createAction(actionTypes.CREATE_PROVIDER_FAILURE);

export const AddPreferredProvider = createAction(actionTypes.ADD_PREFERRED_PROVIDER, payload => payload);
export const AddPreferredProviderSuccess = createAction(actionTypes.ADD_PREFERRED_PROVIDER_SUCCESS);
export const AddPreferredProviderFailure = createAction(actionTypes.ADD_PREFERRED_PROVIDER_FAILURE);

export const UpdateProvider = createAction(actionTypes.UPDATE_PROVIDER, payload => payload);
export const UpdateProviderSuccess = createAction(actionTypes.UPDATE_PROVIDER_SUCCESS);
export const UpdateProviderFailure = createAction(actionTypes.UPDATE_PROVIDER_FAILURE);

export const DeleteProvider = createAction(actionTypes.DELETE_PROVIDER, payload => payload);
export const DeleteProviderSuccess = createAction(actionTypes.DELETE_PROVIDER_SUCCESS);
export const DeleteProviderFailure = createAction(actionTypes.DELETE_PROVIDER_FAILURE);

export const DeletePreferredProvider = createAction(actionTypes.DELETE_PREFERRED_PROVIDER, payload => payload);
export const DeletePreferredProviderSuccess = createAction(actionTypes.DELETE_PREFERRED_PROVIDER_SUCCESS);
export const DeletePreferredProviderFailure = createAction(actionTypes.DELETE_PREFERRED_PROVIDER_FAILURE);
