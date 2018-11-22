import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../providers';
import { actions as authActions } from '../auth';

import { customApiClient, createProviderClient } from '../../api';

import { getProviders } from './sagaSelectors';

const adminApiClient = createProviderClient('admin');
const basicProviderClient = createProviderClient('basic');
const customManagement = customApiClient('admin');
const escalationApiClient = customApiClient('basic');

function* createRequest(action) {
  const result = yield call(adminApiClient.create, action.payload);
  const id = get(result, 'data.id', false);
  if (id) {
    const userInvitation = yield call(
      customManagement.post,
      '/users/managements/',
      {
        management: {
          email: action.payload.email,
          providerId: id
        }
      }
    );
    console.log(userInvitation);
  }
}

function* fetchRequest(action) {
  const result = yield call(adminApiClient.list);
  const providers = get(result, 'data', []);
  yield put({
    type: actions.setProviders,
    payload: providers
  });
}

function* selectRequest(action) {
  if (!action.payload) {
    const providersData = yield call(basicProviderClient.list);
    yield put({
      type: actions.setProviders,
      payload: providersData.data
    });
  }
  const providers = yield select(getProviders);
  const id = providers[action.payload].id;
  const result = yield call(escalationApiClient.post, '/users/escalations/', {
    escalation: {
      providerId: id
    }
  });
  console.log(result);
}

function* deleteRequest(action) {
  yield call(adminApiClient.delete, action.payload);
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  yield call(adminApiClient.update, id, data);
}

export default function* Profile() {
  yield takeEvery(actions.createProvider, createRequest);
  yield takeEvery(actions.fetchProviders, fetchRequest);
  yield takeEvery(actions.selectProvider, selectRequest);
  yield takeEvery(actions.deleteProvider, deleteRequest);
  yield takeEvery(actions.updateProvider, updateRequest);
}
