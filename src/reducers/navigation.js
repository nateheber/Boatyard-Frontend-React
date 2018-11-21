import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  setCurrentScreen: 'NAVIGATION/SET_CURRENT_SCREEN'
};

export const setCurrentScreen = createAction(actions.setCurrentScreen);

const initialState = {
  currentScreen: ''
};

export default handleActions(
  {
    [actions.setKeyword]: (state, action) =>
      produce(state, draft => {
        draft.currentScreen = action.payload;
      })
  },
  initialState
);
