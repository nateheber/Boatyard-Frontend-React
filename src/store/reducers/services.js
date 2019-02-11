import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get, set } from 'lodash';
import { actionTypes } from '../actions/services';

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
  services: [],
  filteredServices: [],
  currentService: {},
  included: {},
  page: 1,
  perPage: 20,
  total: 0,
  errors: null
};


export default handleActions(
  {
    [actionTypes.GET_SERVICES]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.page = get(payload, 'params.page', 0);
        draft.errors = null;
      }),
    [actionTypes.GET_SERVICES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, services, included } = payload;
        draft.currentStatus = type;
        draft.total = total;
        draft.perPage = perPage;
        draft.services = services;
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.GET_SERVICES_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.FILTER_SERVICES]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.FILTER_SERVICES_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, services, included } = payload;
        draft.currentStatus = type;
        draft.total = total;
        draft.perPage = perPage;
        draft.filteredServices = services;
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.FILTER_SERVICES_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_SERVICE]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_SERVICE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentService = payload;
      }),
    [actionTypes.GET_SERVICE_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.CREATE_SERVICE]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.CREATE_SERVICE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentService = payload;
      }),
    [actionTypes.CREATE_SERVICE_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.UPDATE_SERVICE]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.UPDATE_SERVICE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.UPDATE_SERVICE_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.DELETE_SERVICE]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DELETE_SERVICE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DELETE_SERVICE_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      })
    },
  initialState
);