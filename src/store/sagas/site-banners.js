import { put, takeEvery, call, select } from 'redux-saga/effects';
import { get } from 'lodash';

import { actionTypes } from '../actions/site-banners';
import { getSiteBannerClient } from './sagaSelectors';

const refineBanners = (banners) => {
  return banners.map(banner => {
    return {
      id: banner.id,
      type: banner.type,
      ...banner.attributes
    };
  });
};

function* getBanners(action) {
  const bannerClient = yield select(getSiteBannerClient);
  let successType = actionTypes.GET_SITE_BANNERS_SUCCESS;
  let failureType = actionTypes.GET_SITE_BANNERS_FAILURE;
  const { params, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(bannerClient.list, params);
    const banners = get(result, 'data', []);
    const { perPage, total } = result;
    switch (action.type) {
      case actionTypes.FILTER_SITE_BANNERS: {
        successType = actionTypes.FILTER_SITE_BANNERS_SUCCESS;
        failureType = actionTypes.FILTER_SITE_BANNERS_FAILURE;
        break;
      }
      default:
    }
    const refinedBanners = refineBanners(banners);
    yield put({
      type: successType,
      payload: {
        banners: refinedBanners,
        perPage,
        total,
      }
    });
    if (success) {
      yield call(success, refinedBanners);
    }
  } catch (e) {
    yield put({ type: failureType, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* getBanner(action) {
  const bannerClient = yield select(getSiteBannerClient);
  const { bannerId, success, error } = action.payload;
  let result = null;
  try {
    result = yield call(bannerClient.read, bannerId);
    const { data, included } = result;
    const refinedData = {
      id: data.id,
      type: data.type,
      ...data.attributes,
      ...data.relationships
    };

    yield put({
      type: actionTypes.GET_SITE_BANNER_SUCCESS,
      payload: refinedData
    });
    if (success) {
      yield call(success, refinedData, included);
    }
  } catch (e) {
    yield put({ type: actionTypes.GET_SITE_BANNER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* createBanner(action) {
  const bannerClient = yield select(getSiteBannerClient);
  const { data, success, error } = action.payload;
  try {
    const result = yield call(bannerClient.create, data);
    const banner = get(result, 'data', {});
    const refinedBanner = { id: banner.id, type: banner.type, ...banner.attributes }
    yield put({
      type: actionTypes.CREATE_SITE_BANNER_SUCCESS,
    });
    if (success) {
      yield call(success, refinedBanner);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_SITE_BANNER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* updateBanner(action) {
  const bannerClient = yield select(getSiteBannerClient);
  const { bannerId, data, success, error } = action.payload;
  try {
    const result = yield call(bannerClient.update, bannerId, data);
    const banner = get(result, 'data', {});
    const refinedBanner = { id: banner.id, type: banner.type, ...banner.attributes }
    yield put({
      type: actionTypes.CREATE_SITE_BANNER_SUCCESS,
      payload: refinedBanner
    });
    if (success) {
      yield call(success, refinedBanner);
    }
  } catch (e) {
    yield put({ type: actionTypes.CREATE_SITE_BANNER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

function* deleteBanner(action) {
  const bannerClient = yield select(getSiteBannerClient);
  const { bannerId, success, error } = action.payload;
  try {
    yield call(bannerClient.delete, bannerId);
    yield put({
      type: actionTypes.DELETE_SITE_BANNER_SUCCESS,
    });
    if (success) {
      yield call(success);
    }
  } catch (e) {
    yield put({ type: actionTypes.DELETE_SITE_BANNER_FAILURE, payload: e });
    if (error) {
      yield call(error);
    }
  }
}

export default function* SiteBannerSaga() {
  yield takeEvery(actionTypes.GET_SITE_BANNERS, getBanners);
  yield takeEvery(actionTypes.GET_SITE_BANNER, getBanner);
  yield takeEvery(actionTypes.CREATE_SITE_BANNER, createBanner);
  yield takeEvery(actionTypes.UPDATE_SITE_BANNER, updateBanner);
  yield takeEvery(actionTypes.DELETE_SITE_BANNER, deleteBanner);
}
