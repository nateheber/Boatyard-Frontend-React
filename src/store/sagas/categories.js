import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, hasIn } from 'lodash';

import { actionTypes } from '../actions/categories';
import { getCategoryClient } from './sagaSelectors';

const refineCategories = (categories) => {
  return categories.map(category => {
    return {
      id: category.id,
      type: category.type,
      ...category.attributes,
      relationships: category.relationships
    };
  });
};

function* getCategories(action) {
  const categoryClient = yield select(getCategoryClient);
  let successType = actionTypes.GET_CATEGORIES_SUCCESS;
  let failureType = actionTypes.GET_CATEGORIES_FAILURE;
  const { params, success, error } = action.payload;
  let submissionParams = {};
  if (!hasIn(params, 'category[order]')) {
    submissionParams = {
      ...params,
      'category[order]': 'name',
      'category[sort]': 'asc',
    };
  } else {
    submissionParams = { ...params };
  }
  let result = null;
  try {
    result = yield call(categoryClient.list, submissionParams);
    const categories = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_CATEGORIES: {
        successType = actionTypes.FILTER_CATEGORIES_SUCCESS;
        failureType = actionTypes.FILTER_CATEGORIES_FAILURE;
        break;
      }
      default:
    }
    const refinedCategories = refineCategories(categories);
    yield put({
      type: successType,
      payload: {
        categories: refinedCategories,
        included,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedCategories);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getCategory(action) {
  const categoryClient = yield select(getCategoryClient);
  const { categoryId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(categoryClient.read, categoryId);
    const { data, included } = result;
    const category = {
      id: data.id,
      ...data.attributes,
      ...data.relationships
    };
    yield put({
      type: actionTypes.GET_CATEGORY_SUCCESS,
      payload: category
    });
    if (success) {
      yield call(success, category, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_CATEGORY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createCategory(action) {
  const categoryClient = yield select(getCategoryClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(categoryClient.create, data);
    yield put({
      type: actionTypes.CREATE_CATEGORY_SUCCESS,
    });
    if (success) {
      yield call(success, get(result, 'data', {}));
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CATEGORY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateCategory(action) {
  const categoryClient = yield select(getCategoryClient);
  const { categoryId, data, success, error } = action.payload;
  try {
    yield call(categoryClient.update, categoryId, data);
    yield put({
      type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_CATEGORY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteCategory(action) {
  const categoryClient = yield select(getCategoryClient);
  const { categoryId, success, error } = action.payload;
  try {
    yield call(categoryClient.delete, categoryId);
    yield put({
      type: actionTypes.DELETE_CATEGORY_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_CATEGORY_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* CategorySaga() {
  yield takeEvery(actionTypes.GET_CATEGORIES, getCategories);
  yield takeEvery(actionTypes.FILTER_CATEGORIES, getCategories);
  yield takeEvery(actionTypes.GET_CATEGORY, getCategory);
  yield takeEvery(actionTypes.CREATE_CATEGORY, createCategory);
  yield takeEvery(actionTypes.DELETE_CATEGORY, deleteCategory);
  yield takeEvery(actionTypes.UPDATE_CATEGORY, updateCategory);
}
