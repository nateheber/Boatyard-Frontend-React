import { handleActions } from 'redux-actions';
import { produce } from 'immer';
// import { get } from 'lodash';
import { actionTypes } from '../actions/workorders';

const initialWorkOrder = {
  selectedTeamMembers: [],
  settings: {
    notes: true,
    customer_info: true,
    boat_info: true,
    location: true
  },
  file_attachments_attributes: [],
  showOrderService: true,
  services: [{}],
  job_number: ''
};

const initialState = {
  workorder: initialWorkOrder,
  workorders: [],
  servicesValidationCnt: 0,
};


export default handleActions(
  {
    [actionTypes.SET_NEW_WORKORDER]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.workorder = {...draft.workorder, ...payload};
      }),
    [actionTypes.ADD_NEW_WORKORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: {newWorkorder} } = action;
        draft.currentStatus = type;
        draft.workorders = [...state.workorders, newWorkorder];
      }),
    [actionTypes.RESET_NEW_WORKORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.workorder = {...initialWorkOrder};
      }),
    [actionTypes.GET_WORKORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.workorders = payload;
      }),
    [actionTypes.RESET]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.workorders = [];
        draft.workorder = initialWorkOrder;
      }),
    [actionTypes.SERVICES_VALIDATION]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.servicesValidationCnt += 1;
      }),
  },
  initialState
);
