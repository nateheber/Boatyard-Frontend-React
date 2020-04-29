import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, hasIn, isArray, isEmpty } from 'lodash';

import { actionTypes } from '../actions/providerLocations';
import { getProviderLocationClient, getProviderLocationServiceClient, getCustomApiClient } from './sagaSelectors';
import { refactorIncluded } from 'utils/basic';

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
  const refactoredIncluded = refactorIncluded(included);
  const services = [];
  const relationships = get(location, 'relationships');
  const parsedRelationships = [];
  for (const key in relationships) {
    const data = get(relationships, `[${key}].data`);
    const type = get(data, 'type');
    const id = get(data, 'id');
    if (!isEmpty(data) && data !== null) {
      if (!isArray(data)) {
        parsedRelationships.push(get(refactoredIncluded, `[${type}][${id}]`));
      } else {
        const arrayData = data.map(relation => {
          const type = get(relation, 'type');
          const id = get(relation, 'id');
          if (type === 'services') {
            services.push(get(refactoredIncluded, `[${type}][${id}]`));
          }
          return get(refactoredIncluded, `[${type}][${id}]`);
        });
        parsedRelationships.push(arrayData);
      }
    }
  }
  const relations = {};
  for (const index in parsedRelationships) {
    const item = parsedRelationships[index];
    if (!isEmpty(item)) {
      if (!isArray(item)) {
        relations[item.type] = item;
      } else {
        for(const index in item) {
          if (!relations[item[index].type]) {
            relations[item[index].type] = [];
          }
          if (item[index].type === 'provider_location_services') {
            const refactoredItem = item[index];
            const service = services.find(s => s.id === get(refactoredItem, 'attributes.serviceId', '').toString());
            refactoredItem.attributes['iconId'] = get(service, 'attributes.iconId');
            relations[item[index].type].push(refactoredItem);
          } else {
            relations[item[index].type].push(item[index]);
          }
        }
      }
    }
  }
  return { ...location, relationships: relations };
};

const refineProviderLocationServices = (locationServices, included) => {
  // const refactoredIncluded = refactorIncluded(included);
  const refactoredServices = [];
  // const services = get(refactoredIncluded, 'services');
  for (const index in locationServices) {
    const item = locationServices[index];
    // const service = find(services, s => `${s.id}` === `${get(item, 'attributes.serviceId', '')}`);
    // item.attributes['iconId'] = get(service, 'attributes.iconId');
    refactoredServices.push(item);
  }
  return refactoredServices;
};

function* getProviderLocations(action) {
  const apiClient = yield select(getProviderLocationClient);
  let successType = actionTypes.GET_PROVIDER_LOCATIONS_SUCCESS;
  let failureType = actionTypes.GET_PROVIDER_LOCATIONS_FAILURE;
  let { providerId, params, success, error } = action.payload;
  params = params || {};
  params.per_page = 1000;
  params.all = true;
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
  try {
    const result = yield call(apiClient.list, [providerId], submissionParams);
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
      yield call(error, e);
    }
  }
}

function* searchProviderLocations(action) {
  const apiClient = yield select(getCustomApiClient);
  let { params, success, error } = action.payload;
  params = params || {};
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
  try {
    const result = yield call(apiClient.list, `/provider_locations`, submissionParams);

    const providerLocations = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    const refinedLocations = refineProviderLocations(providerLocations);
    yield put({
      type: actionTypes.SEARCH_PROVIDER_LOCATIONS_SUCCESS,
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
    yield put({ type: actionTypes.SEARCH_PROVIDER_LOCATIONS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, providerLocationId, success, error } = action.payload;
  try {
    const result = yield call(apiClient.read, [providerId, providerLocationId]);
    const { data, included } = result;
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
      yield call(error, e);
    }
  }
}

function* getProviderLocationServices(action) {
  const apiClient = yield select(getProviderLocationServiceClient);
  const { providerId, providerLocationId, params, success, error } = action.payload;
  // params.all = true;
  try {
    const result = yield call(apiClient.list, [providerId, providerLocationId], params);
    const { data, included } = result;
    const locationServices = refineProviderLocationServices(data, included);
    yield put({
      type: actionTypes.GET_PROVIDER_LOCATION_SERVICES_SUCCESS,
      payload: refineProviderLocations(locationServices)
    });
    if (success) {
      yield call(success, locationServices);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_PROVIDER_LOCATION_SERVICES_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, data, success, error } = action.payload;
  try {
    const result = yield call(apiClient.create, [providerId], data);
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
      yield call(error, e);
    }
  }
}

function* updateProviderLocation(action) {
  const apiClient = yield select(getProviderLocationClient);
  const { providerId, providerLocationId, data, success, error } = action.payload;
  try {
    const result = yield call(apiClient.update, [providerId, providerLocationId], data);
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
      yield call(error, e);
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
      yield call(error, e);
    }
  }
}

function* cloneProviderLocationTemplate(action) {
  // const apiClient = yield select(getProviderLocationClient);
  // const { providerId, providerLocationId, data, success, error } = action.payload;
  // try {
  //   const result = yield call(apiClient.update, [providerId, providerLocationId], data);
  //   const { data: location, included } = result;
  //   const refinedLocation = refineProviderLocation(location, included);
  //   yield put({
  //     type: actionTypes.UPDATE_PROVIDER_LOCATION_SUCCESS,
  //   });
  //   if (success) {
  //     yield call(success, refinedLocation);
  //   }
  // } catch (e) {
  //   yield put({ type: actionTypes.UPDATE_PROVIDER_LOCATION_FAILURE, payload: e });
  //   if (error) {
  //     yield call(error, e);
  //   }
  // }
}

export default function* ProviderLocationSaga() {
  yield takeEvery(actionTypes.GET_PROVIDER_LOCATIONS, getProviderLocations);
  yield takeEvery(actionTypes.FILTER_PROVIDER_LOCATIONS, getProviderLocations);
  yield takeEvery(actionTypes.SEARCH_PROVIDER_LOCATIONS, searchProviderLocations);
  yield takeEvery(actionTypes.GET_PROVIDER_LOCATION, getProviderLocation);
  yield takeEvery(actionTypes.GET_PROVIDER_LOCATION_SERVICES, getProviderLocationServices);
  yield takeEvery(actionTypes.CREATE_PROVIDER_LOCATION, createProviderLocation);
  yield takeEvery(actionTypes.DELETE_PROVIDER_LOCATION, deleteProviderLocation);
  yield takeEvery(actionTypes.UPDATE_PROVIDER_LOCATION, updateProviderLocation);
  yield takeEvery(actionTypes.CLONE_PROVIDER_LOCATION_TEMPLATE, cloneProviderLocationTemplate);
}
