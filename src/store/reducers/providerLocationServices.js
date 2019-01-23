import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createLocationService: 'PROVIDER_LOCATION_SERVICES/CREATE',
  fetchLocationServices: 'PROVIDER_LOCATION_SERVICES/FETCH',
  updateLocationService: 'PROVIDER_LOCATION_SERVICES/UPDATE',
  deleteLocationService: 'PROVIDER_LOCATION_SERVICES/DELETE',
  setLocationServices: 'PROVIDER_LOCATION_SERVICES/SET'
};

export const createLocationService = createAction(actions.createLocationService);
export const fetchLocationServices = createAction(actions.fetchLocationServices);
export const updateLocationService = createAction(actions.updateLocationService);
export const deleteLocationService = createAction(actions.deleteLocationService);

const initialState = {
  locationServices: [],
};

export default handleActions(
  {
    [actions.setPayments]: (state, { payload }) =>
      produce(state, draft => {
        draft.locationServices = payload
      }),
  },
  initialState
);
