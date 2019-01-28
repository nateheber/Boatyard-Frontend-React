import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createProviderLocation: 'PROVIDER_LOCATION/CREATE',
  fetchProviderLocations: 'PROVIDER_LOCATION/FETCH',
  updateProviderLocation: 'PROVIDER_LOCATION/UPDATE',
  deleteProviderLocation: 'PROVIDER_LOCATION/DELETE',
  setProviderLocations: 'PROVIDER_LOCATION/SET'
};

export const createProviderLocation = createAction(actions.createProviderLocation);
export const fetchProviderLocations = createAction(actions.fetchProviderLocations);
export const updateProviderLocation = createAction(actions.updateProviderLocation);
export const deleteProviderLocation = createAction(actions.deleteProviderLocation);

const initialState = {
  providerLocations: [],
  included: [],
};

export default handleActions(
  {
    [actions.setProviderLocations]: (state, { payload }) =>
      produce(state, draft => {
        const { data, included } = payload;
        draft.providerLocations = data;
        draft.included = included;
      }),
  },
  initialState
);
