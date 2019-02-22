import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_CONVERSATIONS: '[CONVERSATIONS] - Get conversations',
  GET_CONVERSATIONS_SUCCESS: '[CONVERSATIONS] - Get conversations Success',
  GET_CONVERSATIONS_FAILURE: '[CONVERSATIONS] - Get conversations Failure',

  GET_CONVERSATION: '[CONVERSATIONS] - Get conversation',
  GET_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Get conversation Success',
  GET_CONVERSATION_FAILURE: '[CONVERSATIONS] - Get conversation Failure',

  CREATE_CONVERSATION: '[CONVERSATIONS] - Create new conversation',
  CREATE_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Create new conversation Success',
  CREATE_CONVERSATION_FAILURE: '[CONVERSATIONS] - Create new conversation Failure',

  UPDATE_CONVERSATION: '[CONVERSATIONS] - Update conversation',
  UPDATE_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Update Success',
  UPDATE_CONVERSATION_FAILURE: '[CONVERSATIONS] - Update conversation Failure',

  DELETE_CONVERSATION: '[CONVERSATIONS] - Delete conversation',
  DELETE_CONVERSATION_SUCCESS: '[CONVERSATIONS] - Delete conversation Success',
  DELETE_CONVERSATION_FAILURE: '[CONVERSATIONS] - Delete conversation Failure'
};

export const GetConversations = createAction(actionTypes.GET_CONVERSATIONS, payload => payload);
export const GetConversationsSuccess = createAction(actionTypes.GET_CONVERSATIONS_SUCCESS);
export const GetConversationsFailure = createAction(actionTypes.GET_CONVERSATIONS_FAILURE);

export const GetConversation = createAction(actionTypes.GET_CONVERSATION, payload => payload);
export const GetConversationSuccess = createAction(actionTypes.GET_CONVERSATION_SUCCESS);
export const GetConversationFailure = createAction(actionTypes.GET_CONVERSATION_FAILURE);

export const CreateConversation = createAction(actionTypes.CREATE_CONVERSATION, payload => payload);
export const CreateConversationSuccess = createAction(actionTypes.CREATE_CONVERSATION_SUCCESS);
export const CreateConversationFailure = createAction(actionTypes.CREATE_CONVERSATION_FAILURE);

export const UpdateConversation = createAction(actionTypes.UPDATE_CONVERSATION, payload => payload);
export const UpdateConversationSuccess = createAction(actionTypes.UPDATE_CONVERSATION_SUCCESS);
export const UpdateConversationFailure = createAction(actionTypes.UPDATE_CONVERSATION_FAILURE);

export const DeleteConversation = createAction(actionTypes.DELETE_CONVERSATION, payload => payload);
export const DeleteConversationSuccess = createAction(actionTypes.DELETE_CONVERSATION_SUCCESS);
export const DeleteConversationFailure = createAction(actionTypes.DELETE_CONVERSATION_FAILURE);
