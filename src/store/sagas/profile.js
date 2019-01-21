import { put, takeEvery, call } from 'redux-saga/effects';

import { actions } from '../reducers/profile';

import { createUserClient } from '../../api';

const apiClient = createUserClient('basic');

function* fetchRequest(action) {
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

export default function* Profile() {
  yield takeEvery(actions.fetchProfile, fetchRequest);
  yield takeEvery(actions.updateProfile, updateRequest);
}
