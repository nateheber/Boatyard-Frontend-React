import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, findIndex } from 'lodash';

import { actions } from '../reducers/providers';
import { actions as authActions } from '../reducers/auth';

import { customApiClient, createProviderClient } from '../../api';

import { getProviders, getCustomApiClient } from './sagaSelectors';

const adminApiClient = createProviderClient('admin');
const basicProviderClient = createProviderClient('basic');
const customManagement = customApiClient('admin');

function* createRequest(action) {
  const { callback, data } = action.payload;
  const result = yield call(adminApiClient.create, data);
  const id = get(result, 'data.id', false);
  if (id) {
    yield call(customManagement.post, '/managements/', {
      management: {
        email: data.email,
        providerId: id
      }
    });
    yield call(callback, id);
  }
}

function* fetchRequest(action) {
  const result = yield call(adminApiClient.list);
  const providers = get(result, 'data', []);
  yield put({
    type: actions.setProviders,
    payload: providers.map(provider => ({
      id: provider.id,
      ...provider.attributes
    }))
  });
}

function* filterRequest(action) {
  const { keyword, resolve, reject } = action.payload;
  try {
    const result = yield call(adminApiClient.list, { page: 1, 'providers[name]': keyword });
    const providers = get(result, 'data', []);
    yield put({
      type: actions.setFilteredData,
      payload: providers
    })
    if (resolve) {
      yield call(resolve, providers)
    }
  } catch(err) {
    if (reject) {
      yield call(reject)
    }
  }
}

function* selectRequest(action) {
  const escalationApiClient = yield select(getCustomApiClient);
  if (!action.payload) {
    const providersData = yield call(basicProviderClient.list);
    yield put({
      type: actions.setProviders,
      payload: providersData.data
    });
  }
  const providers = yield select(getProviders);
  let providerId = get(action, 'payload', -1);
  if (providerId === -1) {
    providerId = providers[0].id;
  }
  const result = yield call(escalationApiClient.post, '/users/escalations', {
    escalation: {
      providerId: parseInt(providerId)
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
    yield put({
      type: authActions.setPrivilege,
      payload: 'provider'
    });
  }
}

function* deleteRequest(action) {
  yield call(adminApiClient.delete, action.payload);
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  const provider = yield call(adminApiClient.update, id, data);
  yield put({
    type: actions.setUpdatedProvider,
    payload: { id: provider.id, ...provider.attributes }
  });
}

function* fetchOneRequest(action) {
  const providers = yield select(getProviders);
  const idx = findIndex(providers, provider => provider.id === action.payload);
  if (idx === -1) {
    const { data: provider } = yield call(adminApiClient.read, action.payload);
    yield put({
      type: actions.setProvider,
      payload: { id: provider.id, ...provider.attributes }
    });
  }
}

export default function* Profile() {
  yield takeEvery(actions.createProvider, createRequest);
  yield takeEvery(actions.fetchProviders, fetchRequest);
  yield takeEvery(actions.fetchProvider, fetchOneRequest);
  yield takeEvery(actions.selectProvider, selectRequest);
  yield takeEvery(actions.deleteProvider, deleteRequest);
  yield takeEvery(actions.updateProvider, updateRequest);
  yield takeEvery(actions.filterProviders, filterRequest);
}
