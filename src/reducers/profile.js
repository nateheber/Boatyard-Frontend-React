import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

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
  type: '',
  isAdmin: false
};

export default handleActions(
  {
    [actions.setProfile]: (
      state,
      { payload: { id, firstName, lastName, email, phoneNumber, type } }
    ) =>
      produce(state, draft => {
        draft.id = id;
        draft.firstName = firstName;
        draft.lastName = lastName;
        draft.email = email;
        draft.phoneNumber = phoneNumber;
        draft.type = type;
      })
  },
  initialState
);
