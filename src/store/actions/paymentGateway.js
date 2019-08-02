import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_PAYMENT_GATEWAYS: '[PAYMENTGATEWAY] - Get Payment Gateways',
  GET_PAYMENT_GATEWAYS_SUCCESS:
    '[PAYMENTGATEWAY] - Get Payment Gateways Success',
  GET_PAYMENT_GATEWAYS_FAILURE:
    '[PAYMENTGATEWAY] - Get Payment Gateways Failure',

  GET_PAYMENT_GATEWAY: '[PAYMENTGATEWAY] - Get Payment Gateway',
  GET_PAYMENT_GATEWAY_SUCCESS: '[PAYMENTGATEWAY] - Get Payment Gateway Success',
  GET_PAYMENT_GATEWAY_FAILURE: '[PAYMENTGATEWAY] - Get Payment Gateway Failure',

  CREATE_PAYMENT_GATEWAY: '[PAYMENTGATEWAY] - Create Payment Gateway',
  CREATE_PAYMENT_GATEWAY_SUCCESS:
    '[PAYMENTGATEWAY] - Create Payment Gateway Success',
  CREATE_PAYMENT_GATEWAY_FAILURE:
    '[PAYMENTGATEWAY] - Create Payment Gateway Failure',

  UPDATE_PAYMENT_GATEWAY: '[PAYMENTGATEWAY] - Update Payment Gateway',
  UPDATE_PAYMENT_GATEWAY_SUCCESS:
    '[PAYMENTGATEWAY] - Update Payment Gateway Success',
  UPDATE_PAYMENT_GATEWAY_FAILURE:
    '[PAYMENTGATEWAY] - Update Payment Gateway Failure',

  DELETE_PAYMENT_GATEWAY: '[PAYMENTGATEWAY] - Delete Payment Gateway',
  DELETE_PAYMENT_GATEWAY_SUCCESS:
    '[PAYMENTGATEWAY] - Delete Payment Gateway Success',
  DELETE_PAYMENT_GATEWAY_FAILURE:
    '[PAYMENTGATEWAY] - Delete Payment Gateway Failure'
};

export const GetPaymentGateways = createAction(
  actionTypes.GET_PAYMENT_GATEWAYS,
  payload => payload
);
export const GetPaymentGatewaysSuccess = createAction(
  actionTypes.GET_PAYMENT_GATEWAYS_SUCCESS
);
export const GetPaymentGatewaysFailure = createAction(
  actionTypes.GET_PAYMENT_GATEWAYS_FAILURE
);

export const GetPaymentGateway = createAction(
  actionTypes.GET_PAYMENT_GATEWAY,
  payload => payload
);
export const GetPaymentGatewaySuccess = createAction(
  actionTypes.GET_PAYMENT_GATEWAY_SUCCESS
);
export const GetPaymentGatewayFailure = createAction(
  actionTypes.GET_PAYMENT_GATEWAY_FAILURE
);

export const CreatePaymentGateway = createAction(
  actionTypes.CREATE_PAYMENT_GATEWAY,
  payload => payload
);
export const CreatePaymentGatewaySuccess = createAction(
  actionTypes.CREATE_PAYMENT_GATEWAY_SUCCESS
);
export const CreatePaymentGatewayFailure = createAction(
  actionTypes.CREATE_PAYMENT_GATEWAY_FAILURE
);

export const UpdatePaymentGateway = createAction(
  actionTypes.UPDATE_PAYMENT_GATEWAY,
  payload => payload
);
export const UpdatePaymentGatewaySuccess = createAction(
  actionTypes.UPDATE_PAYMENT_GATEWAY_SUCCESS
);
export const UpdatePaymentGatewayFailure = createAction(
  actionTypes.UPDATE_PAYMENT_GATEWAY_FAILURE
);

export const DeletePaymentGateway = createAction(
  actionTypes.DELETE_PAYMENT_GATEWAY,
  payload => payload
);
export const DeletePaymentGatewaySuccess = createAction(
  actionTypes.DELETE_PAYMENT_GATEWAY_SUCCESS
);
export const DeletePaymentGatewayFailure = createAction(
  actionTypes.DELETE_PAYMENT_GATEWAY_FAILURE
);
