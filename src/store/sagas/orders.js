import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get, hasIn, startCase } from 'lodash';

import { ORDER_ALIASES, AVAILABLE_ALIAS_ORDERS } from 'utils/basic';
import { getTeamMemberData } from 'utils/order';
import { actionTypes } from '../actions/orders';
import { actionTypes as workorderActionTypes } from '../actions/workorders';
import { getOrderClient, getDispatchedOrderClient, getCustomApiClient, getOrderDispatchedFlag, getPrivilege } from './sagaSelectors';

const addStateAliasOfOrder = (order) => {
  const state = get(order, 'attributes.state');
  const invoiced = get(order, 'attributes.invoiced');
  let stateAlias = startCase(state);
  if (invoiced && state !== 'completed') {
    stateAlias = 'Invoiced';
  } else {
    if (AVAILABLE_ALIAS_ORDERS.indexOf(state) > -1) {
      stateAlias = ORDER_ALIASES[state];
    }
  }
  return {
    ...order,
    attributes: {
      ...order.attributes,
      stateAlias: stateAlias
    }
  };
};

function* getOrders(action) {
  let successType = actionTypes.GET_ORDERS_SUCCESS;
  let failureType = actionTypes.GET_ORDERS_FAILURE;
  const { params, success, error } = action.payload;
  let submissionParams = {};
  if (!hasIn(params, 'order[order]')) {
    submissionParams = {
      ...params,
      // 'order[order]': 'created_at',
      // 'order[sort]': 'desc',
    };
  } else {
    submissionParams = { ...params };
  }
  const dispatched = yield select(getOrderDispatchedFlag);
  let orderClient;
  if (dispatched) {
    orderClient = yield select(getDispatchedOrderClient);
  } else {
    orderClient = yield select(getOrderClient);
  }
  try {
    const result = yield call(orderClient.list, submissionParams);
    const orders = get(result, 'data', []);
    const included = get(result, 'included', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.GET_NEW_ORDERS: {
        successType = actionTypes.GET_NEW_ORDERS_SUCCESS;
        failureType = actionTypes.GET_NEW_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_SCHEDULED_ORDERS: {
        successType = actionTypes.GET_SCHEDULED_ORDERS_SUCCESS;
        failureType = actionTypes.GET_SCHEDULED_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_ASSIGNED_ORDERS: {
        successType = actionTypes.GET_ASSIGNED_ORDERS_SUCCESS;
        failureType = actionTypes.GET_ASSIGNED_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_OPEN_ORDERS: {
        successType = actionTypes.GET_OPEN_ORDERS_SUCCESS;
        failureType = actionTypes.GET_OPEN_ORDERS_FAILURE;
        break;
      }
      case actionTypes.GET_PAID_ORDERS: {
        successType = actionTypes.GET_PAID_ORDERS_SUCCESS;
        failureType = actionTypes.GET_PAID_ORDERS_FAILURE;
        break;
      }
      default: {
        successType = actionTypes.GET_ORDERS_SUCCESS;
        failureType = actionTypes.GET_ORDERS_FAILURE;
      }
    }
    yield put({
      type: successType,
      payload: {
        orders: orders.map(item => {
          const order = addStateAliasOfOrder(item);
          return {
            id: order.id,
            type: order.type,
            ...order.attributes,
            relationships: order.relationships,
          };
        }),
        included,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* getOrder(action) {
  const { orderId, success, error } = action.payload;
  const dispatched = yield select(getOrderDispatchedFlag);
  const privilege = yield select(getPrivilege);
  let orderClient;
  if (dispatched && privilege !== 'admin') {
    orderClient = yield select(getDispatchedOrderClient);
  } else {
    orderClient = yield select(getOrderClient);
  }
  try {
    const result = yield call(orderClient.read, orderId);
    //console.log(result);
    const { data: order, included } = result;
    const refactoredOrder = addStateAliasOfOrder(order);
    const providerLocationId = get(order, 'attributes.providerLocationId');
    const providerId = get(order, 'attributes.providerId');
    let teamMemberData = [];
    if (providerLocationId && providerId) {
      // const apiClient = yield select(getCustomApiClient);
      // const tmResult = yield call(apiClient.get, `/providers/${providerId}/locations/${providerLocationId}/directories`, 'v3')
      // let teamData = tmResult.included ? tmResult.included[0].relationships.teamMembers.data : [];
      // let contractData = tmResult.included ? tmResult.included[0].relationships.userContractors.data : [];
      // const { included: directoryIncluded } = tmResult;
      // teamMemberData = getTeamMemberData(teamData.concat(contractData), directoryIncluded);
      
      //Original Implementation
      const apiClient = yield select(getCustomApiClient);
      const tmResult = yield call(apiClient.get, `/providers/${providerId}/locations/${providerLocationId}/directories`)
      const { data: {relationships: {teamMembers: {data : tmData}, userContractors: {data: coData}} }, included: directoryIncluded } = tmResult;
      teamMemberData = getTeamMemberData(tmData.concat(coData), directoryIncluded);
    }
    yield put({
      type: workorderActionTypes.RESET
    });
    yield put({
      type: workorderActionTypes.GET_WORKORDERS,
      payload: {orderId: order.id}
    });
    yield put({
      type: actionTypes.GET_ORDER_PROVIDER_LOCATION_TEAM_MEMBER_SUCCESS,
      payload: {teamMemberData}
    });
    yield put({
      type: actionTypes.GET_ORDER_SUCCESS,
      payload: { order: refactoredOrder, included }
    });
    if (success) {
      yield call(success, refactoredOrder);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_ORDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* createOrder(action) {
  const orderClient = yield select(getOrderClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(orderClient.create, data);
    const { data: order, included } = result;
    const refactoredOrder = addStateAliasOfOrder(order);
    yield put({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: { order: refactoredOrder, included }
    });
    if (success) {
      yield call(success, refactoredOrder);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_ORDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* updateOrder(action) {
  const { orderId, data, success, error, dispatched } = action.payload;
  const dispatchedFlg = yield select(getOrderDispatchedFlag) || dispatched;
  let orderClient;
  if (dispatchedFlg) {
    orderClient = yield select(getDispatchedOrderClient);
  } else {
    orderClient = yield select(getOrderClient);
  }
  try {
    const result = yield call(orderClient.update, orderId, data);
    const { data: order, included } = result;
    const refactoredOrder = addStateAliasOfOrder(order);
    yield put({
      type: actionTypes.UPDATE_ORDER_SUCCESS,
      payload: { order: refactoredOrder, included }
    });
    if (success) {
      yield call(success, refactoredOrder);
    }
  } catch (e) {
    yield put({ type: actionTypes.UPDATE_ORDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

// function* sendQuote(action) {
//   const { orderId, isResend, success, error, dispatched } = action.payload;
//   const dispatchedFlg = yield select(getOrderDispatchedFlag) || dispatched;
//   let orderClient;
//   if (dispatchedFlg) {
//     orderClient = yield select(getDispatchedOrderClient);
//   } else {
//     orderClient = yield select(getOrderClient);
//   }
//   try {
//     const result = yield call(orderClient.update, orderId, { order: { transition: isResend ? 'reprovision' : 'provision' } });
//     const { data: order, included } = result;
//     const refactoredOrder = addStateAliasOfOrder(order);
//     yield put({
//       type: actionTypes.SEND_QUOTE_SUCCESS,
//       payload: { order: refactoredOrder, included }
//     });
//     if (success) {
//       yield call(success, refactoredOrder);
//     }
//   } catch (e) {
//     yield put({ type: actionTypes.SEND_QUOTE_FAILURE, payload: e });
//     if (error) {
//       yield call(error, e);
//     }
//   }
// }

function* sendQuote(action) {
  const apiClient = yield select(getCustomApiClient);
  const { orderId, params, success, error } = action.payload;
  try {
    const result = yield call(apiClient.post, `/orders/${orderId}/quotes`, params);
    const { data: order } = result;
    const refactoredOrder = addStateAliasOfOrder(order);
    yield put({
      type: actionTypes.SEND_QUOTE_SUCCESS,
      payload: { order: refactoredOrder }
    });
    if (success) {
      yield call(success, refactoredOrder);
    }
  } catch (e) {
    yield put({ type: actionTypes.SEND_QUOTE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* sendInvoice(action) {
  const apiClient = yield select(getCustomApiClient);
  const { orderId, params, success, error } = action.payload;
  try {
    const result = yield call(apiClient.post, `/orders/${orderId}/invoices`, params);
    const { data: order } = result;
    const refactoredOrder = addStateAliasOfOrder(order);
    yield put({
      type: actionTypes.SEND_INVOICE_SUCCESS,
      payload: { order: refactoredOrder }
    });
    if (success) {
      yield call(success, refactoredOrder);
    }
  } catch (e) {
    yield put({ type: actionTypes.SEND_INVOICE_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* deleteOrder(action) {
  const { orderId, success, error } = action.payload;
  const dispatched = yield select(getOrderDispatchedFlag);
  let orderClient;
  if (dispatched) {
    orderClient = yield select(getDispatchedOrderClient);
  } else {
    orderClient = yield select(getOrderClient);
  }
  try {
    yield call(orderClient.delete, orderId);
    yield put({ type: actionTypes.DELETE_ORDER_SUCCESS });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_ORDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* acceptOrder(action) {
  const apiClient = yield select(getCustomApiClient);
  const { orderId, success, error } = action.payload;
  const dispatched = yield select(getOrderDispatchedFlag);
  try {
    const result = yield call(apiClient.patch, `/${dispatched ? 'dispatched_orders' : 'orders'}/${orderId}`, { order: { transition: 'accept' } });
    const { data: order, included } = result;
    yield put({
      type: actionTypes.ACCEPT_ORDER_SUCCESS,
      payload: { order: addStateAliasOfOrder(order), included }
    });
    if (dispatched) {
      yield put({ type: actionTypes.SET_DISPATCHED_FLAG, payload: false });
    }
    yield put({ type: actionTypes.GET_ORDER, payload: { orderId } })
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.ACCEPT_ORDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

function* dispatchOrder(action) {
  const normalClient = yield select(getOrderClient);
  const { orderId, dispatchIds, orderState, success, error } = action.payload;
  let orderClient;
  if (orderState === 'dispatched') {
    orderClient = yield select(getDispatchedOrderClient);
  } else {
    orderClient = yield select(getOrderClient);
  }
  try {
    if (orderState !== 'draft') {
      yield call(orderClient.update, orderId, { order: { transition: 'undispatch' } });
    }
    if (dispatchIds && dispatchIds.length > 0) {
      yield call(normalClient.update, orderId, { order: { dispatch_provider_location_ids: dispatchIds } });
    }
    yield put({ type: actionTypes.DISPATCH_ORDER_SUCCESS });
    // yield put({ type: actionTypes.SET_DISPATCHED_FLAG, payload: true })
    yield put({ type: actionTypes.GET_ORDER, payload: { orderId } })
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DISPATCH_ORDER_FAILURE, payload: e });
    if (error) {
      yield call(error, e);
    }
  }
}

export default function* OrderSaga() {
  yield takeEvery(actionTypes.GET_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_NEW_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_SCHEDULED_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_ASSIGNED_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_OPEN_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_PAID_ORDERS, getOrders);
  yield takeEvery(actionTypes.GET_ORDER, getOrder);
  yield takeEvery(actionTypes.CREATE_ORDER, createOrder);
  yield takeEvery(actionTypes.UPDATE_ORDER, updateOrder);
  yield takeEvery(actionTypes.DELETE_ORDER, deleteOrder);
  yield takeEvery(actionTypes.DISPATCH_ORDER, dispatchOrder);
  yield takeEvery(actionTypes.ACCEPT_ORDER, acceptOrder);
  yield takeEvery(actionTypes.SEND_QUOTE, sendQuote);
  yield takeEvery(actionTypes.SEND_INVOICE, sendInvoice);
}
