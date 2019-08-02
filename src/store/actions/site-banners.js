import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_SITE_BANNERS: '[SITE BANNERS] - Get site banners',
  GET_SITE_BANNERS_SUCCESS: '[SITE BANNERS] - Get site banners Success',
  GET_SITE_BANNERS_FAILURE: '[SITE BANNERS] - Get site banners Failure',

  GET_SITE_BANNER: '[SITE BANNERS] - Get site banner',
  GET_SITE_BANNER_SUCCESS: '[SITE BANNERS] - Get site banner Success',
  GET_SITE_BANNER_FAILURE: '[SITE BANNERS] - Get site banner Failure',

  CREATE_SITE_BANNER: '[SITE BANNERS] - Create new site banner',
  CREATE_SITE_BANNER_SUCCESS: '[SITE BANNERS] - Create new site banner Success',
  CREATE_SITE_BANNER_FAILURE: '[SITE BANNERS] - Create new site banner Failure',

  UPDATE_SITE_BANNER: '[SITE BANNERS] - Update site banner',
  UPDATE_SITE_BANNER_SUCCESS: '[SITE BANNERS] - Update site banner Success',
  UPDATE_SITE_BANNER_FAILURE: '[SITE BANNERS] - Update site banner Failure',

  DELETE_SITE_BANNER: '[SITE BANNERS] - Delete site banner',
  DELETE_SITE_BANNER_SUCCESS: '[SITE BANNERS] - Delete site banner Success',
  DELETE_SITE_BANNER_FAILURE: '[SITE BANNERS] - Delete site banner Failure',

  SET_SITE_BANNER: '[SITE BANNERS] - Set site banner',
  SET_SITE_BANNER_SUCCESS: '[SITE BANNERS] - Set site banner Success',
  SET_SITE_BANNER_FAILURE: '[SITE BANNERS] - Set site banner Failure',
};

export const GetSiteBanners = createAction(actionTypes.GET_SITE_BANNERS, payload => payload);
export const GetSiteBannersSuccess = createAction(actionTypes.GET_SITE_BANNERS_SUCCESS);
export const GetSiteBannersFailure = createAction(actionTypes.GET_SITE_BANNERS_FAILURE);

export const GetSiteBanner = createAction(actionTypes.GET_SITE_BANNER, payload => payload);
export const GetSiteBannerSuccess = createAction(actionTypes.GET_SITE_BANNER_SUCCESS);
export const GetSiteBannerFailure = createAction(actionTypes.GET_SITE_BANNER_FAILURE);

export const CreateSiteBanner = createAction(actionTypes.CREATE_SITE_BANNER, payload => payload);
export const CreateSiteBannerSuccess = createAction(actionTypes.CREATE_SITE_BANNER_SUCCESS);
export const CreateSiteBannerFailure = createAction(actionTypes.CREATE_SITE_BANNER_FAILURE);

export const UpdateSiteBanner = createAction(actionTypes.UPDATE_SITE_BANNER, payload => payload);
export const UpdateSiteBannerSuccess = createAction(actionTypes.UPDATE_SITE_BANNER_SUCCESS);
export const UpdateSiteBannerFailure = createAction(actionTypes.UPDATE_SITE_BANNER_FAILURE);

export const DeleteSiteBanner = createAction(actionTypes.DELETE_SITE_BANNER, payload => payload);
export const DeleteSiteBannerSuccess = createAction(actionTypes.DELETE_SITE_BANNER_SUCCESS);
export const DeleteSiteBannerFailure = createAction(actionTypes.DELETE_SITE_BANNER_FAILURE);

export const SetSiteBanner = createAction(actionTypes.DELETE_SITE_BANNER, payload => payload);
