import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, isEmpty } from 'lodash';
import querystring from 'query-string';

import { actions } from '../reducers/providerLocations';
import { getCustomApiClient } from './sagaSelectors';

// function* createRequest(action) {
// }

function* fetchRequest(action) {
  const { filter, providerId } = action.payload;
  const apiClient = yield select(getCustomApiClient);
  const queryString = querystring.stringify(filter);
  const result = yield call(apiClient.get, `/providers/${providerId}/locations?${queryString}` );
  const data = get(result, 'data', []);
  const included = get(result, 'data', []);
  yield put({
    type: actions.setProviderLocations,
    payload: { data, included }
  })
}

// function* deleteRequest(action) {
// }

// function* updateRequest(action) {
// }

export default function* ProviderLocations() {
  // yield takeEvery(actions.createProviderLocation, createRequest);
  yield takeEvery(actions.fetchProviderLocations, fetchRequest);
  // yield takeEvery(actions.deleteProviderLocation, deleteRequest);
  // yield takeEvery(actions.updateProviderLocation, updateRequest);
}
