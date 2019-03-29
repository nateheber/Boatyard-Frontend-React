import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, set, isEmpty } from 'lodash';

import { actionTypes } from '../actions/managements';
import { getManagementClient } from './sagaSelectors';

function refactorIncluded(included) {
  let refactored = {};
  for ( let i = 0; i < included.length; i += 1 ) {
    const { type, id } = included[i]
    set(refactored, `${type}.${id}`, {...included[i]})
  }
  return refactored;
}

const refineManagement = (management, included) => {
  for(const key in management.relationships) {
    let value = management.relationships[key].data;
    if(!isEmpty(value) && value.hasOwnProperty('type')) {
      management.relationships[key] = included[value.type][value.id];
    }
  }
  return management;
}

function* getManagements(action) {
  const managementClient = yield select(getManagementClient);
  const { params, success, error } = action.payload;
  const result = yield call(managementClient.list, params);
  try {
    const managements = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_MANAGEMENTS_SUCCESS,
      payload: {
        managements: managements.map(management => ({
          id: management.id,
          type: management.type,
          ...management.attributes,
          relationships: management.relationships,
        })),
        included,
        perPage,
        total
      }
    });
    if (success) {
      yield call(success, managements);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_MANAGEMENTS_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { managementId, success, error } = action.payload;
  const result = yield call(managementClient.read, managementId);
  try {
    const { data, included } = result;
    yield put({
      type: actionTypes.GET_MANAGEMENT_SUCCESS,
      management: refineManagement(data, refactorIncluded(included))
    });
    if (success) {
      yield call(success, data, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { data, success, error } = action.payload;
  const result = yield call(managementClient.create, data);
  try {
    const { data, included } = result;
    yield put({
      type: actionTypes.CREATE_MANAGEMENT_SUCCESS,
      management: refineManagement(data, refactorIncluded(included))
    });
    if (success) {
      yield call(success, data, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { managementId, data, success, error } = action.payload;
  const result = yield call(managementClient.update, managementId, data);
  try {
    const { data, included } = result;
    yield put({
      type: actionTypes.UPDATE_MANAGEMENT_SUCCESS,
      management: refineManagement(data, refactorIncluded(included))
    });
    if (success) {
      yield call(success, data, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { managementId, success, error } = action.payload;
  try {
    yield call(managementClient.delete, managementId);
    yield put({
      type: actionTypes.DELETE_MANAGEMENT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* ManagementSaga() {
  yield takeEvery(actionTypes.GET_MANAGEMENTS, getManagements);
  yield takeEvery(actionTypes.GET_MANAGEMENT, getManagement);
  yield takeEvery(actionTypes.CREATE_MANAGEMENT, createManagement);
  yield takeEvery(actionTypes.UPDATE_MANAGEMENT, updateManagement);
  yield takeEvery(actionTypes.DELETE_MANAGEMENT, deleteManagement);
}
