import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty, hasIn } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { actionTypes } from '../actions/managements';
import { getManagementClient } from './sagaSelectors';
import { refactorIncluded } from 'utils/basic';

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
  let submissionParams = {};
  console.log(params);
  // if (!hasIn(params, 'management[order]')) {
  //   submissionParams = {
  //     ...params,
  //     'management[order]': 'name',
  //     'management[sort]': 'asc',
  //   };
  // } else {
  //   submissionParams = { ...params };
  // }
  //console.log(submissionParams);
  try {
    const result = yield call(managementClient.list, params);
    const managements = get(result, 'data', []);
    const included = get(result, 'included', []);
    console.log(managements);
    const { perPage, total } = result;
    const refactored = managements.map(management => ({
      id: management.id,
      type: management.type,
      ...management.attributes,
      relationships: management.relationships,
    }));
    yield put({
      type: actionTypes.GET_MANAGEMENTS_SUCCESS,
      payload: {
        managements: refactored,
        included,
        perPage,
        total
      }
    });
    if (success) {
      yield call(success, refactored);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_MANAGEMENTS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* filterManagements(action) {
  const managementClient = yield select(getManagementClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(managementClient.list, params);
    const managements = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    const refactored = managements.map(management => ({
      id: management.id,
      type: management.type,
      ...management.attributes,
      relationships: management.relationships,
    }));
    yield put({
      type: actionTypes.FILTER_MANAGEMENTS_SUCCESS,
      payload: {
        managements: refactored,
        included,
        perPage,
        total
      }
    });
    if (success) {
      yield call(success, refactored);
    }
  } catch (e) {
    yield put({ type: actionTypes.FILTER_MANAGEMENTS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { managementId, params, success, error } = action.payload;
  try {
    if (managementId) {
      const result = yield call(managementClient.read, managementId);
      const { data, included } = result;
      const refinedManagement = refineManagement(data, refactorIncluded(included));
      yield put({
        type: actionTypes.GET_MANAGEMENT_SUCCESS,
        management: refinedManagement
      });
      if (success) {
        yield call(success, refinedManagement);
      }
    } else {
      const result = yield call(managementClient.list, params);
      const managements = get(result, 'data', []);
      const included = get(result, 'included', []);
      if (managements.length > 0) {
        const refinedManagement = refineManagement(managements[0], refactorIncluded(included));
        yield put({
          type: actionTypes.GET_MANAGEMENT_SUCCESS,
          management: refinedManagement
        });
        if (success) {
          yield call(success, refinedManagement);
        }

      } else {
        yield put({ type: actionTypes.GET_MANAGEMENT_FAILURE, payload: { message: 'Cannot get management' } });
        if (error) {
          yield call(error, { message: 'Cannot get management' });
        }
      }
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { data: payload, success, error } = action.payload;
  try {
    const result = yield call(managementClient.create, payload);
    const { data, included } = result;
    const refinedManagement = refineManagement(data, refactorIncluded(included));
    yield put({
      type: actionTypes.CREATE_MANAGEMENT_SUCCESS,
      management: refinedManagement
    });
    if (success) {
      yield call(success, refinedManagement);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateManagement(action) {
  const managementClient = yield select(getManagementClient);
  const { managementId, data: payload, success, error } = action.payload;
  try {
    const result = yield call(managementClient.update, managementId, payload);
    const { data, included } = result;
    const refinedManagement = refineManagement(data, refactorIncluded(included));
    yield put({
      type: actionTypes.UPDATE_MANAGEMENT_SUCCESS,
      management: refinedManagement
    });
    if (success) {
      yield call(success, refinedManagement);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
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
      toastr.success('Success', 'Deleted successfully!');
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_MANAGEMENT_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* ManagementSaga() {
  yield takeEvery(actionTypes.GET_MANAGEMENTS, getManagements);
  yield takeEvery(actionTypes.FILTER_MANAGEMENTS, filterManagements);
  yield takeEvery(actionTypes.GET_MANAGEMENT, getManagement);
  yield takeEvery(actionTypes.CREATE_MANAGEMENT, createManagement);
  yield takeEvery(actionTypes.UPDATE_MANAGEMENT, updateManagement);
  yield takeEvery(actionTypes.DELETE_MANAGEMENT, deleteManagement);
}
