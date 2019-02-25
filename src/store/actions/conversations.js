import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_CONVERSATIONS: '[CONVERSATIONS] - Get conversations',
  GET_CONVERSATIONS_SUCCESS: '[CONVERSATIONS] - Get conversations Success',
  GET_CONVERSATIONS_FAILURE: '[CONVERSATIONS] - Get conversations Failure',

  GET_CONVERSATION: '[CONVERSATIONS] - Get conversation',
  GET_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Get conversation Success',
  GET_CONVERSATION_FAILURE: '[CONVERSATIONS] - Get conversation Failure',

  CREATE_MESSAGE: '[CONVERSATIONS] - Create Message',
  CREATE_MESSAGE_SUCCESS: '[CONVERSATIONS] - Create Message Success',
  CREATE_MESSAGE_FAILURE: '[CONVERSATIONS] - Create Message Failure',
};

export const GetConversations = createAction(actionTypes.GET_CONVERSATIONS, payload => payload);
export const GetConversationsSuccess = createAction(actionTypes.GET_CONVERSATIONS_SUCCESS);
export const GetConversationsFailure = createAction(actionTypes.GET_CONVERSATIONS_FAILURE);

export const GetConversation = createAction(actionTypes.GET_CONVERSATION, payload => payload);
export const GetConversationSuccess = createAction(actionTypes.GET_CONVERSATION_SUCCESS);
export const GetConversationFailure = createAction(actionTypes.GET_CONVERSATION_FAILURE);

export const CreateMessage = createAction(actionTypes.CREATE_MESSAGE, payload => payload);
export const CreateMessageSuccess = createAction(actionTypes.CREATE_MESSAGE_SUCCESS);
export const CreateMessageFailure = createAction(actionTypes.CREATE_MESSAGE_FAILURE);
