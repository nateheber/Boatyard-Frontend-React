import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { actions } from '../providers';
import { actions as authActions } from '../auth';

import {
  customApiClient,
  createProviderClient,
  createUserClient
} from '../../api';

import { getProviders } from './sagaSelectors';

const adminApiClient = createProviderClient('admin');
const basicProviderClient = createProviderClient('basic');
const customManagement = customApiClient('admin');
const escalationApiClient = customApiClient('basic');
const userClient = createUserClient('admin');

function* createRequest(action) {
  const result = yield call(adminApiClient.create, action.payload);
  const id = get(result, 'data.id', false);
  if (id) {
    const data = yield call(customManagement.post, '/managements/', {
      management: {
        email: action.payload.email,
        providerId: id
      }
    });
    const userId = get(data, 'included[0].id');
    const { firstName, lastName } = this.payload;
    yield call(userClient.update, userId, { firstName, lastName });
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
  const providerIdx = get(action, 'payload', 0);
  const id = providers[providerIdx].id;
  const result = yield call(escalationApiClient.post, '/users/escalations', {
    escalation: {
      providerId: parseInt(id)
    }
  });
  if (!isEmpty(result)) {
    const authorizationToken = get(
      result,
      'data.attributes.authorizationToken'
    );
    yield put({
      type: authActions.setProviderToken,
      payload: authorizationToken
    });
  }
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
