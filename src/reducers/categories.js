import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createCategories: 'CATEGORIES/CREATE',
  fetchCategories: 'CATEGORIES/FETCH',
  updateCategories: 'CATEGORIES/UPDATE',
  deleteCategories: 'CATEGORIES/DELETE',
  setCategories: 'CATEGORIES/SET',
  setCategory: 'CATEGORIES/SET_ON',
  selectCategory: 'CATEGORY/SELECT'
};

export const createCategories = createAction(actions.createCategories);
export const fetchCategories = createAction(actions.fetchCategories);
export const updateCategories = createAction(actions.updateCategories);
export const deleteCategories = createAction(actions.deleteCategories);
export const selectCategory = createAction(actions.selectCategory);

const initialState = {
  categories: [],
  currentCategory: {}
};

export default handleActions(
  {
    [actions.setCategories]: (state, { payload }) =>
      produce(state, draft => {
        draft.categories = payload;
      }),
    [actions.setCategory]: (state, { payload }) =>
      produce(state, draft => {
        draft.currentCategory = payload;
      })
  },
  initialState
);
