import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { actionTypes } from '../actions/contractors';

const initialState = {
  currentStatus: '',
  contractors: [],
  errors: null
};


export default handleActions(
  {
    [actionTypes.GET_CONTRACTORS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_CONTRACTORS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: {contractors} } = action;
        draft.currentStatus = type;
        draft.contractors = contractors;
      }),
    [actionTypes.GET_CONTRACTORS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload: {errors} } = action;
        draft.currentStatus = type;
        draft.errors = errors;
      }),
    },
  initialState
);
