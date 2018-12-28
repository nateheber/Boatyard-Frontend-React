import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createServices: 'SERVICES/CREATE',
  fetchServices: 'SERVICES/FETCH',
  resetServices: 'SERVICES/RESET',
  updateServices: 'SERVICES/UPDATE',
  deleteServices: 'SERVICES/DELETE',
  setServices: 'SERVICES/SET'
};

export const createServices = createAction(actions.createServices);
export const resetServices = createAction(actions.resetServices);
export const fetchServices = createAction(actions.fetchServices);
export const updateServices = createAction(actions.updateServices);
export const deleteServices = createAction(actions.deleteServices);

const initialState = {
  services: [],
  loading: false,
  nextPage: 0,
  hasMore: true
};

export default handleActions(
  {
    [actions.fetchServices]: (state, { payload }) =>
      produce(state, draft => {
        draft.loading = true;
      }),
    [actions.resetServices]: state =>
      produce(state, draft => {
        draft.services = [];
        draft.hasMore = true;
        draft.nextPage = 0;
      }),
    [actions.setServices]: (state, { payload }) =>
      produce(state, draft => {
        if (draft.nextPage === 0) {
          draft.services = [];
        }
        if (payload.length !== 0) {
          draft.services = [...draft.services, ...payload];
          draft.nextPage += 1;
        } else {
          draft.hasMore = false;
        }
        draft.loading = false;
      })
  },
  initialState
);
