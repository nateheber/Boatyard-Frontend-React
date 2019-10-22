import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';
import normalize from 'json-api-normalizer';
import { actionTypes } from '../actions/contractors';
import { getCustomApiClient } from './sagaSelectors';

function* getContractors({payload}) {
  const {success, error } = payload;
  const customClient = yield select(getCustomApiClient);
  const { providerId, providerLocationId } = yield select(state => state.auth);

  try {
    let result = yield call(customClient.get, `/providers/${providerId}/locations/${providerLocationId}/directories`, 'v3');
    result = normalize(result);
    const locationDirectories = get(result, 'providerLocationDirectories');
    let contractors = [];
    for(const dirId in locationDirectories) {
      contractors.push(locationDirectories[dirId]);
    }
    contractors = sortBy(
      contractors.map(d => {
        return {
          id: d.id,
          type: d.type,
          ...d.attributes,
          user: get(result, `users.${d.attributes.contactableId}`)
        };
      }),
      ['user.attributes.firstName', 'user.attributes.lastName']
    );
    yield put({
      type: actionTypes.GET_CONTRACTORS_SUCCESS,
      payload: contractors
    });
    if (success) {
      yield call(success, contractors);
    }
  } catch (e) {
    yield put({
      type: actionTypes.GET_CONTRACTORS_FAILURE,
      payload: {errors: e}
    });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getContractor({payload}) {
  const {contractorId, success, error } = payload;
  const customClient = yield select(getCustomApiClient);
  const { providerId, providerLocationId } = yield select(state => state.auth);
  try {
    let result = yield call(customClient.get, `/providers/${providerId}/locations/${providerLocationId}/directories/${contractorId}`, 'v3');
    const normalized = normalize(result);
    const { data: { id, type, attributes } } = result;
    const contractor = { id, type, ...attributes, user: get(normalized, `users.${attributes.contactableId}`) };
    yield put({
      type: actionTypes.GET_CONTRACTOR_SUCCESS,
      payload: contractor
    });
    if (success) {
      yield call(success, contractor);
    }
  } catch (e) {
    yield put({
      type: actionTypes.GET_CONTRACTOR_FAILURE,
      payload: {errors: e}
    });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createContractor(action) {
  const { data, success, error } = action.payload;
  const customClient = yield select(getCustomApiClient);
  const { providerId, providerLocationId } = yield select(state => state.auth);
  try {
    const result = yield call(customClient.post, `/providers/${providerId}/locations/${providerLocationId}/directories`, data, 'v3');
    const { data: { id, attributes, relationships }, included } = result;
    const contractor = { id, ...attributes, relationships, included };
    yield put({
      type: actionTypes.CREATE_CONTRACTOR_SUCCESS,
      payload: contractor
    });
    if (success) {
      yield call(success, result);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CONTRACTOR_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateContractor(action) {
  const { contractorId, data, success, error } = action.payload;
  const customClient = yield select(getCustomApiClient);
  const { providerId, providerLocationId } = yield select(state => state.auth);
  try {
    const result = yield call(customClient.patch, `/providers/${providerId}/locations/${providerLocationId}/directories/${contractorId}`, data, 'v3');
    const { data: { id, attributes, relationships }, included } = result;
    const contractor = { id, ...attributes, relationships, included };
    yield put({
      type: actionTypes.UPDATE_CONTRACTOR_SUCCESS,
      payload: contractor
    });
    if (success) {
      yield call(success, result);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_CONTRACTOR_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteContractor(action) {
  const { contractorId, success, error } = action.payload;
  const customClient = yield select(getCustomApiClient);
  const { providerId, providerLocationId } = yield select(state => state.auth);
  try {
    const result = yield call(customClient.delete, `/providers/${providerId}/locations/${providerLocationId}/directories/${contractorId}`, 'v3');
    yield put({
      type: actionTypes.DELETE_CONTRACTOR_SUCCESS
    });
    if (success) {
      yield call(success, result);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_CONTRACTOR_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* CategorySaga() {
  yield takeEvery(actionTypes.GET_CONTRACTORS, getContractors);
  yield takeEvery(actionTypes.GET_CONTRACTOR, getContractor);
  yield takeEvery(actionTypes.CREATE_CONTRACTOR, createContractor);
  yield takeEvery(actionTypes.UPDATE_CONTRACTOR, updateContractor);
  yield takeEvery(actionTypes.DELETE_CONTRACTOR, deleteContractor);
}

