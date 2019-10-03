import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { find } from 'lodash';
import { actionTypes } from '../actions/workorders';

const initialWorkOrder = {
  selectedTeamMembers: [],
  settings: {
    notes: false,
    customer_info: false,
    boat_info: true,
    location: true
  },
  file_attachments_attributes: [],
  showOrderService: true,
  services: [{due_type: 'flexible'}],
  job_number: '',
  modalShow: false
};

const initialState = {
  workorder: initialWorkOrder,
  workorders: [],
  included: {},
  servicesValidationCnt: 0,
  loading: false,
};


export default handleActions(
  {
    [actionTypes.SET_NEW_WORKORDER]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        const reset = payload.reset;
        delete payload['reset'];
        if (reset) {
          draft.workorder = { ...initialWorkOrder, ...payload };
        } else {
          draft.workorder = { ...draft.workorder, ...payload };
        }
        draft.loading = false;
      }),
    [actionTypes.UPSERT_WORKORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action
        draft.currentStatus = type;
        draft.loading = true;
      }),
    [actionTypes.UPSERT_WORKORDER_ERROR]: (state, action) =>
      produce(state, draft => {
        const { type} = action;
        draft.currentStatus = type;
        draft.loading = false;
      }),
    [actionTypes.UPSERT_WORKORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: {newWorkorder, included} } = action;
        draft.currentStatus = type;
        draft.workorders = [...state.workorders, newWorkorder];
        draft.included = [...draft.included, ...included];
        draft.loading = false;
      }),
      [actionTypes.DELETE_WORKORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action
        draft.currentStatus = type;
        draft.loading = true;
      }),
    [actionTypes.DELETE_WORKORDER_ERROR]: (state, action) =>
      produce(state, draft => {
        const { type} = action;
        draft.currentStatus = type;
        draft.loading = false;
      }),
    [actionTypes.DELETE_WORKORDER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type} = action;
        draft.currentStatus = type;
        draft.loading = false;
      }),
    [actionTypes.RESET_NEW_WORKORDER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.workorder = {...initialWorkOrder};
      }),
    [actionTypes.GET_WORKORDERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: {data, included} } = action;
        draft.currentStatus = type;
        data.forEach(({relationships}) => {
          Object.keys(relationships).forEach(key => {
            relationships[key].data = relationships[key].data.map(item => find(included, item));
          });
        });
        console.log(data);
        draft.workorders = data;
        draft.included = included;
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
