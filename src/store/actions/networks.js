import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_NETWORKS: '[NETWORKS] - Get networks',
  GET_NETWORKS_SUCCESS: '[NETWORKS] - Get networks Success',
  GET_NETWORKS_FAILURE: '[NETWORKS] - Get networks Failure',

  GET_NETWORK: '[NETWORKS] - Get network',
  GET_NETWORK_SUCCESS: '[NETWORKS] - Get network Success',
  GET_NETWORK_FAILURE: '[NETWORKS] - Get network Failure',

  CREATE_NETWORK: '[NETWORKS] - Create new network',
  CREATE_NETWORK_SUCCESS: '[NETWORKS] - Create new network Success',
  CREATE_NETWORK_FAILURE: '[NETWORKS] - Create new network Failure',

  UPDATE_NETWORK: '[NETWORKS] - Update network',
  UPDATE_NETWORK_SUCCESS: '[NETWORKS] - Update Success',
  UPDATE_NETWORK_FAILURE: '[NETWORKS] - Update network Failure',

  DELETE_NETWORK: '[NETWORKS] - Delete network',
  DELETE_NETWORK_SUCCESS: '[NETWORKS] - Delete network Success',
  DELETE_NETWORK_FAILURE: '[NETWORKS] - Delete network Failure'
};

export const GetNetworks = createAction(actionTypes.GET_NETWORKS, payload => payload);
export const GetNetworksSuccess = createAction(actionTypes.GET_NETWORKS_SUCCESS);
export const GetNetworksFailure = createAction(actionTypes.GET_NETWORKS_FAILURE);

export const GetNetwork = createAction(actionTypes.GET_NETWORK, payload => payload);
export const GetNetworkSuccess = createAction(actionTypes.GET_NETWORK_SUCCESS);
export const GetNetworkFailure = createAction(actionTypes.GET_NETWORK_FAILURE);

export const CreateNetwork = createAction(actionTypes.CREATE_NETWORK, payload => payload);
export const CreateNetworkSuccess = createAction(actionTypes.CREATE_NETWORK_SUCCESS);
export const CreateNetworkFailure = createAction(actionTypes.CREATE_NETWORK_FAILURE);

export const UpdateNetwork = createAction(actionTypes.UPDATE_NETWORK, payload => payload);
export const UpdateNetworkSuccess = createAction(actionTypes.UPDATE_NETWORK_SUCCESS);
export const UpdateNetworkFailure = createAction(actionTypes.UPDATE_NETWORK_FAILURE);

export const DeleteNetwork = createAction(actionTypes.DELETE_NETWORK, payload => payload);
export const DeleteNetworkSuccess = createAction(actionTypes.DELETE_NETWORK_SUCCESS);
export const DeleteNetworkFailure = createAction(actionTypes.DELETE_NETWORK_FAILURE);
