import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get } from 'lodash';
import { actionTypes } from '../actions/site-banners';

const initialState = {
  currentStatus: '',
  banners: [],
  currentBanner: {},
  page: 1,
  perPage: 20,
  total: 0,
  errors: null
};


export default handleActions(
  {
    [actionTypes.GET_SITE_BANNERS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.page = get(payload, 'params.page', 0);
        draft.errors = null;
      }),
    [actionTypes.GET_SITE_BANNERS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, banners } = payload;
        draft.currentStatus = type;
        draft.total = total;
        draft.perPage = perPage;
        draft.banners = banners;
      }),
    [actionTypes.GET_SITE_BANNERS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_SITE_BANNER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_SITE_BANNER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentIcon = payload;
      }),
    [actionTypes.GET_SITE_BANNER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.CREATE_SITE_BANNER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.CREATE_SITE_BANNER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentIcon = payload;
      }),
    [actionTypes.CREATE_SITE_BANNER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.UPDATE_SITE_BANNER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.UPDATE_SITE_BANNER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.currentIcon = payload;
      }),
    [actionTypes.UPDATE_SITE_BANNER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.DELETE_SITE_BANNER]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DELETE_SITE_BANNER_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DELETE_SITE_BANNER_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      })
    },
  initialState
);