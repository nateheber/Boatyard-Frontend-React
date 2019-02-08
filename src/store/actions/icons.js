import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_ICONS: '[ICONS] - Get icons',
  GET_ICONS_SUCCESS: '[ICONS] - Get icons Success',
  GET_ICONS_FAILURE: '[ICONS] - Get icons Failure',

  GET_ICON: '[ICONS] - Get icon',
  GET_ICON_SUCCESS: '[ICONS] - Get icon Success',
  GET_ICON_FAILURE: '[ICONS] - Get icon Failure',

  CREATE_ICON: '[ICONS] - Create new icon',
  CREATE_ICON_SUCCESS: '[ICONS] - Create new icon Success',
  CREATE_ICON_FAILURE: '[ICONS] - Create new icon Failure',
};

export const GetIcons = createAction(actionTypes.GET_ICONS, payload => payload);
export const GetIconsSuccess = createAction(actionTypes.GET_ICONS_SUCCESS);
export const GetIconsFailure = createAction(actionTypes.GET_ICONS_FAILURE);

export const GetIcon = createAction(actionTypes.GET_ICON, payload => payload);
export const GetIconSuccess = createAction(actionTypes.GET_ICON_SUCCESS);
export const GetIconFailure = createAction(actionTypes.GET_ICON_FAILURE);

export const CreateIcon = createAction(actionTypes.CREATE_ICON, payload => payload);
export const CreateIconSuccess = createAction(actionTypes.CREATE_ICON_SUCCESS);
export const CreateIconFailure = createAction(actionTypes.CREATE_ICON_FAILURE);
