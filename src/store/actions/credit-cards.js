import { createAction } from 'redux-actions'

export const actionTypes = {
  GET_CREDIT_CARDS: '[CREDITCARDS] - Get credit cards',
  GET_CREDIT_CARDS_SUCCESS: '[CREDITCARDS] - Get credit cards Success',
  GET_CREDIT_CARDS_FAILURE: '[CREDITCARDS] - Get credit cards Failure',

  GET_CREDIT_CARD: '[CREDITCARDS] - Get credit card',
  GET_CREDIT_CARD_SUCCESS: '[CREDITCARDS] - Get credit card Success',
  GET_CREDIT_CARD_FAILURE: '[CREDITCARDS] - Get credit card Failure',

  CREATE_CREDIT_CARD: '[CREDITCARDS] - Create new credit card',
  CREATE_CREDIT_CARD_SUCCESS: '[CREDITCARDS] - Create new credit card Success',
  CREATE_CREDIT_CARD_FAILURE: '[CREDITCARDS] - Create new credit card Failure',

  UPDATE_CREDIT_CARD: '[CREDITCARDS] - Update credit card',
  UPDATE_CREDIT_CARD_SUCCESS: '[CREDITCARDS] - Update credit card Success',
  UPDATE_CREDIT_CARD_FAILURE: '[CREDITCARDS] - Update credit card Failure',

  DELETE_CREDIT_CARD: '[CREDITCARDS] - Delete credit card',
  DELETE_CREDIT_CARD_SUCCESS: '[CREDITCARDS] - Delete credit card Success',
  DELETE_CREDIT_CARD_FAILURE: '[CREDITCARDS] - Delete credit card Failure'
};

export const GetCreditCards = createAction(actionTypes.GET_CREDIT_CARDS, payload => payload);
export const GetCreditCardsSuccess = createAction(actionTypes.GET_CREDIT_CARDS_SUCCESS);
export const GetCreditCardsFailure = createAction(actionTypes.GET_CREDIT_CARDS_FAILURE);

export const GetCreditCard = createAction(actionTypes.GET_CREDIT_CARD, payload => payload);
export const GetCreditCardSuccess = createAction(actionTypes.GET_CREDIT_CARD_SUCCESS);
export const GetCreditCardFailure = createAction(actionTypes.GET_CREDIT_CARD_FAILURE);

export const CreateCreditCard = createAction(actionTypes.CREATE_CREDIT_CARD, payload => payload);
export const CreateCreditCardSuccess = createAction(actionTypes.CREATE_CREDIT_CARD_SUCCESS);
export const CreateCreditCardFailure = createAction(actionTypes.CREATE_CREDIT_CARD_FAILURE);

export const UpdateCreditCard = createAction(actionTypes.UPDATE_CREDIT_CARD, payload => payload);
export const UpdateCreditCardSuccess = createAction(actionTypes.UPDATE_CREDIT_CARD_SUCCESS);
export const UpdateCreditCardFailure = createAction(actionTypes.UPDATE_CREDIT_CARD_FAILURE);

export const DeleteCreditCard = createAction(actionTypes.DELETE_CREDIT_CARD, payload => payload);
export const DeleteCreditCardSuccess = createAction(actionTypes.DELETE_CREDIT_CARD_SUCCESS);
export const DeleteCreditCardFailure = createAction(actionTypes.DELETE_CREDIT_CARD_FAILURE);
