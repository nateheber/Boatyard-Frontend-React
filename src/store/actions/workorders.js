import { createAction } from 'redux-actions';

export const actionTypes = {
  SET_NEW_WORKORDER: '[WORKORDERS] - Set New Workorder',
  RESET_NEW_WORKORDER: '[WORKORDERS] - Reset New Workorder',
  UPSERT_WORKORDER: '[WORKORDERS] - Add Upsert Workorder Request',
  UPSERT_WORKORDER_SUCCESS: '[WORKORDERS] - Add Upsert Workorder Success',
  UPSERT_WORKORDER_ERROR: '[WORKORDERS] - Add Upsert Workorder Error',
  GET_WORKORDERS: '[WORKORDERS] - Get Work Orders',
  GET_WORKORDERS_SUCCESS: '[GET_WORKORDERS_SUCCESS] - Get Work Orders',
  SERVICES_VALIDATION: '[WORKORDERS] - Services Validation',
  RESET: '[WORKORDERS] - RESET',
  DELETE_WORKORDER: '[WORKORDERS] - Delete Workorder',
  DELETE_WORKORDER_SUCCESS: '[WORKORDERS] - Delete Workorder Success',
  DELETE_WORKORDER_ERROR: '[WORKORDERS] - Delete Workorder Error',
};

export const SetWorkOrder = createAction(actionTypes.SET_NEW_WORKORDER, payload => payload);
export const ResetWorkOrder = createAction(actionTypes.RESET_NEW_WORKORDER);
export const UpserWorkOrder = createAction(actionTypes.UPSERT_WORKORDER, payload => payload);
export const UpserWorkOrderuccess = createAction(actionTypes.UPSERT_WORKORDER_SUCCESS, payload => payload);
export const UpserWorkOrderError = createAction(actionTypes.UPSERT_WORKORDER_ERROR, payload => payload);
export const GetWorkOrders = createAction(actionTypes.GET_WORKORDERS);
export const ServicesValidation = createAction(actionTypes.SERVICES_VALIDATION);
export const DeleteWorkOrder = createAction(actionTypes.DELETE_WORKORDER, payload => payload);
export const DeleteWorkOrderError = createAction(actionTypes.DELETE_WORKORDER_ERROR);
export const DeleteWorkOrderSuccess = createAction(actionTypes.DELETE_WORKORDER_SUCCESS);
