import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, findIndex } from 'lodash';

import { actions } from '../reducers/management';
import { actionTypes as providerActions } from '../actions/providers';
import { actionTypes as userActions } from '../actions/users';
import { getManagementClient, getManagements } from './sagaSelectors';

function* createRequest(action) {
  const managementClient = yield select(getManagementClient);
  yield call(managementClient.create, action.payload);
  yield put({
    type: actions.fetchManagements
  });
}

function* fetchRequest(action) {
  const managementClient = yield select(getManagementClient);
  const result = yield call(managementClient.list);
  const managements = get(result, 'data', []);
  const currentMngs = yield select(getManagements);
  for (let i = 0; i < managements.length; i += 1) {
    const {
      id: mngId,
      attributes: { provider_id: providerId, user_id: userId }
    } = managements[i];
    const idx = findIndex(currentMngs, mng => mng.id === mngId);
    if (idx === -1) {
      yield put({
        type: actions.appendManagement,
        payload: {
          id: mngId,
          ...managements[i].attributes
        }
      });
      yield put({
        type: providerActions.GET_PROVIDER,
        payload: { provider_id: providerId }
      });
      yield put({
        type: userActions.GET_USER,
        payload: { user_id: userId }
      });
    }
  }
}

function* deleteRequest(action) {
  const managementClient = yield select(getManagementClient);
  yield call(managementClient.delete, action.payload);
}

function* updateRequest(action) {
  const managementClient = yield select(getManagementClient);
  const { id, data } = action.payload;
  yield call(managementClient.update, id, data);
  yield put({
    type: actions.fetchManagements
  });
}

export default function* Profile() {
  yield takeEvery(actions.createManagements, createRequest);
  yield takeEvery(actions.fetchManagements, fetchRequest);
  yield takeEvery(actions.deleteManagements, deleteRequest);
  yield takeEvery(actions.updateManagements, updateRequest);
}
