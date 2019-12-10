import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/services';
import { getServiceClient, getNormalServiceClient } from './sagaSelectors';

const refineService = (service) => {
  return {
    id: service.id,
    type: service.type,
    ...service.attributes,
    // ...service.relationships,
    relationships: service.relationships
  };
}
const refineServices = (services) => {
  return services.map(service => refineService(service));
};

function refineServceData(data) {
  if(data.cost_type === 'Length') {
    return {...data, cost_unit_text: '/ft'};
  }

  if (data.cost_type === 'Gallons') {
    return {...data, cost_unit_text: '/gal'};
  }

  if (data.cost_type === 'Hour') {
    return {...data, cost_unit_text: '/hr'};
  }

  if (data.cost_type === 'Quantity') {
    return {...data, cost_unit_text: '/each'};
  }

  return data;
}

function* getServices(action) {
  const serviceClient = yield select(getServiceClient);
  console.log(serviceClient);
  let successType = actionTypes.GET_SERVICES_SUCCESS;
  let failureType = actionTypes.GET_SERVICES_FAILURE;
  const { params, success, error } = action.payload;
  params.all = true;
  console.log(params);
  try {
    const result = yield call(serviceClient.list, params);
    const services = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_SERVICES: {
        successType = actionTypes.FILTER_SERVICES_SUCCESS;
        failureType = actionTypes.FILTER_SERVICES_FAILURE;
        break;
      }
      default:
    }
    const refinedServices = refineServices(services);
    yield put({
      type: successType,
      payload: {
        services: refinedServices,
        included,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedServices);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getAllServices(action) {
  const serviceClient = yield select(getNormalServiceClient);
  let successType = actionTypes.GET_ALL_SERVICES_SUCCESS;
  let failureType = actionTypes.GET_ALL_SERVICES_FAILURE;
  const { params, success, error } = action.payload;
  try {
    const result = yield call(serviceClient.list, params);
    const services = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_ALL_SERVICES: {
        successType = actionTypes.FILTER_ALL_SERVICES_SUCCESS;
        failureType = actionTypes.FILTER_ALL_SERVICES_FAILURE;
        break;
      }
      default:
    }
    const refinedServices = refineServices(services);
    yield put({
      type: successType,
      payload: {
        services: refinedServices,
        included,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedServices);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getService(action) {
  const serviceClient = yield select(getServiceClient);
  const { serviceId, success, error } = action.payload;
  try {
    const result = yield call(serviceClient.read, serviceId);
    const { data, included } = result;
    const refinedData = {
      id: data.id,
      type: data.type,
      ...data.attributes,
      ...data.relationships
    };

    yield put({
      type: actionTypes.GET_SERVICE_SUCCESS,
      payload: refinedData
    });
    if (success) {
      yield call(success, refinedData, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_SERVICE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createService(action) {
  const serviceClient = yield select(getServiceClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(serviceClient.create, refineServceData(data));
    const service = refineService(get(result, 'data', {}));
    yield put({
      type: actionTypes.CREATE_SERVICE_SUCCESS,
      payload: service
    });
    if (success) {
      yield call(success, service);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_SERVICE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateService(action) {
  const serviceClient = yield select(getServiceClient);
  const { serviceId, data, success, error } = action.payload;
  try {

    yield call(serviceClient.update, serviceId, refineServceData(data));
    yield put({
      type: actionTypes.UPDATE_SERVICE_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_SERVICE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteService(action) {
  const serviceClient = yield select(getServiceClient);
  const { serviceId, success, error } = action.payload;
  try {
    yield call(serviceClient.delete, serviceId);
    yield put({
      type: actionTypes.DELETE_SERVICE_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_SERVICE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* ServiceSaga() {
  yield takeEvery(actionTypes.GET_SERVICES, getServices);
  yield takeEvery(actionTypes.FILTER_SERVICES, getServices);
  yield takeEvery(actionTypes.GET_ALL_SERVICES, getAllServices);
  yield takeEvery(actionTypes.FILTER_ALL_SERVICES, getAllServices);
  yield takeEvery(actionTypes.GET_SERVICE, getService);
  yield takeEvery(actionTypes.CREATE_SERVICE, createService);
  yield takeEvery(actionTypes.DELETE_SERVICE, deleteService);
  yield takeEvery(actionTypes.UPDATE_SERVICE, updateService);
}
