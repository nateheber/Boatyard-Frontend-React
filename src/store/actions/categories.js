import { createAction } from 'redux-actions';

export const actionTypes = {
  GET_CATEGORIES: '[CATEGORIES] - Get categories',
  GET_CATEGORIES_SUCCESS: '[CATEGORIES] - Get categories Success',
  GET_CATEGORIES_FAILURE: '[CATEGORIES] - Get categories Failure',

  FILTER_CATEGORIES: '[CATEGORIES] - Filter categories',
  FILTER_CATEGORIES_SUCCESS: '[CATEGORIES] - Filter categories Success',
  FILTER_CATEGORIES_FAILURE: '[CATEGORIES] - Filter categories Failure',

  GET_CATEGORY: '[CATEGORIES] - Get category',
  GET_CATEGORY_SUCCESS: '[CATEGORIES] - Get category Success',
  GET_CATEGORY_FAILURE: '[CATEGORIES] - Get category Failure',

  CREATE_CATEGORY: '[CATEGORIES] - Create new category',
  CREATE_CATEGORY_SUCCESS: '[CATEGORIES] - Create new category Success',
  CREATE_CATEGORY_FAILURE: '[CATEGORIES] - Create new category Failure',

  UPDATE_CATEGORY: '[CATEGORIES] - Update category',
  UPDATE_CATEGORY_SUCCESS: '[CATEGORIES] - Update Success',
  UPDATE_CATEGORY_FAILURE: '[CATEGORIES] - Update category Failure',

  DELETE_CATEGORY: '[CATEGORIES] - Delete category',
  DELETE_CATEGORY_SUCCESS: '[CATEGORIES] - Delete category Success',
  DELETE_CATEGORY_FAILURE: '[CATEGORIES] - Delete category Failure'
};

export const GetCategories = createAction(actionTypes.GET_CATEGORIES, payload => payload);
export const GetCategoriesSuccess = createAction(actionTypes.GET_CATEGORIES_SUCCESS);
export const GetCategoriesFailure = createAction(actionTypes.GET_CATEGORIES_FAILURE);

export const FilterCategories = createAction(actionTypes.FILTER_CATEGORIES, payload => payload);
export const FilterCategoriesSuccess = createAction(actionTypes.FILTER_CATEGORIES_SUCCESS);
export const FilterCategoriesFailure = createAction(actionTypes.FILTER_CATEGORIES_FAILURE);

export const GetCategory = createAction(actionTypes.GET_CATEGORY, payload => payload);
export const GetCategorySuccess = createAction(actionTypes.GET_CATEGORY_SUCCESS);
export const GetCategoryFailure = createAction(actionTypes.GET_CATEGORY_FAILURE);

export const CreateCategory = createAction(actionTypes.CREATE_CATEGORY, payload => payload);
export const CreateCategorySuccess = createAction(actionTypes.CREATE_CATEGORY_SUCCESS);
export const CreateCategoryFailure = createAction(actionTypes.CREATE_CATEGORY_FAILURE);

export const UpdateCategory = createAction(actionTypes.UPDATE_CATEGORY, payload => payload);
export const UpdateCategorySuccess = createAction(actionTypes.UPDATE_CATEGORY_SUCCESS);
export const UpdateCategoryFailure = createAction(actionTypes.UPDATE_CATEGORY_FAILURE);

export const DeleteCategory = createAction(actionTypes.DELETE_CATEGORY, payload => payload);
export const DeleteCategorySuccess = createAction(actionTypes.DELETE_CATEGORY_SUCCESS);
export const DeleteCategoryFailure = createAction(actionTypes.DELETE_CATEGORY_FAILURE);
