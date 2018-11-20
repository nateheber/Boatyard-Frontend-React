import { put, takeEvery, call } from 'redux-saga/effects';

import { actions } from '../profile';

import {
  getUserProfile,
  updateUserProfile,
  deleteUser
} from '../../api/profile';

function* fetchRequest(action) {
  const result = yield call(getUserProfile, action.payload);
  yield put({
    type: actions.setProfile,
    payload: result
  });
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  const result = yield call(updateUserProfile, id, data);
  const {
    type,
    attributes: { firstName, lastName, email, phoneNumber }
  } = result.data;
  yield put({
    type: actions.setProfile,
    payload: {
      email: email || '',
      firstName: firstName || '',
      lastName: lastName || '',
      phoneNumber: phoneNumber || '',
      type
    }
  });
}

function* deleteRequest(action) {
  yield call(deleteUser, action.payload);
}

export default function* Auth() {
  yield takeEvery(actions.fetchProfile, fetchRequest);
  yield takeEvery(actions.updateProfile, updateRequest);
  yield takeEvery(actions.deleteProfile, deleteRequest);
}
