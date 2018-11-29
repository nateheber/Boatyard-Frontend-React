import { put, takeEvery, call } from 'redux-saga/effects';
import { get } from 'lodash';

import { actions } from '../categories';

import { createCategoryClient } from '../../api';

const categoryClient = createCategoryClient('admin');

function* createRequest(action) {
  yield call(categoryClient.create, action.payload);
  yield put({
    type: actions.fetchCategories
  });
}

function* fetchRequest(action) {
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
  yield call(categoryClient.delete, action.payload);
}

function* updateRequest(action) {
  const { id, data } = action.payload;
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
