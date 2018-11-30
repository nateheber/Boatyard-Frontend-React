import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../categories';
import { getCategoryClient } from './sagaSelectors';

function* createRequest(action) {
  const categoryClient = yield select(getCategoryClient);
  yield call(categoryClient.create, action.payload);
  yield put({
    type: actions.fetchCategories
  });
}

function* fetchRequest(action) {
  const categoryClient = yield select(getCategoryClient);
  const result = yield call(categoryClient.list);
  const categories = get(result, 'data', []);
  yield put({
    type: actions.setCategories,
    payload: categories.map(category => ({
      id: category.id,
      ...category.attributes
    }))
  });
}

function* deleteRequest(action) {
  const categoryClient = yield select(getCategoryClient);
  yield call(categoryClient.delete, action.payload);
}

function* updateRequest(action) {
  const { id, data } = action.payload;
  const categoryClient = yield select(getCategoryClient);
  yield call(categoryClient.update, id, data);
  yield put({
    type: actions.fetchCategories
  });
}

export default function* Profile() {
  yield takeEvery(actions.createCategories, createRequest);
  yield takeEvery(actions.fetchCategories, fetchRequest);
  yield takeEvery(actions.deleteCategories, deleteRequest);
  yield takeEvery(actions.updateCategories, updateRequest);
}
