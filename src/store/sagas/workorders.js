import { put, takeEvery, call, select } from 'redux-saga/effects';
import { concat, find, get, filter, sortBy } from 'lodash';
import { actionTypes } from '../actions/workorders';
import { getCustomApiClient } from './sagaSelectors';

function* upsertWorkorder(action) {
  const { services, transition, success, error } = action.payload;
  const workorderApi = yield select(getCustomApiClient)
  const orderId = yield select(state => state.order.currentOrder.id);
  const {id, assignee, title, file_attachments_attributes, settings, notes } = yield select(state => state.workorders.workorder);
  const assignments_attributes = assignee ? [{
      assignable_type: 'User',
      assignable_id: parseInt(assignee.value),
      // provider_location_id: providerLocationId ? providerLocationId : undefined,
      // provider_id: !providerLocationId && providerId ? providerId : undefined
    }] : [];
  const payload = {
    file_attachments_attributes,
    assignments_attributes,
    title,
    settings,
    services,
    notes,
    transition
  };

  try {
    if (!id) {
      yield call(workorderApi.post, `/orders/${orderId}/work_orders`,  {work_order: payload});
    } else {
      const workorders = yield select(state => state.workorders.workorders);
      const origin = find(workorders, {id});
      const deletedAssignments = get(origin, 'relationships.assignments.data').map(({id}) => {
        return {
          id,
          _destroy: true
        };
      });
      payload.assignments_attributes = concat(payload.assignments_attributes, deletedAssignments);

      const deletedAttachments = filter(
        get(origin, 'relationships.fileAttachments.data'),
        ({id}) => !find(file_attachments_attributes, {id})
      ).map(({id}) => { return {id, _destroy: true}; });
      payload.file_attachments_attributes = concat(payload.file_attachments_attributes, deletedAttachments);

      yield call(workorderApi.patch, `/orders/${orderId}/work_orders/${id}`,  {work_order: payload});
    }
    yield put({ type: actionTypes.GET_WORKORDERS, payload: {orderId} });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPSERT_WORKORDER_ERROR, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getWorkOrders(action) {
  const { orderId, success, error } = action.payload;
  const workorderApi = yield select(getCustomApiClient);

  try {
    const {data, included} = yield call(
      workorderApi.get, `/orders/${orderId}/work_orders`,
      {
        page_size: 1000,
        'work_orders[order]': 'id',
        'work_orders[sort]': 'desc',
      }
    );
    yield put({ type: actionTypes.GET_WORKORDERS_SUCCESS, payload: {data: sortBy(data, d => parseInt(d.id)).reverse(), included}});
    if (success) {
      yield call(success);
    }
  } catch (e) {
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteWorkorder(action) {
  const { success, error } = action.payload;
  const orderId = yield select(state => state.order.currentOrder.id);
  const {id } = yield select(state => state.workorders.workorder);
  const workorderApi = yield select(getCustomApiClient);

  try {
    yield call(workorderApi.delete, `/orders/${orderId}/work_orders/${id}`);
    yield put({ type: actionTypes.DELETE_WORKORDER_SUCCESS});
    if (success) {
      yield call(success);
    }
    yield put({ type: actionTypes.GET_WORKORDERS, payload: {orderId} });
  } catch (e) {
    yield put({ type: actionTypes.DELETE_WORKORDER_ERROR, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* PaymentSaga() {
  yield takeEvery(actionTypes.UPSERT_WORKORDER, upsertWorkorder);
  yield takeEvery(actionTypes.GET_WORKORDERS, getWorkOrders);
  yield takeEvery(actionTypes.DELETE_WORKORDER, deleteWorkorder);
}
