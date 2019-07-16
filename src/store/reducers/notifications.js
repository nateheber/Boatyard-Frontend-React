import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { findIndex, update } from 'lodash';
import { actionTypes } from '../actions/notifications';

const initialState = {
  currentStatus: '',
  notifications: [],
  included: [],
  unreadNotifications: 0,
};


export default handleActions(
  {
    [actionTypes.GET_NOTICATIONS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.GET_NOTICATIONS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { unreadNotifications, notifications, included } = payload;
        draft.currentStatus = type;
        draft.unreadNotifications = unreadNotifications;
        draft.notifications = notifications;
        draft.included = included;
      }),
    [actionTypes.GET_NOTICATIONS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.READ_NOTIFICATION]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.READ_NOTIFICATION_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload: { id }} = action;
        const idx = findIndex(state.notifications, {id});
        const notifications = [...state.notifications];
        update(notifications[idx], 'attributes.read', read => true);
        draft.notifications = notifications;
        draft.currentStatus = type;
      })
    },
  initialState
);