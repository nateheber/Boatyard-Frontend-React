import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createServices: 'SERVICES/CREATE',
  fetchServices: 'SERVICES/FETCH',
  updateServices: 'SERVICES/UPDATE',
  deleteServices: 'SERVICES/DELETE',
  setServices: 'SERVICES/SET'
};

export const createServices = createAction(actions.createServices);
export const fetchServices = createAction(actions.fetchServices);
export const updateServices = createAction(actions.updateServices);
export const deleteServices = createAction(actions.deleteServices);

const initialState = {
  services: []
};

export default handleActions(
  {
    [actions.setServices]: (state, { payload }) =>
      produce(state, draft => {
        draft.services = payload;
      })
  },
  initialState
);
