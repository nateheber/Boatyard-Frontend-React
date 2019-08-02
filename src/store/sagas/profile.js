import { put, takeEvery, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import { actions } from '../reducers/profile';
import { createUserClient } from '../../api';

const apiClient = createUserClient('basic');

function* fetchRequest(action) {
  try {
    const result = yield call(apiClient.read, action.payload);
    yield put({
      type: actions.setProfile,
      payload: result
    });
  } catch (e) {
    toastr.error('Error', e.message);
  }
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  try {
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
  } catch (e) {
    toastr.error('Error', e.message);
  }
}

export default function* Profile() {
  yield takeEvery(actions.fetchProfile, fetchRequest);
  yield takeEvery(actions.updateProfile, updateRequest);
}
