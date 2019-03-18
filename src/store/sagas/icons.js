import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/icons';
import { getIconClient } from './sagaSelectors';

const refineIcons = (icons) => {
  return icons.map(icon => {
    return {
      id: icon.id,
      type: icon.type,
      ...icon.attributes
    };
  });
};

function* getIcons(action) {
  const iconClient = yield select(getIconClient);
  let successType = actionTypes.GET_ICONS_SUCCESS;
  let failureType = actionTypes.GET_ICONS_FAILURE;
  const { params, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(iconClient.list, params);
    const icons = get(result, 'data', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_ICONS: {
        successType = actionTypes.FILTER_ICONS_SUCCESS;
        failureType = actionTypes.FILTER_ICONS_FAILURE;
        break;
      }
      default:
    }
    const refinedIcons = refineIcons(icons);
    yield put({
      type: successType,
      payload: {
        icons: refinedIcons,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedIcons);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getIcon(action) {
  const iconClient = yield select(getIconClient);
  const { iconId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(iconClient.read, iconId);
    const { data, included } = result;
    const refinedData = {
      id: data.id,
      type: data.type,
      ...data.attributes,
      ...data.relationships
    };

    yield put({
      type: actionTypes.GET_ICON_SUCCESS,
      payload: refinedData
    });
    if (success) {
      yield call(success, refinedData, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_ICON_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createIcon(action) {
  const iconClient = yield select(getIconClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(iconClient.create, data);
    yield put({
      type: actionTypes.CREATE_ICON_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_ICON_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* IconSaga() {
  yield takeEvery(actionTypes.GET_ICONS, getIcons);
  yield takeEvery(actionTypes.GET_ICON, getIcon);
  yield takeEvery(actionTypes.CREATE_ICON, createIcon);
}
