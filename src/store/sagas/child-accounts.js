import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/child-accounts';
import { getChildAccountClient } from './sagaSelectors';

const refineChildAccounts = (childAccounts) => {
  return childAccounts.map(childAccount => {
    return {
      id: childAccount.id,
      ...childAccount.attributes
    };
  });
};

function* getChildAccounts(action) {
  const childAccountClient = yield select(getChildAccountClient);
  let successType = actionTypes.GET_CHILD_ACCOUNTS_SUCCESS;
  let failureType = actionTypes.GET_CHILD_ACCOUNTS_FAILURE;
  const { params, success, error } = action.payload;
  console.log('--------PARAMS----', params);
  try {
    const result = yield call(childAccountClient.list, params);
    const childAccounts = get(result, 'data', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_CHILD_ACCOUNTS: {
        successType = actionTypes.FILTER_CHILD_ACCOUNTS_SUCCESS;
        failureType = actionTypes.FILTER_CHILD_ACCOUNTS_FAILURE;
        break;
      }
      default:
    }
    const refinedChildAccounts = refineChildAccounts(childAccounts);
    yield put({
      type: successType,
      payload: {
        childAccounts: refinedChildAccounts,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedChildAccounts);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getChildAccount(action) {
  const childAccountClient = yield select(getChildAccountClient);
  const { childAccountId, success, error } = action.payload;
  try {
    const result = yield call(childAccountClient.read, childAccountId);
    const { data: childAccount } = result;
    yield put({
      type: actionTypes.GET_CHILD_ACCOUNT_SUCCESS,
      payload: childAccount
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_CHILD_ACCOUNT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createChildAccount(action) {
  const childAccountClient = yield select(getChildAccountClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(childAccountClient.create, data);
    yield put({
      type: actionTypes.CREATE_CHILD_ACCOUNT_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CHILD_ACCOUNT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateChildAccount(action) {
  const childAccountClient = yield select(getChildAccountClient);
  const { childAccountId, data, success, error } = action.payload;
  try {
    yield call(childAccountClient.update, childAccountId, data);
    yield put({
      type: actionTypes.UPDATE_CHILD_ACCOUNT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_CHILD_ACCOUNT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteChildAccount(action) {
  const childAccountClient = yield select(getChildAccountClient);
  const { childAccountId, success, error } = action.payload;
  try {
    yield call(childAccountClient.delete, childAccountId);
    yield put({
      type: actionTypes.DELETE_CHILD_ACCOUNT_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_CHILD_ACCOUNT_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* ChildAccountSaga() {
  yield takeEvery(actionTypes.GET_CHILD_ACCOUNTS, getChildAccounts);
  yield takeEvery(actionTypes.FILTER_CHILD_ACCOUNTS, getChildAccounts);
  yield takeEvery(actionTypes.GET_CHILD_ACCOUNT, getChildAccount);
  yield takeEvery(actionTypes.CREATE_CHILD_ACCOUNT, createChildAccount);
  yield takeEvery(actionTypes.UPDATE_CHILD_ACCOUNT, updateChildAccount);
  yield takeEvery(actionTypes.DELETE_CHILD_ACCOUNT, deleteChildAccount);
}
