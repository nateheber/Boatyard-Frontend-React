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

  CREATE_CONVERSATION: '[CONVERSATIONS] - Create Conversation',
  CREATE_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Create Conversation Success',
  CREATE_CONVERSATION_FAILURE: '[CONVERSATIONS] - Create Conversation Failure',

  DELETE_CONVERSATION: '[CONVERSATIONS] - Delete Conversation',
  DELETE_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Delete Conversation Success',
  DELETE_CONVERSATION_FAILURE: '[CONVERSATIONS] - Delete Conversation Failure',

  SET_UI_STATUS: 'SET_UI_STATUS',
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

export const CreateConversation = createAction(actionTypes.CREATE_CONVERSATION, payload => payload);
export const CreateConversationSuccess = createAction(actionTypes.CREATE_CONVERSATION_SUCCESS);
export const CreateConversationFailure = createAction(actionTypes.CREATE_CONVERSATION_FAILURE);

export const DeleteConversation = createAction(actionTypes.DELETE_CONVERSATION, payload => payload);
export const DeleteConversationSuccess = createAction(actionTypes.DELETE_CONVERSATION_SUCCESS);
export const DeleteConversationFailure = createAction(actionTypes.DELETE_CONVERSATION_FAILURE);

export const SetMessageBarUIStatus = createAction(actionTypes.SET_UI_STATUS, payload => payload);
