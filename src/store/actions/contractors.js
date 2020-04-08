import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_CONTRACTORS: '[CONTRACTORS] - Get contractors',
  GET_CONTRACTORS_SUCCESS: '[CONTRACTORS] - Get contractors success',
  GET_CONTRACTORS_FAILURE: '[CONTRACTORS] - Get contractors failure',

  GET_CONTRACTOR: '[CONTRACTORS] - Get contractor',
  GET_CONTRACTOR_SUCCESS: '[CONTRACTORS] - Get contractor success',
  GET_CONTRACTOR_FAILURE: '[CONTRACTORS] - Get contractor failure',

  CREATE_CONTRACTOR: '[CONTRACTORS] - Create contractor',
  CREATE_CONTRACTOR_SUCCESS: '[CONTRACTORS] - Create contractor success',
  CREATE_CONTRACTOR_FAILURE: '[CONTRACTORS] - Create contractor failure',

  UPDATE_CONTRACTOR: '[CONTRACTORS] - Update contractor',
  UPDATE_CONTRACTOR_SUCCESS: '[CONTRACTORS] - Update contractor success',
  UPDATE_CONTRACTOR_FAILURE: '[CONTRACTORS] - Update contractor failure',

  DELETE_CONTRACTOR: '[CONTRACTORS] - Delete contractor',
  DELETE_CONTRACTOR_SUCCESS: '[CONTRACTORS] - Delete contractor success',
  DELETE_CONTRACTOR_FAILURE: '[CONTRACTORS] - Delete contractor failure',
};

export const GetContractors = createAction(actionTypes.GET_CONTRACTORS, payload => payload);
export const GetContractorsSuccess = createAction(actionTypes.GET_CONTRACTORS_SUCCESS, payload => payload);
export const GetContractorsFailure = createAction(actionTypes.GET_CONTRACTORS_FAILURE, payload => payload);

export const GetContractor = createAction(actionTypes.GET_CONTRACTOR, payload => payload);
export const GetContractorSuccess = createAction(actionTypes.GET_CONTRACTOR_SUCCESS);
export const GetContractorFailure = createAction(actionTypes.GET_CONTRACTOR_FAILURE);

export const CreateContractor = createAction(actionTypes.CREATE_CONTRACTOR, payload => payload);
export const CreateContractorSuccess = createAction(actionTypes.CREATE_CONTRACTOR_SUCCESS);
export const CreateContractorFailure = createAction(actionTypes.CREATE_CONTRACTOR_FAILURE);

export const UpdateContractor = createAction(actionTypes.UPDATE_CONTRACTOR, payload => payload);
export const UpdateContractorSuccess = createAction(actionTypes.UPDATE_CONTRACTOR_SUCCESS);
export const UpdateContractorFailure = createAction(actionTypes.UPDATE_CONTRACTOR_FAILURE);

export const DeleteContractor = createAction(actionTypes.DELETE_CONTRACTOR, payload => payload);
export const DeleteContractorSuccess = createAction(actionTypes.DELETE_CONTRACTOR_SUCCESS);
export const DeleteContractorFailure = createAction(actionTypes.DELETE_CONTRACTOR_FAILURE);
