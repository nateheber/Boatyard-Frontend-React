import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchProfile: 'PROFILE/FETCH',
  updateProfile: 'PROFILE/UPDATE',
  deleteProfile: 'PROFILE/DELETE',
  setProfile: 'PROFILE/SET'
};

export const fetchProfile = createAction(actions.fetchProfile);
export const updateProfile = createAction(actions.updateProfile);
export const deleteProfile = createAction(actions.deleteProfile);

const initialState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  type: ''
};

export default handleActions(
  {
    [actions.setProfile]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
