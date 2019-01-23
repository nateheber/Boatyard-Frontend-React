import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { actions } from '../reducers/providerLocationServices';

function* createRequest(action) {
  
}

function* fetchRequest(action) {
}

function* deleteRequest(action) {
}

function* updateRequest(action) {
}

export default function* Profile() {
  yield takeEvery(actions.createLocationService, createRequest);
  yield takeEvery(actions.fetchLocationServices, fetchRequest);
  yield takeEvery(actions.deleteLocationService, deleteRequest);
  yield takeEvery(actions.updateLocationService, updateRequest);
}
