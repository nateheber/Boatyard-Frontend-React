import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_NOTICATIONS: 'GET_NOTICATIONS',
  GET_NOTICATIONS_SUCCESS: 'GET_NOTICATIONS_SUCCESS',
  GET_NOTICATIONS_FAILURE: 'GET_NOTICATIONS_FAILURE',

  READ_NOTIFICATION: 'READ_NOTIFICATION',
  READ_NOTIFICATION_SUCCESS: 'READ_NOTIFICATION_SUCCESS',
  READ_NOTIFICATION_FAILURE: 'READ_NOTIFICATION_FAILURE',
};

export const GetNotifications = createAction(actionTypes.GET_NOTICATIONS, payload => payload);
export const GetNotificationsSuccess = createAction(actionTypes.GET_NOTICATIONS_SUCCESS);
export const GetNotificationsFailure = createAction(actionTypes.GET_NOTICATIONS_FAILURE);

export const readNotification = createAction(actionTypes.READ_NOTIFICATION, payload => payload);
export const readNotificationSuccess = createAction(actionTypes.READ_NOTIFICATION_SUCCESS);
export const readNotificationFailure = createAction(actionTypes.READ_NOTIFICATION_FAILURE);