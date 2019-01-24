import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';

import { actions } from '../reducers/providerLocationServices';
import { getProviderLocationServiceClient } from './sagaSelectors';

// function* createRequest(action) {
// }

function* fetchRequest(action) {
  const filter = action.payload;
  const apiClient = yield select(getProviderLocationServiceClient)
  const result = yield call(apiClient.list, filter);
  console.log(result);
  // const data = get(result, 'data', []);
  // const included = get(result, 'data', []);
  // yield put({
  //   type: actions.setProviderLocations,
  //   payload: { data, included }
  // })
}

// function* deleteRequest(action) {
// }

// function* updateRequest(action) {
// }

export default function* ProviderLocations() {
  // yield takeEvery(actions.createProviderLocation, createRequest);
  yield takeEvery(actions.fetchProviderLocationServices, fetchRequest);
  // yield takeEvery(actions.deleteProviderLocation, deleteRequest);
  // yield takeEvery(actions.updateProviderLocation, updateRequest);
}
