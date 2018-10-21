import { createAction, handleActions } from 'redux-actions';

export const actions = {
  setCurrentScreen: 'NAVIGATION/SET_CURRENT_SCREEN'
};

export const setCurrentScreen = createAction(actions.setCurrentScreen);

const initialState = {
  currentScreen: ''
};

export default handleActions(
  {
    [actions.setKeyword]: (state, action) => ({
      ...state,
      currentScreen: action.payload
    })
  },
  initialState
);
