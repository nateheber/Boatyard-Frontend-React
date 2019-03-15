import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, hasIn, keys, isArray, isEmpty } from 'lodash';

import { actionTypes } from '../actions/providerLocations';
import { getProviderLocationClient } from './sagaSelectors';

const refineProviderLocations = (providerLocations) => {
  return providerLocations.map(location => {
    return {
      id: location.id,
      type: location.type,
      ...location.attributes,
      relationships: location.relationships
    };
  });
};

const refineProviderLocation = (location, included) => {
  const relationships = get(location, 'relationships');
  const relationKeys = keys(relationships);
  const parsedRelationships = relationKeys.map((key) => {
    const data = get(relationships, `[${key}].data`);
    const type = get(data, 'type');
    const id = get(data, 'id');
    if (!isArray(data)) {
      return get(included, `[${type}][${id}]`);
    }
    return data.map(relation => {
      const type = get(relation, 'type');
      const id = get(relation, 'id');
      return get(included, `[${type}][${id}]`);
    })
  });
  const relations = {};
  for (const index in parsedRelationships) {
    const item = parsedRelationships[index];
    if (!isEmpty(item)) {
      relations[item.type] = item;
    }
  }
  return { ...location, relationships: relations };
};

function* getProviderLocations(action) {
  const apiClient = yield select(getProviderLocationClient);
  let successType = actionTypes.GET_PROVIDER_LOCATIONS_SUCCESS;
  let failureType = actionTypes.GET_PROVIDER_LOCATIONS_FAILURE;
  const { providerId, params, success, error } = action.payload;
  let submissionParams = {};
  if (!hasIn(params, 'provider_locations[order]')) {
    submissionParams = {
      ...params,
      'provider_locations[order]': 'name',
      'provider_locations[sort]': 'asc',
    };
  } else {
    submissionParams = { ...params };
  }
  let result = null;
  try {
    result = yield call(apiClient.list, [providerId],submissionParams);
    const providerLocations = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_PROVIDER_LOCATIONS: {
        successType = actionTypes.FILTER_PROVIDER_LOCATIONS_SUCCESS;
        failureType = actionTypes.FILTER_PROVIDER_LOCATIONS_FAILURE;
        break;
      }
      default:
    }
    const refinedLocations = refineProviderLocations(providerLocations);
    yield put({
      type: successType,
      payload: {
        providerLocations: refinedLocations,
        included,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedLocations);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, providerLocationId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(apiClient.read, [providerId, providerLocationId]);
    const { data, included } = result;
    // const location = {
    //   id: data.id,
    //   ...data.attributes,
    //   ...data.relationships
    // };
    const location = refineProviderLocation(data, included);
    yield put({
      type: actionTypes.GET_PROVIDER_LOCATION_SUCCESS,
      payload: location
    });
    if (success) {
      yield call(success, location);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PROVIDER_LOCATION_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(apiClient.create, [providerId], data);
    const { data: location, included } = result;
    const refinedLocation = refineProviderLocation(location, included);
    yield put({
      type: actionTypes.CREATE_PROVIDER_LOCATION_SUCCESS,
    });
    if (success) {
      yield call(success, refinedLocation);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_PROVIDER_LOCATION_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, providerLocationId, data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(apiClient.update, [providerId, providerLocationId], data);
    const { data: location, included } = result;
    const refinedLocation = refineProviderLocation(location, included);
    yield put({
      type: actionTypes.UPDATE_PROVIDER_LOCATION_SUCCESS,
    });
    if (success) {
      yield call(success, refinedLocation);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_PROVIDER_LOCATION_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, providerLocationId, success, error } = action.payload;
  try {
    yield call(apiClient.delete, [providerId, providerLocationId]);
    yield put({
      type: actionTypes.DELETE_PROVIDER_LOCATION_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_PROVIDER_LOCATION_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* ProviderLocationSaga() {
  yield takeEvery(actionTypes.GET_PROVIDER_LOCATIONS, getProviderLocations);
  yield takeEvery(actionTypes.FILTER_PROVIDER_LOCATIONS, getProviderLocations);
  yield takeEvery(actionTypes.GET_PROVIDER_LOCATION, getProviderLocation);
  yield takeEvery(actionTypes.CREATE_PROVIDER_LOCATION, createProviderLocation);
  yield takeEvery(actionTypes.DELETE_PROVIDER_LOCATION, deleteProviderLocation);
  yield takeEvery(actionTypes.UPDATE_PROVIDER_LOCATION, updateProviderLocation);
}
