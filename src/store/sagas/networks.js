import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { actionTypes } from '../actions/networks';
import { getNetworkClient } from './sagaSelectors';

const refineNetworks = (networks) => {
  return networks.map(network => {
    return {
      id: network.id,
      ...network.attributes,
      relationships: network.relationships,
    };
  });
};

function* getNetworks(action) {
  const networkClient = yield select(getNetworkClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(networkClient.list, params);
    const networks = sortBy(get(result, 'data', []), 'id');
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_NETWORKS_SUCCESS,
      payload: {
        networks: refineNetworks(networks),
        included,
        perPage,
        total
      }
    });
    if (success) {
      yield call(success, refineNetworks(networks), included);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_NETWORKS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getNetwork(action) {
  const networkClient = yield select(getNetworkClient);
  const { networkId, success, error } = action.payload;
  try {
    const result = yield call(networkClient.read, networkId);
    const { data: network } = result;
    yield put({
      type: actionTypes.GET_NETWORK_SUCCESS,
      payload: network
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_NETWORK_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createNetwork(action) {
  const networkClient = yield select(getNetworkClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(networkClient.create, data);
    yield put({
      type: actionTypes.CREATE_NETWORK_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_NETWORK_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateNetwork(action) {
  const networkClient = yield select(getNetworkClient);
  const { networkId, data, success, error } = action.payload;
  try {
    yield call(networkClient.update, networkId, data);
    yield put({
      type: actionTypes.UPDATE_NETWORK_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_NETWORK_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteNetwork(action) {
  const networkClient = yield select(getNetworkClient);
  const { networkId, success, error } = action.payload;
  try {
    yield call(networkClient.delete, networkId);
    yield put({
      type: actionTypes.DELETE_NETWORK_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_NETWORK_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* NetworkSaga() {
  yield takeEvery(actionTypes.GET_NETWORKS, getNetworks);
  yield takeEvery(actionTypes.GET_NETWORK, getNetwork);
  yield takeEvery(actionTypes.CREATE_NETWORK, createNetwork);
  yield takeEvery(actionTypes.UPDATE_NETWORK, updateNetwork);
  yield takeEvery(actionTypes.DELETE_NETWORK, deleteNetwork);
}
