import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_GLOBAL_TEMPLATES: '[TEMPLATES] - Get global templates',
  GET_GLOBAL_TEMPLATES_SUCCESS: '[TEMPLATES] - Get global templates Success',
  GET_GLOBAL_TEMPLATES_FAILURE: '[TEMPLATES] - Get global templates Failure',

  GET_LOCAL_TEMPLATES: '[TEMPLATES] - Get local templates',
  GET_LOCAL_TEMPLATES_SUCCESS: '[TEMPLATES] - Get local templates Success',
  GET_LOCAL_TEMPLATES_FAILURE: '[TEMPLATES] - Get local templates Failure',

  CREATE_LOCAL_TEMPLATE: '[TEMPLATES] - Create local template',
  CREATE_LOCAL_TEMPLATE_SUCCESS: '[TEMPLATES] - Create local template Success',
  CREATE_LOCAL_TEMPLATE_FAILURE: '[TEMPLATES] - Create local template Failure',

  UPDATE_LOCAL_TEMPLATE: '[TEMPLATES] - Update local templates',
  UPDATE_LOCAL_TEMPLATE_SUCCESS: '[TEMPLATES] - Update local templates Success',
  UPDATE_LOCAL_TEMPLATE_FAILURE: '[TEMPLATES] - Update local templates Failure',

  UPDATE_GLOBAL_TEMPLATE: '[TEMPLATES] - Update global templates',
  UPDATE_GLOBAL_TEMPLATE_SUCCESS: '[TEMPLATES] - Update global templates Success',
  UPDATE_GLOBAL_TEMPLATE_FAILURE: '[TEMPLATES] - Update global templates Failure',

  DELETE_LOCAL_TEMPLATE: '[TEMPLATES] - Delete local templates',
  DELETE_LOCAL_TEMPLATE_SUCCESS: '[TEMPLATES] - Delete local templates Success',
  DELETE_LOCAL_TEMPLATE_FAILURE: '[TEMPLATES] - Delete local templates Failure',
};

export const GetGlobalTemplates = createAction(actionTypes.GET_GLOBAL_TEMPLATES, payload => payload);
export const GetGlobalTemplatesSuccess = createAction(actionTypes.GET_GLOBAL_TEMPLATES_SUCCESS);
export const GetGlobalTemplatesFailure = createAction(actionTypes.GET_GLOBAL_TEMPLATES_FAILURE);

export const GetLocalTemplates = createAction(actionTypes.GET_LOCAL_TEMPLATES, payload => payload);
export const GetLocalTemplatesSuccess = createAction(actionTypes.GET_LOCAL_TEMPLATES_SUCCESS);
export const GetLocalTemplatesFailure = createAction(actionTypes.GET_LOCAL_TEMPLATES_FAILURE);

export const CreateLocalTemplate = createAction(actionTypes.CREATE_LOCAL_TEMPLATE, payload => payload);
export const CreateLocalTemplateSuccess = createAction(actionTypes.CREATE_LOCAL_TEMPLATE_SUCCESS);
export const CreateLocalTemplateFailure = createAction(actionTypes.CREATE_LOCAL_TEMPLATE_FAILURE);

export const UpdateLocalTemplate = createAction(actionTypes.UPDATE_LOCAL_TEMPLATE, payload => payload);
export const UpdateLocalTemplateSuccess = createAction(actionTypes.UPDATE_LOCAL_TEMPLATE_SUCCESS);
export const UpdateLocalTemplateFailure = createAction(actionTypes.UPDATE_LOCAL_TEMPLATE_FAILURE);

export const UpdateGlobalTemplate = createAction(actionTypes.UPDATE_GLOBAL_TEMPLATE, payload => payload);
export const UpdateGlobalTemplateSuccess = createAction(actionTypes.UPDATE_GLOBAL_TEMPLATE_SUCCESS);
export const UpdateGlobalTemplateFailure = createAction(actionTypes.UPDATE_GLOBAL_TEMPLATE_FAILURE);

export const DeleteLocalTemplate = createAction(actionTypes.DELETE_LOCAL_TEMPLATE, payload => payload);
export const DeleteLocalTemplateSuccess = createAction(actionTypes.DELETE_LOCAL_TEMPLATE_SUCCESS);
export const DeleteLocalTemplateFailure = createAction(actionTypes.DELETE_LOCAL_TEMPLATE_FAILURE);
