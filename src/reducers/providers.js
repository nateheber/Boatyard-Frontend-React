import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { filter, findIndex } from 'lodash';

export const actions = {
  createProvider: 'PROVIDER/CREATE',
  selectProvider: 'PROVIDER/SELECT',
  fetchProviders: 'PROVIDER/FETCH',
  fetchProvider: 'PROVIDER/FETCH_ONE',
  setProviders: 'PROVIDER/SET',
  setProvider: 'PROVIDER/SET_ONE',
  updateProvider: 'PROVIDER/UPDATE',
  setUpdatedProvider: 'PROVIDER/SET_UPDATED',
  deleteProvider: 'PROVIDER/DELETE'
};

export const createProvider = createAction(actions.createProvider);
export const updateProvider = createAction(actions.updateProvider);
export const selectProvider = createAction(actions.selectProvider);
export const fetchProviders = createAction(actions.fetchProviders);
export const fetchProvider = createAction(actions.fetchProvider);
export const setProviders = createAction(actions.setProviders);
export const deleteProvider = createAction(actions.deleteProvider);

const initialState = {
  providers: []
};

export default handleActions(
  {
    [actions.setProviders]: (state, { payload }) =>
      produce(state, draft => {
        draft.providers = payload;
      }),
    [actions.setProvider]: (state, { payload }) =>
      produce(state, draft => {
        draft.providers = [...draft.providers, payload];
      }),
    [actions.deleteProvider]: (state, { payload }) =>
      produce(state, draft => {
        const providers = filter(
          draft.providers,
          provider => provider.id !== payload
        );
        draft.providers = providers;
      }),
    [actions.setUpdatedProvider]: (state, { payload }) =>
      produce(state, draft => {
        const idx = findIndex(
          draft.providers,
          provider => provider.id === payload.id
        );
        draft.providers[idx] = payload;
      })
  },
  initialState
);
