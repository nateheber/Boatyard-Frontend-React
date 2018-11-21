import { put, takeEvery, call } from 'redux-saga/effects';

import { actions } from '../profile';

import { createUserClient } from '../../api';

const apiClient = createUserClient('basic');

function* fetchRequest(action) {
  console.log(apiClient);
  const result = yield call(apiClient.read, action.payload);
  yield put({
    type: actions.setProfile,
    payload: result
  });
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  const result = yield call(apiClient.update, id, data);
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
      type,
      id
    }
  });
}

function* deleteRequest(action) {
  yield call(apiClient.delete, action.payload);
}

export default function* Auth() {
  yield takeEvery(actions.fetchProfile, fetchRequest);
  yield takeEvery(actions.updateProfile, updateRequest);
  yield takeEvery(actions.deleteProfile, deleteRequest);
}
