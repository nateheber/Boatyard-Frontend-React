import { createAction } from 'redux-actions';


export const actionTypes = {
  GET_PAYMENTS: '[PAYMENTS] - Get payments',
  GET_PAYMENTS_SUCCESS: '[PAYMENTS] - Get payments Success',
  GET_PAYMENTS_FAILURE: '[PAYMENTS] - Get payments Failure',

  GET_PAYMENT: '[PAYMENTS] - Get payment',
  GET_PAYMENT_SUCCESS: '[PAYMENTS] - Get payment Success',
  GET_PAYMENT_FAILURE: '[PAYMENTS] - Get payment Failure',

  CREATE_PAYMENT: '[PAYMENTS] - Create new payment',
  CREATE_PAYMENT_SUCCESS: '[PAYMENTS] - Create new payment Success',
  CREATE_PAYMENT_FAILURE: '[PAYMENTS] - Create new payment Failure',

  UPDATE_PAYMENT: '[PAYMENTS] - Update payment',
  UPDATE_PAYMENT_SUCCESS: '[PAYMENTS] - Update Success',
  UPDATE_PAYMENT_FAILURE: '[PAYMENTS] - Update payment Failure',

  DELETE_PAYMENT: '[PAYMENTS] - Delete payment',
  DELETE_PAYMENT_SUCCESS: '[PAYMENTS] - Delete payment Success',
  DELETE_PAYMENT_FAILURE: '[PAYMENTS] - Delete payment Failure'
};

export const GetPayments = createAction(actionTypes.GET_PAYMENTS, payload => payload);
export const GetPaymentsSuccess = createAction(actionTypes.GET_PAYMENTS_SUCCESS);
export const GetPaymentsFailure = createAction(actionTypes.GET_PAYMENTS_FAILURE);

export const GetPayment = createAction(actionTypes.GET_PAYMENT, payload => payload);
export const GetPaymentSuccess = createAction(actionTypes.GET_PAYMENT_SUCCESS);
export const GetPaymentFailure = createAction(actionTypes.GET_PAYMENT_FAILURE);

export const CreatePayment = createAction(actionTypes.CREATE_PAYMENT, payload => payload);
export const CreatePaymentSuccess = createAction(actionTypes.CREATE_PAYMENT_SUCCESS);
export const CreatePaymentFailure = createAction(actionTypes.CREATE_PAYMENT_FAILURE);

export const UpdatePayment = createAction(actionTypes.UPDATE_PAYMENT, payload => payload);
export const UpdatePaymentSuccess = createAction(actionTypes.UPDATE_PAYMENT_SUCCESS);
export const UpdatePaymentFailure = createAction(actionTypes.UPDATE_PAYMENT_FAILURE);

export const DeletePayment = createAction(actionTypes.DELETE_PAYMENT, payload => payload);
export const DeletePaymentSuccess = createAction(actionTypes.DELETE_PAYMENT_SUCCESS);
export const DeletePaymentFailure = createAction(actionTypes.DELETE_PAYMENT_FAILURE);
