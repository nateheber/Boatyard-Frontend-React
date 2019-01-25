import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, findIndex } from 'lodash';

import { actions } from '../reducers/management';
import { actions as providerActions } from '../reducers/providers';
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
      attributes: { providerId, userId }
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
        type: providerActions.fetchProvider,
        payload: providerId
      });
      yield put({
        type: userActions.GET_USER,
        payload: userId
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
