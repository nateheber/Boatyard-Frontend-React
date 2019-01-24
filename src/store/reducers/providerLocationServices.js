import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createProviderLocationService: 'PROVIDER_LOCATION_SERVICE/CREATE',
  fetchProviderLocationServices: 'PROVIDER_LOCATION_SERVICE/FETCH',
  updateProviderLocationService: 'PROVIDER_LOCATION_SERVICE/UPDATE',
  deleteProviderLocationService: 'PROVIDER_LOCATION_SERVICE/DELETE',
  setProviderLocationServices: 'PROVIDER_LOCATION_SERVICE/SET'
};

export const createProviderLocationService = createAction(actions.createProviderLocationService);
export const fetchProviderLocationServices = createAction(actions.fetchProviderLocationServices);
export const updateProviderLocationService = createAction(actions.updateProviderLocationService);
export const deleteProviderLocationService = createAction(actions.deleteProviderLocationService);

const initialState = {
  providerLocationServices: [],
  included: [],
};

export default handleActions(
  {
    [actions.setProviderLocationServices]: (state, { payload }) =>
      produce(state, draft => {
        const { data, included } = payload;
        draft.providerLocationServices = data;
        draft.included = included;
      }),
  },
  initialState
);
