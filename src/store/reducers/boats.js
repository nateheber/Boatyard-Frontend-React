import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get } from 'lodash';
import { actionTypes } from '../actions/boats';
import { refactorIncluded } from 'utils/basic';

const initialState = {
  currentStatus: '',
  boats: [],
  included: [],
  currentBoat: {},
  page: 1,
  perPage: 20,
  total: 0,
  errors: null
};

export default handleActions(
  {
    [actionTypes.GET_BOATS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_BOATS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, boats, included } = payload;
        draft.currentStatus = type;
        draft.total = total;
        draft.perPage = perPage;
        draft.boats = boats;
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.GET_BOATS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_BOAT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_BOAT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentBoat = payload;
      }),
    [actionTypes.GET_BOAT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.CREATE_BOAT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.CREATE_BOAT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.CREATE_BOAT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.UPDATE_BOAT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.UPDATE_BOAT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.UPDATE_BOAT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.DELETE_BOAT]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DELETE_BOAT_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DELETE_BOAT_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      })
  },
  initialState
);
