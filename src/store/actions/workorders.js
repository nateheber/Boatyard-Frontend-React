import { createAction } from 'redux-actions';

export const actionTypes = {
  SET_NEW_WORKORDER: '[WORKORDERS] - Set New Workorder',
  RESET_NEW_WORKORDER: '[WORKORDERS] - Reset New Workorder',
  ADD_NEW_WORKORDER: '[WORKORDERS] - Add New Workorder Request',
  ADD_NEW_WORKORDER_SUCCESS: '[WORKORDERS] - Add New Workorder Success',
  ADD_NEW_WORKORDER_ERROR: '[WORKORDERS] - Add New Workorder Error',
  GET_WORKORDERS: '[WORKORDERS] - Get Work Orders',
  GET_WORKORDERS_SUCCESS: '[GET_WORKORDERS_SUCCESS] - Get Work Orders',
  SERVICES_VALIDATION: '[WORKORDERS] - Services Validation',
  RESET: '[WORKORDERS] - RESET',
};

export const SetWorkOrder = createAction(actionTypes.SET_NEW_WORKORDER, payload => payload);
export const ResetWorkOrder = createAction(actionTypes.RESET_NEW_WORKORDER);
export const AddNewWorkOrder = createAction(actionTypes.ADD_NEW_WORKORDER, payload => payload);
export const AddNewWorkOrderSuccess = createAction(actionTypes.ADD_NEW_WORKORDER_SUCCESS, payload => payload);
export const AddNewWorkOrderError = createAction(actionTypes.ADD_NEW_WORKORDER_ERROR, payload => payload);
export const GetWorkOrders = createAction(actionTypes.GET_WORKORDERS);
export const ServicesValidation = createAction(actionTypes.SERVICES_VALIDATION);
