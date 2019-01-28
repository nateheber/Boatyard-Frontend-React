import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_BOATS: '[BOATS] - Get boats',
  GET_BOATS_SUCCESS: '[BOATS] - Get boats Success',
  GET_BOATS_FAILURE: '[BOATS] - Get boats Failure',

  GET_BOAT: '[BOATS] - Get boat',
  GET_BOAT_SUCCESS: '[BOATS] - Get boat Success',
  GET_BOAT_FAILURE: '[BOATS] - Get boat Failure',

  CREATE_BOAT: '[BOATS] - Create new boat',
  CREATE_BOAT_SUCCESS: '[BOATS] - Create new boat Success',
  CREATE_BOAT_FAILURE: '[BOATS] - Create new boat Failure',

  UPDATE_BOAT: '[BOATS] - Update boat',
  UPDATE_BOAT_SUCCESS: '[BOATS] - Update Success',
  UPDATE_BOAT_FAILURE: '[BOATS] - Update boat Failure',

  DELETE_BOAT: '[BOATS] - Delete boat',
  DELETE_BOAT_SUCCESS: '[BOATS] - Delete boat Success',
  DELETE_BOAT_FAILURE: '[BOATS] - Delete boat Failure'
};

export const GetBoats = createAction(actionTypes.GET_BOATS, payload => payload);
export const GetBoatsSuccess = createAction(actionTypes.GET_BOATS_SUCCESS);
export const GetBoatsFailure = createAction(actionTypes.GET_BOATS_FAILURE);

export const GetBoat = createAction(actionTypes.GET_BOAT, payload => payload);
export const GetBoatSuccess = createAction(actionTypes.GET_BOAT_SUCCESS);
export const GetBoatFailure = createAction(actionTypes.GET_BOAT_FAILURE);

export const CreateBoat = createAction(actionTypes.CREATE_BOAT, payload => payload);
export const CreateBoatSuccess = createAction(actionTypes.CREATE_BOAT_SUCCESS);
export const CreateBoatFailure = createAction(actionTypes.CREATE_BOAT_FAILURE);

export const UpdateBoat = createAction(actionTypes.UPDATE_BOAT, payload => payload);
export const UpdateBoatSuccess = createAction(actionTypes.UPDATE_BOAT_SUCCESS);
export const UpdateBoatFailure = createAction(actionTypes.UPDATE_BOAT_FAILURE);

export const DeleteBoat = createAction(actionTypes.DELETE_BOAT, payload => payload);
export const DeleteBoatSuccess = createAction(actionTypes.DELETE_BOAT_SUCCESS);
export const DeleteBoatFailure = createAction(actionTypes.DELETE_BOAT_FAILURE);
