import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get, set } from 'lodash';
import { actionTypes } from '../actions/managements';

function refactorIncluded(included) {
  let refactored = {};
  for ( let i = 0; i < included.length; i += 1 ) {
    const { type, id } = included[i]
    set(refactored, `${type}.${id}`, {...included[i]})
  }
  return refactored;
}

const initialState = {
  currentStatus: '',
  managements: [],
  currentManagement: {},
  page: 1,
  perPage: 20,
  total: 0,
  errors: null
};


export default handleActions(
  {
    [actionTypes.GET_MANAGEMENTS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_MANAGEMENTS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, managements, included } = payload;
        draft.currentStatus = type;
        draft.total = total;
        draft.perPage = perPage;
        draft.managements = managements;
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.GET_MANAGEMENTS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_MANAGEMENT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_MANAGEMENT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, management } = action;
        draft.currentStatus = type;
        draft.currentManagement = management;
      }),
    [actionTypes.GET_MANAGEMENT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.CREATE_MANAGEMENT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.CREATE_MANAGEMENT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, management } = action;
        draft.currentStatus = type;
        draft.currentManagement = management;
      }),
    [actionTypes.CREATE_MANAGEMENT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.UPDATE_MANAGEMENT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.UPDATE_MANAGEMENT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, management } = action;
        draft.currentStatus = type;
        draft.currentManagement = management;
      }),
    [actionTypes.UPDATE_MANAGEMENT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.DELETE_MANAGEMENT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DELETE_MANAGEMENT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DELETE_MANAGEMENT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      })
    },
  initialState
);