import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, set, orderBy, isEmpty, isArray } from 'lodash';

import { actionTypes } from '../actions/providers';
import { actionTypes as authActions } from '../actions/auth';
import { getAccessRole } from '../selectors/auth';
import { profileSelector } from '../selectors/profile';
import { customApiClient, createProviderClient, createPreferredProviderClient } from '../../api';
import { refactorIncluded } from 'utils/basic';

import { getProviderClient, getCustomApiClient } from './sagaSelectors';

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
// const basicProviderClient = createProviderClient('basic');
const customManagement = customApiClient('admin');
const adminPreferredApiClient = createPreferredProviderClient('admin');

function* getProviders(action) {
  let successType = actionTypes.GET_PROVIDERS_SUCCESS;
  let failureType = actionTypes.GET_PROVIDERS_FAILURE;
  const { params, success, error } = action.payload;
  console.log(params);

  try {
    const result = yield call(adminApiClient.list, params, 'v3');
    // console.log(adminApiClient);
    // console.log(result);
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
      //yield call(success, refinedProviders);
      yield call(success, refinedProviders, page);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

const refatcorPreferredProvder = (provider, included) => {
  const preferredProvider = {
    ...provider
  };
  for(const key in preferredProvider.relationships) {
    let value = get(preferredProvider, `relationships[${key}].data`);
    if(value && !isEmpty(value)) {
      if (isArray(value) && value.length > 0) {
        set(preferredProvider.relationships, `[${key}]`, value.map(obj => {
          return get(included, `[${obj.type}][${obj.id}]`);
        }))
        for(const subKey in get(preferredProvider, `relationships[${key}][0].relationships`)) {
          const subValue = get(preferredProvider, `relationships[${key}][0].relationships[${subKey}].data`);
          if (subValue) {
            preferredProvider.relationships[subKey] = get(included, `[${subValue.type}][${subValue.id}]`);
          }
        }
      } else {
        preferredProvider.relationships[key] = get(included, `[${value.type}][${value.id}]`);
        if (key === 'boat') {
          const boatLocationInfo = get(preferredProvider.relationships[key], 'relationships.location.data');
          if (boatLocationInfo) {
            const locationInfo = get(included, `[${boatLocationInfo.type}][${boatLocationInfo.id}]`);
            set(preferredProvider.relationships[key], 'relationships.location', { attributes: locationInfo.attributes, address: get(locationInfo, 'relationships.address.data') });
          }
        }
      }
    }
  }
  return preferredProvider;
}

function* getPreferredProviders(action) {
  const { params, success, error } = action.payload;
  try {
    const result = yield call(adminPreferredApiClient.list, params);
    const providers = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    const page = get(params, 'page', 1);
    yield put({
      type: actionTypes.GET_PREFERRED_PROVIDERS_SUCCESS,
      payload: {
        providers,
        included,
        perPage,
        page,
        total
      }
    });
    if (success) {
      yield call(success, providers, page);
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
  const profile = yield select(profileSelector);
  const accessRole = yield select(getAccessRole);
  const { providerId, success, error, providerLocationId, locationName } = action.payload;
  const id = profile.id ? parseInt(profile.id) : null;
  try {
    let result = null;
    // if (isEmpty(providerId)) {
    //   result = yield call(basicProviderClient.list);
    //   const { data } = result;
    //   if (!isEmpty(data)) {
    //     id = get(data[0], 'id', null);
    //   }
    // }
    if (id) {
      result = yield call(escalationApiClient.post, '/users/escalations', {
        escalation: {
          user_id: parseInt(profile.id),
          provider_id: parseInt(providerId),
          provider_location_id: providerLocationId ? parseInt(providerLocationId) : undefined
        }
      });  
      yield put({
        type: authActions.SET_PROVIDER_INFO,
        payload: get(result, 'data')
      });
      yield put({
        type: authActions.SET_PRIVILEGE,
        payload: {
          privilege: 'provider',
          providerId,
          providerLocationId,
          locationName
        }
      });
      yield put({ type: actionTypes.LOGIN_WITH_PROVIDER_SUCCESS, payload: get(result, 'data') });
      if (accessRole === 'team' && providerLocationId) {
        window.localStorage.setItem(`BT_USER_${profile.id}_LOCATION`, providerLocationId);
      }
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
    const result = yield call(adminPreferredApiClient.create, data);
    const preferredProvider = refatcorPreferredProvder(get(result, 'data', {}), refactorIncluded(get(result, 'included', [])));
    yield put({
      type: actionTypes.ADD_PREFERRED_PROVIDER_SUCCESS,
      payload: preferredProvider
    });
    if (success) {
      yield call(success, preferredProvider);
    }
  } catch (e) {
    yield put({ type: actionTypes.ADD_PREFERRED_PROVIDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateProvider(action) {
  const { providerId, data, success, error } = action.payload;
  const apiClient = yield select(getProviderClient);
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
      type: actionTypes.DELETE_PROVIDER_SUCCESS
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
      type: actionTypes.DELETE_PREFERRED_PROVIDER_SUCCESS,
      payload: providerId
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_PREFERRED_PROVIDER_FAILURE, payload: e });
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
  // yield takeEvery(actionTypes.LOGIN_WITH_PROVIDER_LOCATION, loginWithProviderLocation);
}
