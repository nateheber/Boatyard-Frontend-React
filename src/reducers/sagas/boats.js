import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../boats';
import { getBoatClient } from './sagaSelectors';

function* createRequest(action) {
  const boatClient = yield select(getBoatClient);
  yield call(boatClient.create, action.payload);
  yield put({
    type: actions.fetchBoats
  });
}

function* fetchRequest(action) {
  const boatClient = yield select(getBoatClient);
  const result = yield call(boatClient.list);
  const boats = get(result, 'data', []);
  yield put({
    type: actions.setBoats,
    payload: boats.map(boat => ({
      id: boat.id,
      ...boat.attributes
    }))
  });
}

function* deleteRequest(action) {
  const boatClient = yield select(getBoatClient);
  yield call(boatClient.delete, action.payload);
}

function* updateRequest(action) {
  const boatClient = yield select(getBoatClient);
  const { id, data } = action.payload;
  yield call(boatClient.update, id, data);
  yield put({
    type: actions.fetchBoats
  });
}

function* getUserBoatRequest(action) {
  // const boatClient = yield select(getBoatClient);
  // const { payload: userId } = action;
  // yield call(boatClient.list, 0, )
}

export default function* Profile() {
  yield takeEvery(actions.createBoats, createRequest);
  yield takeEvery(actions.fetchBoats, fetchRequest);
  yield takeEvery(actions.deleteBoats, deleteRequest);
  yield takeEvery(actions.updateBoats, updateRequest);
  yield takeEvery(actions.getUserBoats, getUserBoatRequest);
}
