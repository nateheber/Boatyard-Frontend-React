import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  setErrorState: 'APPSTATE/SET_ERROR_STATE',
  resetErrorState: 'APPSTATE/RESET_ERROR_STATE'
};

export const setErrorState = createAction(actions.setErrorState);
export const resetErrorState = createAction(actions.resetErrorState);

const initialState = {
  error: false,
  errorMessage: ''
};

export default handleActions(
  {
    [actions.setErrorState]: (state, { payload }) =>
      produce(state, draftState => {
        draftState.error = true;
        draftState.errorMessage = payload;
      }),
    [actions.resetErrorState]: state =>
      produce(state, draftState => {
        draftState.error = false;
        draftState.errorMessage = '';
      })
  },
  initialState
);
