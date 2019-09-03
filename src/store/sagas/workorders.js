import { put, takeEvery, call, select } from 'redux-saga/effects';

import { actionTypes } from '../actions/workorders';
import { getCustomApiClient } from './sagaSelectors';

function* addNewWorkorder(action) {
  const { services, success, error } = action.payload;
  const workorderApi = yield select(getCustomApiClient)
  const {id: orderId } = yield select(state => state.order.currentOrder);
  const {selectedTeamMembers, job_number, file_attachments_attributes, settings} = yield select(state => state.workorders.workorder);
  const assignments_attributes = selectedTeamMembers.map(m => {
    return {
      assignable_type: 'User',
      assignable_id: parseInt(m.value),
      // provider_location_id: providerLocationId ? providerLocationId : undefined,
      // provider_id: !providerLocationId && providerId ? providerId : undefined
    };
  });
  const payload = {
    file_attachments_attributes,
    assignments_attributes,
    job_number,
    settings,
    services,
  };

  try {
    const {data} = yield call(workorderApi.post, `/orders/${orderId}/work_orders`,  payload);
    yield put({ type: actionTypes.ADD_NEW_WORKORDER_SUCCESS, payload: { newWorkorder: data } });
    // yield put({
    //   type: actionTypes.GET_PAYMENTS_SUCCESS,
    //   payload: {
    //     payments,
    //     perPage,
    //     total,
    //   }
    // });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.ADD_NEW_WORKORDER_ERROR, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getWorkOrders(action) {
  const { orderId, success, error } = action.payload;
  const workorderApi = yield select(getCustomApiClient);

  try {
    const {data} = yield call(workorderApi.get, `/orders/${orderId}/work_orders`,  {page_size: 1000});
    yield put({ type: actionTypes.GET_WORKORDERS_SUCCESS, payload: data});
    if (success) {
      yield call(success);
    }
  } catch (e) {
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* PaymentSaga() {
  yield takeEvery(actionTypes.ADD_NEW_WORKORDER, addNewWorkorder);
  yield takeEvery(actionTypes.GET_WORKORDERS, getWorkOrders);
}
