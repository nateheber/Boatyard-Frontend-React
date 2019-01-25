import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { actionTypes } from '../actions/boats';
import { getBoatClient } from './sagaSelectors';

const refineBoats = (boats) => {
  return boats.map(boat => {
    return {
      id: boat.id,
      ...boat.attributes,
      relationships: boat.relationships,
    };
  });
};

function* getBoats(action) {
  const boatClient = yield select(getBoatClient);
  const { params, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(boatClient.list, params);
    const boats = sortBy(get(result, 'data', []), 'id');
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_BOATS_SUCCESS,
      payload: {
        boats: refineBoats(boats),
        included,
        perPage,
        total
      }
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_BOATS_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* getBoat(action) {
  const boatClient = yield select(getBoatClient);
  const { boatId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(boatClient.read, boatId);
    const { data: boat } = result;
    yield put({
      type: actionTypes.GET_BOAT_SUCCESS,
      payload: boat
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_BOAT_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* createBoat(action) {
  const boatClient = yield select(getBoatClient);
  const { data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(boatClient.create, data);
    yield put({
      type: actionTypes.CREATE_BOAT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_BOAT_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* updateBoat(action) {
  const boatClient = yield select(getBoatClient);
  const { boatId, data, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(boatClient.update, boatId, data);
    yield put({
      type: actionTypes.UPDATE_BOAT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_BOAT_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteBoat(action) {
  const boatClient = yield select(getBoatClient);
  const { boatId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(boatClient.delete, boatId);
    yield put({
      type: actionTypes.DELETE_BOAT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_BOAT_FAILURE, payload: result });
    if (error) {
      yield call(error);
    }
  }
}

export default function* BoatSaga() {
  yield takeEvery(actionTypes.GET_BOATS, getBoats);
  yield takeEvery(actionTypes.GET_BOAT, getBoat);
  yield takeEvery(actionTypes.CREATE_BOAT, createBoat);
  yield takeEvery(actionTypes.UPDATE_BOAT, updateBoat);
  yield takeEvery(actionTypes.DELETE_BOAT, deleteBoat);
}
