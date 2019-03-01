import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, filter } from 'lodash';

import { actionTypes } from '../actions/providers';
import { actions as authActions } from '../reducers/auth';

import { customApiClient, createProviderClient, createPreferredProviderClient } from '../../api';

import { getCustomApiClient } from './sagaSelectors';
import { getProvidersSelector } from '../selectors/providers';

const refineProviders = (providers) => {
  return providers.map(provider => {
    return {
      id: provider.id,
      ...provider.attributes,
      relationships: provider.relationships
    };
  });
};

const adminApiClient = createProviderClient('admin');
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
      yield call(error);
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
      yield call(error);
    }
  }
}

function* loginWithProvider(action) {
  const escalationApiClient = yield select(getCustomApiClient);
  const { providerId, success, error } = action.payload;
  let id = providerId;
  let result = null;
  try {
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
      yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_SUCCESS, payload: result });
      if (success) {
        yield call(success);
      }
    } else {
      yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_FAILURE });
      if (error) {
        yield call(error, true);
      }
    }
  } catch (e) {
    yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getProvider(action) {
  const { providerId, success, error } = action.payload;
  const providers = yield select(getProvidersSelector);
  const filtered = filter(providers, provider => provider.id === providerId);
  try {
    let provider = {};
    if (!isEmpty(filtered)) {
      provider = filtered[0];
    } else {
      const result = yield call(adminApiClient.read, providerId);
      const { data } = result;
      provider = { id: data.id, ...data.attributes };
    }
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
      yield call(error);
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
        providerId: id
      }
    });
    yield put({
      type: actionTypes.CREATE_PROVIDER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error);
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
      yield call(error);
    }
  }
}

function* updateProvider(action) {
  const { providerId, data, success, error } = action.payload;
  try {
    const result = yield call(adminApiClient.update, providerId, data);
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
      yield call(error);
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
      yield call(error);
    }
  }
}

function* deletePreferredProvider(action) {
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
      yield call(error);
    }
  }
}

export default function* Profile() {
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
}
