import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/notifications';
import { getNotificationsClient } from './sagaSelectors';


function* getNotifications(action) {
  const notificationsClient = yield select(getNotificationsClient);
  let successType = actionTypes.GET_NOTICATIONS_SUCCESS;
  let failureType = actionTypes.GET_NOTICATIONS_FAILURE;
  const { params, success, error } = action.payload;
  try {
    const result = yield call(notificationsClient.list, params);
    const notifications = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { unreadNotifications } = result;
    yield put({
      type: successType,
      payload: {
        notifications,
        unreadNotifications,
        included
      }
    });
    if (success) {
      yield call(success, notifications);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* readNotification(action) {
  const notificationsClient = yield select(getNotificationsClient);
  let successType = actionTypes.READ_NOTIFICATION_SUCCESS;
  let failureType = actionTypes.READ_NOTIFICATION_FAILURE;
  const { id, success, error } = action.payload;
  try {
    yield call(notificationsClient.read, id);
    
    yield put({
      type: successType,
      payload: {
        id
      }
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* NotificationsSagas() {
  yield takeEvery(actionTypes.GET_NOTICATIONS, getNotifications);
  yield takeEvery(actionTypes.READ_NOTIFICATION, readNotification);
}
