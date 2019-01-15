import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createServices: 'SERVICES/CREATE',
  fetchServices: 'SERVICES/FETCH',
  resetServices: 'SERVICES/RESET',
  updateServices: 'SERVICES/UPDATE',
  deleteServices: 'SERVICES/DELETE',
  setServices: 'SERVICES/SET',
  fetchOne: 'SERVICES/FETCH_ONE',
  filterServices: 'SERVICES/FILTER',
  setFilteredServices: 'SERVICES/SET_FILTERED_DATA',
};

export const createServices = createAction(actions.createServices);
export const resetServices = createAction(actions.resetServices);
export const fetchServices = createAction(actions.fetchServices);
export const updateServices = createAction(actions.updateServices);
export const deleteServices = createAction(actions.deleteServices);
export const filterServices = createAction(actions.filterServices);
export const fetchOne = createAction(actions.fetchOne);

const initialState = {
  services: [],
  filtered: [],
  loading: false,
  page: 0,
  perPage: 20,
  total: 0
};

export default handleActions(
  {
    [actions.fetchServices]: (state, { payload }) =>
      produce(state, draft => {
        draft.page = payload;
        draft.loading = true;
      }),
    [actions.resetServices]: state =>
      produce(state, draft => {
        draft.loading = false;
        draft.services = [];
        draft.page = 1;
        draft.perPage = 20;
        draft.total = 0;
      }),
    [actions.setServices]: (state, { payload }) =>
      produce(state, draft => {
        const { perPage, services, total } = payload;
        draft.loading = false;
        draft.services = services;
        draft.perPage = perPage;
        draft.total = total;
      }),
    [actions.filterServices]: (state, { payload }) =>
      produce(state, draft => {
        draft.filtered = [];
        draft.loading = true;
      }),
    [actions.setFilteredServices]: (state, { payload }) =>
      produce(state, draft => {
        draft.filtered = [...payload];
        draft.loading = false;
      }),
  },
  initialState
);
