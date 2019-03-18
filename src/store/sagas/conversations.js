import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import * as APIGenerator from '../../api';
import { actionTypes } from '../actions/conversations';
import { getConversationClient, getMessageClient, getPrivilege } from './sagaSelectors';

const refineConversations = (conversations) => {
  return conversations.map(conversation => {
    return {
      id: conversation.id,
      ...conversation.attributes,
      relationships: conversation.relationships,
    };
  });
};

function* getConversations(action) {
  const conversationClient = yield select(getConversationClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(conversationClient.list, params);
    const conversations = sortBy(get(result, 'data', []), 'id');
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_CONVERSATIONS_SUCCESS,
      payload: {
        conversations: refineConversations(conversations),
        included,
        perPage,
        total
      }
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_CONVERSATIONS_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getConversation(action) {
  const privilege = select(getPrivilege);
  const apiClient = new APIGenerator.customApiClient(privilege === 'provider' ? 'provider' : 'basic');
  const { conversationId, onlyCallback, success, error } = action.payload;
  try {
    const result = yield call(apiClient.get, `/conversations/${conversationId}/messages`);
    const { data, included } = result;
    if (!onlyCallback) {
      yield put({
        type: actionTypes.GET_CONVERSATION_SUCCESS,
        payload: { data, included }
      });
    }
    if (success) {
      yield call(success, { data, included });
    }
  } catch (e) {
    if (!onlyCallback) {
      yield put({ type: actionTypes.GET_CONVERSATION_FAILURE, payload: e });
    }
    if (error) {
      yield call(error);
    }
  }
}

function* createMessage(action){
  const apiClient = yield select(getMessageClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(apiClient.create, data);
    yield put({
      type: actionTypes.CREATE_MESSAGE_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_MESSAGE_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* ConversationSaga() {
  yield takeEvery(actionTypes.GET_CONVERSATIONS, getConversations);
  yield takeEvery(actionTypes.GET_CONVERSATION, getConversation);
  yield takeEvery(actionTypes.CREATE_MESSAGE, createMessage);
}
