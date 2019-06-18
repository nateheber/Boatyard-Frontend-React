import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, orderBy } from 'lodash';

import { actionTypes } from '../actions/providers';
import { actionTypes as authActions } from '../actions/auth';

import { customApiClient, createProviderClient, createPreferredProviderClient } from '../../api';

import { getCustomApiClient } from './sagaSelectors';

const escalationClient = customApiClient('basic');

const refineProviders = (providers) => {
  const refinedProviders = providers.map(provider => {
    return {
      id: provider.id,
      ...provider.attributes,
      relationships: provider.relationships
    };
  });
  return orderBy(refinedProviders, [function(o){ return o.name.toLowerCase(); }], ['asc']);
};

const adminApiClient = createProviderClient('admin');
const providerApiClient = createProviderClient('provider');
const basicProviderClient = createProviderClient('basic');
const customManagement = customApiClient('admin');
const adminPreferredApiClient = createPreferredProviderClient('admin');

function* getProviders(action) {
  let successType = actionTypes.GET_PROVIDERS_SUCCESS;
  let failureType = actionTypes.GET_PROVIDERS_FAILURE;
  const { params, success, error } = action.payload;
  try {
    const result = yield call(adminApiClient.list, params);
    const providers = get(result, 'data', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_PROVIDERS: {
        successType = actionTypes.FILTER_PROVIDERS_SUCCESS;
        failureType = actionTypes.FILTER_PROVIDERS_FAILURE;
        break;
      }
      default:
    }
    const refinedProviders = refineProviders(providers);
    const page = get(params, 'page', 1);
    yield put({
      type: successType,
      payload: {
        providers: refinedProviders,
        perPage,
        page,
        total
      }
    });
    if (success) {
      yield call(success, refinedProviders, page);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getPreferredProviders(action) {
  const { params, success, error } = action.payload;
  try {
    const result = yield call(adminPreferredApiClient.list, params);
    const providers = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    const refinedProviders = refineProviders(providers);
    const page = get(params, 'page', 1);
    yield put({
      type: actionTypes.GET_PREFERRED_PROVIDERS_SUCCESS,
      payload: {
        providers: refinedProviders,
        included,
        perPage,
        page,
        total
      }
    });
    if (success) {
      yield call(success, refinedProviders, page);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PREFERRED_PROVIDERS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* loginWithProvider(action) {
  const escalationApiClient = yield select(getCustomApiClient);
  const { providerId, success, error } = action.payload;
  let id = providerId;
  try {
    let result = null;
    if (isEmpty(providerId)) {
      result = yield call(basicProviderClient.list);
      const { data } = result;
      if (!isEmpty(data)) {
        id = get(data[0], 'id', null);
      }
    }
    if (!isEmpty(id)) {
      result = yield call(escalationApiClient.post, '/users/escalations', {
        escalation: {
          provider_id: parseInt(id)
        }
      });  
      yield put({
        type: authActions.SET_PROVIDER_INFO,
        payload: get(result, 'data')
      });
      yield put({
        type: authActions.SET_PRIVILEGE,
        payload: 'provider'
      });
      yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_SUCCESS, payload: get(result, 'data') });
      if (success) {
        yield call(success);
      }
    } else {
      yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_FAILURE });
      if (error) {
        yield call(error, { message: 'Invalid Credentials' });
      }
    }
  } catch (e) {
    yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* loginWithProviderLocation(action) {
  const escalationApiClient = yield select(getCustomApiClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(escalationApiClient.post, '/users/escalations', {
      escalation: params
    });
    console.log('----------result----------', result);
    // yield put({
    //   type: authActions.SET_PROVIDER_INFO,
    //   payload: get(result, 'data')
    // });
    // yield put({
    //   type: authActions.SET_PRIVILEGE,
    //   payload: 'provider'
    // });
    // yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_SUCCESS, payload: result });
    // if (success) {
    //   yield call(success);
    // }
  } catch (e) {
    yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getProvider(action) {
  const { providerId, success, error } = action.payload;
  try {
    const result = yield call(adminApiClient.read, providerId);
    const { data: { id, attributes, relationships }, included } = result;
    const provider = { id, ...attributes, relationships, included };
    yield put({
      type: actionTypes.GET_PROVIDER_SUCCESS,
      payload: provider
    });
    if (success) {
      yield call(success, provider);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createProvider(action) {
  const { data, success, error } = action.payload;
  try {
    const result = yield call(adminApiClient.create, data);
    const id = get(result, 'data.id', false);
    yield call(customManagement.post, '/managements/', {
      management: {
        email: data.email,
        provider_id: id
      }
    });
    yield put({
      type: actionTypes.CREATE_PROVIDER_SUCCESS,
    });
    if (success) {
      yield call(success, result);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* addPreferredProvider(action) {
  const { data, success, error } = action.payload;
  try {
    yield call(adminPreferredApiClient.create, data);
    yield put({
      type: actionTypes.CREATE_PROVIDER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateProvider(action) {
  const { authType, providerId, data, success, error } = action.payload;
  let apiClient = adminApiClient;
  if (authType && authType === 'provider') {
    apiClient = providerApiClient;
  }
  try {
    const result = yield call(apiClient.update, providerId, data);
    const provider = get(result, 'data', {});
    yield put({
      type: actionTypes.UPDATE_PROVIDER_SUCCESS,
      payload: { id: provider.id, ...provider.attributes }
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteProvider(action) {
  const { providerId, success, error } = action.payload;
  try {
    yield call(adminApiClient.delete, providerId);
    yield put({
      type: actionTypes.DELETE_PROVIDER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deletePreferredProvider(action) {
  const { providerId, success, error } = action.payload;
  try {
    yield call(adminPreferredApiClient.delete, providerId);
    yield put({
      type: actionTypes.DELETE_PROVIDER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* ProviderSaga() {
  yield takeEvery(actionTypes.GET_PROVIDERS, getProviders);
  yield takeEvery(actionTypes.FILTER_PROVIDERS, getProviders);
  yield takeEvery(actionTypes.GET_PREFERRED_PROVIDERS, getPreferredProviders);
  yield takeEvery(actionTypes.LOGIN_WITH_PROVIDER, loginWithProvider);
  yield takeEvery(actionTypes.GET_PROVIDER, getProvider);
  yield takeEvery(actionTypes.CREATE_PROVIDER, createProvider);
  yield takeEvery(actionTypes.ADD_PREFERRED_PROVIDER, addPreferredProvider);
  yield takeEvery(actionTypes.UPDATE_PROVIDER, updateProvider);
  yield takeEvery(actionTypes.DELETE_PROVIDER, deleteProvider);
  yield takeEvery(actionTypes.DELETE_PREFERRED_PROVIDER, deletePreferredProvider);
  yield takeEvery(actionTypes.LOGIN_WITH_PROVIDER_LOCATION, loginWithProviderLocation);
}
