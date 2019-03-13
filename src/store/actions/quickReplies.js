import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_QUICK_REPLIES: '[QUICK_REPLIES] - Get quick replies',
  GET_QUICK_REPLIES_SUCCESS: '[QUICK_REPLIES] - Get quick replies Success',
  GET_QUICK_REPLIES_FAILURE: '[QUICK_REPLIES] - Get quick replies Failure',

  CREATE_QUICK_REPLY: '[QUICK_REPLIES] - Create new quick reply',
  CREATE_QUICK_REPLY_SUCCESS: '[QUICK_REPLIES] - Create new quick reply Success',
  CREATE_QUICK_REPLY_FAILURE: '[QUICK_REPLIES] - Create new quick reply Failure',

  UPDATE_QUICK_REPLY: '[QUICK_REPLIES] - Update quick reply',
  UPDATE_QUICK_REPLY_SUCCESS: '[QUICK_REPLIES] - Update quick reply Success',
  UPDATE_QUICK_REPLY_FAILURE: '[QUICK_REPLIES] - Update quick reply Failure',
};

export const GetQuickReplies = createAction(actionTypes.GET_QUICK_REPLIES, payload => payload);
export const GetQuickRepliesSuccess = createAction(actionTypes.GET_QUICK_REPLIES_SUCCESS);
export const GetQuickRepliesFailure = createAction(actionTypes.GET_QUICK_REPLIES_FAILURE);

export const CreateQuickReply = createAction(actionTypes.CREATE_QUICK_REPLY, payload => payload);
export const CreateQuickReplySuccess = createAction(actionTypes.CREATE_QUICK_REPLY_SUCCESS);
export const CreateQuickReplyFailure = createAction(actionTypes.CREATE_QUICK_REPLY_FAILURE);

export const UpdateQuickReply = createAction(actionTypes.UPDATE_QUICK_REPLY, payload => payload);
export const UpdateQuickReplySuccess = createAction(actionTypes.UPDATE_QUICK_REPLY_SUCCESS);
export const UpdateQuickReplyFailure = createAction(actionTypes.UPDATE_QUICK_REPLY_FAILURE);
