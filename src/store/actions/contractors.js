import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_CONTRACTORS: 'GET_CONTRACTORS',
  GET_CONTRACTORS_SUCCESS: 'GET_CONTRACTORS_SUCCESS',
  GET_CONTRACTORS_FAILURE: 'GET_CONTRACTORS_FAILURE',

  CREATE_CONTRACTOR: 'CREATE_CONTRACTOR',
  CREATE_CONTRACTOR_SUCCESS: 'CREATE_CONTRACTOR_SUCCESS',
  CREATE_CONTRACTOR_FAILURE: 'CREATE_CONTRACTOR_FAILURE',
};

export const GetContractors = createAction(actionTypes.GET_CONTRACTORS, payload => payload);
export const GetContractorsSuccess = createAction(actionTypes.GET_CONTRACTORS_SUCCESS, payload => payload);
export const GetContractorsFailure = createAction(actionTypes.GET_CONTRACTORS_FAILURE, payload => payload);

export const CreateContractor = createAction(actionTypes.CREATE_CONTRACTOR, payload => payload);
export const CreateContractorSuccess = createAction(actionTypes.CREATE_CONTRACTOR_SUCCESS);
export const CreateContractorFailure = createAction(actionTypes.CREATE_CONTRACTOR_FAILURE);
