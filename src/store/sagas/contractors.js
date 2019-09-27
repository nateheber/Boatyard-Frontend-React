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
    let result = yield call(customClient.get, `/providers/${providerId}/locations/${providerLocationId}/directories`);
    result = normalize(result);
    console.log(result);
    const contractors = sortBy(
      get(result, `providerLocations.${providerLocationId}.relationships.userContractors.data`).map(d => {
        return {
          user: get(result, `${d.type}.${d.id}`),
        };
      }),
      ['user.attributes.firstName', 'user.attributes.lastName']
    );
    yield put({
      type: actionTypes.GET_CONTRACTORS_SUCCESS,
      payload: {contractors}
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

export default function* CategorySaga() {
  yield takeEvery(actionTypes.GET_CONTRACTORS, getContractors);
}
