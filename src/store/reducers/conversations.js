import { handleActions } from 'redux-actions';
import { produce } from 'immer';
import { get, reverse, merge } from 'lodash';
import { actionTypes } from '../actions/conversations';
import { refactorIncluded } from 'utils/basic';
import { parseIncludedForMessages } from 'utils/conversations';

const initialState = {
  currentStatus: '',
  conversations: [],
  included: [],
  currentConversation: {},
  page: 1,
  perPage: 20,
  total: 0,
  message: {
    messages: [],
    included: {},
    page: 1,
    perPage: 20,
    total: 0
  },
  errors: null,
  ui: {
    opened: false,
    selected: null,
    newMessage: false
  }
};

export default handleActions(
  {
    [actionTypes.GET_CONVERSATIONS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.page = get(payload, 'params.page', 1);
        draft.errors = null;
      }),
    [actionTypes.GET_CONVERSATIONS_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, conversations, included } = payload;
        draft.currentStatus = type;
        draft.total = total;
        draft.perPage = perPage;
        draft.conversations = conversations.filter(conversation => conversation.state !== 'archived');
        draft.included = refactorIncluded(included);
      }),
    [actionTypes.GET_CONVERSATIONS_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.GET_CONVERSATION]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const first = get(payload, 'first', false);
        const page = get(payload, 'params.page', 1);
        const perPage = get(payload, 'params.per_page', 20);
        draft.currentStatus = type;
        if (first) {
          draft.message = {
            messages: [],
            included: {},
            page,
            perPage,
            total: 0        
          };
        }
        draft.errors = null;
      }),
    [actionTypes.GET_CONVERSATION_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        const { total, perPage, data, included } = payload;
        draft.currentStatus = type;
        const messages = get(state, 'message.messages');
        const mergedMessages = merge(reverse(data), messages);
        const parsed = parseIncludedForMessages(included);
        const origin = get(state, 'message.included');
        draft.message = {
          total,
          perPage,
          messages: mergedMessages,
          included: merge(origin, parsed)
        };
      }),
    [actionTypes.GET_CONVERSATION_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.CREATE_CONVERSATION]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.CREATE_CONVERSATION_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.CREATE_CONVERSATION_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.UPDATE_CONVERSATION]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.UPDATE_CONVERSATION_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.UPDATE_CONVERSATION_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),

    [actionTypes.DELETE_CONVERSATION]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
        draft.errors = null;
      }),
    [actionTypes.DELETE_CONVERSATION_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { type } = action;
        draft.currentStatus = type;
      }),
    [actionTypes.DELETE_CONVERSATION_FAILURE]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.errors = payload;
      }),
    [actionTypes.SET_UI_STATUS]: (state, action) =>
      produce(state, draft => {
        const { type, payload } = action;
        draft.currentStatus = type;
        draft.ui = {...state.ui, ...payload};
      })
  },
  initialState
);
