import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/quickReplies';
import { getQuickRepliesClient, getPrivilege, getUserId } from './sagaSelectors';

function* getQuickReplies(action) {
  const apiClient = yield select(getQuickRepliesClient);
  const privilege = yield select(getPrivilege);
  let successType = actionTypes.GET_QUICK_REPLIES_SUCCESS;
  let failureType = actionTypes.GET_QUICK_REPLIES_FAILURE;
  const { params, success, error } = action.payload;
  let result = null;
  try {
    let sendingParam;
    if (privilege === 'admin') {
      const userId = yield select(getUserId);
      sendingParam = {
        ...params,
        'quick_reply[user_id]': userId
      }
    } else {
      sendingParam = params;
    }
    result = yield call(apiClient.list, sendingParam);
    const quickReplies = get(result, 'data', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_ICONS: {
        successType = actionTypes.FILTER_ICONS_SUCCESS;
        failureType = actionTypes.FILTER_ICONS_FAILURE;
        break;
      }
      default:
    }
    yield put({
      type: successType,
      payload: {
        quickReplies,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, quickReplies);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createQuickReply(action) {
  const apiClient = yield select(getQuickRepliesClient);
  const privilege = yield select(getPrivilege);
  const { data, success, error } = action.payload;
  let sendingData;
  if (privilege === 'admin') {
    const userId = yield select(getUserId);
    sendingData = {
      ...data,
      user_id: userId,
    };
  } else {
    sendingData = data;
  }
  try {
    const result = yield call(apiClient.create, sendingData);
    yield put({
      type: actionTypes.CREATE_QUICK_REPLY_SUCCESS,
    });
    yield put({
      type: actionTypes.GET_QUICK_REPLIES,
      payload: {
        params: {}
      }
    })
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_QUICK_REPLY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateQuickReply(action) {
  const apiClient = yield select(getQuickRepliesClient);
  const { quickReplyId, data, success, error } = action.payload;
  try {
    const result = yield call(apiClient.update, quickReplyId, data);
    yield put({
      type: actionTypes.UPDATE_QUICK_REPLY_SUCCESS,
    });
    yield put({
      type: actionTypes.GET_QUICK_REPLIES,
      payload: {
        params: {}
      }
    })
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_QUICK_REPLY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteQuickReplies(action) {
  const ids = get(action, 'payload', []);
  for (let i = 0; i < ids.length; i += 1) {
    yield put({
      type: actionTypes.DELETE_QUICK_REPLY,
      payload: { quickReplyId: ids[i] }
    });
  }
}

function* deleteQuickReply(action) {
  const { quickReplyId, success, error } = action.payload;
  const apiClient = yield select(getQuickRepliesClient);
  try {
    yield call(apiClient.delete, quickReplyId);
    yield put({
      type: actionTypes.DELETE_QUICK_REPLY_SUCCESS,
    });
    yield put({
      type: actionTypes.GET_QUICK_REPLIES,
      payload: {
        params: {}
      }
    })
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_QUICK_REPLY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* QuickReply() {
  yield takeEvery(actionTypes.GET_QUICK_REPLIES, getQuickReplies);
  yield takeEvery(actionTypes.CREATE_QUICK_REPLY, createQuickReply);
  yield takeEvery(actionTypes.UPDATE_QUICK_REPLY, updateQuickReply);
  yield takeEvery(actionTypes.DELETE_QUICK_REPLIES, deleteQuickReplies);
  yield takeEvery(actionTypes.DELETE_QUICK_REPLY, deleteQuickReply);
}
