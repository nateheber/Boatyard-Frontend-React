import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { actions } from '../reducers/boats';
import { getBoatClient } from './sagaSelectors';

function* createRequest(action) {
  const boatClient = yield select(getBoatClient);
  yield call(boatClient.create, action.payload);
}

function* fetchRequest(action) {
  const boatClient = yield select(getBoatClient);
  const result = yield call(boatClient.list);
  const boats = sortBy(get(result, 'data', []), 'id')
  const included = get(result, 'included', []);
  yield put({
    type: actions.setBoats,
    payload: {
      boats: boats.map(boat => ({
        id: boat.id,
        ...boat.attributes
      })),
      included,
    }
  });
}

function* deleteRequest(action) {
  const boatClient = yield select(getBoatClient);
  yield call(boatClient.delete, action.payload);
}

function* updateRequest(action) {
  const boatClient = yield select(getBoatClient);
  const { id, data, callback } = action.payload;
  yield call(boatClient.update, id, data);
  if (callback) {
    yield call(callback)
  }
}

function* getUserBoatRequest(action) {
  const boatClient = yield select(getBoatClient)
  const { payload: { userId, callback } } = action
  const result = yield call(boatClient.list, { page: 0, 'boat[user_id]': userId })
  const boats = sortBy(get(result, 'data', []), 'id')
  const included = get(result, 'included', [])
  yield put({
    type: actions.setBoats,
    payload: {
      boats: boats.map(boat => ({
        id: boat.id,
        ...boat.attributes,
      })),
      included,
    }
  })
  if (callback) {
    yield call(callback, boats)
  }
}

export default function* Profile() {
  yield takeEvery(actions.createBoats, createRequest);
  yield takeEvery(actions.fetchBoats, fetchRequest);
  yield takeEvery(actions.deleteBoats, deleteRequest);
  yield takeEvery(actions.updateBoats, updateRequest);
  yield takeEvery(actions.getUserBoats, getUserBoatRequest);
}
