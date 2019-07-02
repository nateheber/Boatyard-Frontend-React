import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, sortBy } from 'lodash';

import { getCreditCardClient } from './sagaSelectors';
import { actionTypes } from '../actions/credit-cards';

function* getCreditCards(action) {
  const creditCardClient = yield select(getCreditCardClient);
  const { params, success, error } = action.payload;
  try {
    const result = yield call(creditCardClient.list, params);
    const creditCards = sortBy(get(result, 'data', []), 'id');
    yield put({
      type: actionTypes.GET_CREDIT_CARDS_SUCCESS,
      payload: creditCards
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_CREDIT_CARDS_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createCreditCard(action) {
  const { data, success, error } = action.payload;
  const { card_number, cvv, year, month, first_name, last_name, zip, country } = data;
  const creditCardClient = yield select(getCreditCardClient);
  try {
    const { user_id, child_account_id } = data;
    const passData = {
      expiration_month: parseInt(month),
      expiration_year: parseInt(year),
      card_number,
      card_first_name: first_name,
      card_last_name: last_name,
      card_zip_code: zip,
      card_country: country,
      is_default: false,
      cvv
    };

    if (user_id) {
      passData.user_id = user_id;
    } else if (child_account_id) {
      passData.child_account_id = child_account_id;
    }

    yield call(creditCardClient.create, { credit_card: passData });
    yield put({
      type: actionTypes.CREATE_CREDIT_CARD_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_CREDIT_CARD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteCreditCard(action) {
  const { creditCardId, success, error } = action.payload;
  const creditCardClient = yield select(getCreditCardClient);
  try {
    yield call(creditCardClient.delete, creditCardId);
    yield put({
      type: actionTypes.DELETE_CREDIT_CARD_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_CREDIT_CARD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateCreditCard(action) {
  const { creditCardId, data, success, error } = action.payload;
  const creditCardClient = yield select(getCreditCardClient);
  try {
    yield call(creditCardClient.update, creditCardId, data);
    yield put({
      type: actionTypes.UPDATE_CREDIT_CARD_SUCCESS
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_CREDIT_CARD_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* CreditCardSaga() {
  yield takeEvery(actionTypes.GET_CREDIT_CARDS, getCreditCards);
  yield takeEvery(actionTypes.CREATE_CREDIT_CARD, createCreditCard);
  yield takeEvery(actionTypes.DELETE_CREDIT_CARD, deleteCreditCard);
  yield takeEvery(actionTypes.UPDATE_CREDIT_CARD, updateCreditCard);
}
