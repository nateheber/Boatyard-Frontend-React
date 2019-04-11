import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, set, sortBy } from 'lodash';
import snakeCaseKeys from 'snakecase-keys';

import { actionTypes } from '../actions/messageTemplates';
import { getGlobalMessageTemplatesClient, getLocalMessageTemplatesClient } from './sagaSelectors';

const processTemplates = (templates) => {
  const templateObject = {};
  sortBy(templates, ['attributes.id'], ['desc']).forEach(template => {
    const triggerKey = get(template, 'attributes.triggerKey');
    const trigger = get(template, 'attributes.trigger');
    const messageType = get(template, 'attributes.messageType').split('_').join(' ');
    set(templateObject, triggerKey, {...template, trigger, messageType});
  });
  return templateObject;
}

function* getGlobalTemplates(action) {
  const templateClient = yield select(getGlobalMessageTemplatesClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(templateClient.list, params);
    const templates = get(result, 'data', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_GLOBAL_TEMPLATES_SUCCESS,
      payload: {
        templates: processTemplates(templates),
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, templates);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_GLOBAL_TEMPLATES_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getLocalTemplates(action) {
  const templateClient = yield select(getLocalMessageTemplatesClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(templateClient.list, params);
    const templates = get(result, 'data', []);
    const { perPage, total } = result;
    yield put({
      type: actionTypes.GET_LOCAL_TEMPLATES_SUCCESS,
      payload: {
        templates: processTemplates(templates),
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, templates);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_LOCAL_TEMPLATES_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createLocalTemplate(action) {
  const templateClient = yield select(getLocalMessageTemplatesClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(templateClient.create, snakeCaseKeys(data));
    yield put({
      type: actionTypes.CREATE_LOCAL_TEMPLATE_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_LOCAL_TEMPLATE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateLocalTemplate(action) {
  const templateClient = yield select(getLocalMessageTemplatesClient);
  const { templateId, data, success, error } = action.payload;
  try {
    yield call(templateClient.update, templateId, data);
    yield put({
      type: actionTypes.UPDATE_LOCAL_TEMPLATE_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_LOCAL_TEMPLATE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateGlobalTemplate(action) {
  const templateClient = yield select(getGlobalMessageTemplatesClient);
  const { templateId, data, success, error } = action.payload;
  try {
    yield call(templateClient.update, templateId, data);
    yield put({
      type: actionTypes.UPDATE_LOCAL_TEMPLATE_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_LOCAL_TEMPLATE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteLocalTemplate(action) {
  const apiClient = yield select(getLocalMessageTemplatesClient);
  const { templateId, success, error } = action.payload;
  try {
    yield call(apiClient.delete, templateId);
    yield put({
      type: actionTypes.DELETE_LOCAL_TEMPLATE_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_LOCAL_TEMPLATE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* MessageTemplateSaga() {
  yield takeEvery(actionTypes.GET_GLOBAL_TEMPLATES, getGlobalTemplates);
  yield takeEvery(actionTypes.GET_LOCAL_TEMPLATES, getLocalTemplates);
  yield takeEvery(actionTypes.UPDATE_GLOBAL_TEMPLATE, updateGlobalTemplate);
  yield takeEvery(actionTypes.UPDATE_LOCAL_TEMPLATE, updateLocalTemplate);
  yield takeEvery(actionTypes.CREATE_LOCAL_TEMPLATE, createLocalTemplate);
  yield takeEvery(actionTypes.DELETE_LOCAL_TEMPLATE, deleteLocalTemplate);
}
