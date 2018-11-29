import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

export const actions = {
  createCategories: 'CATEGORIES/CREATE',
  fetchCategories: 'CATEGORIES/FETCH',
  updateCategories: 'CATEGORIES/UPDATE',
  deleteCategories: 'CATEGORIES/DELETE',
  setCategories: 'CATEGORIES/SET'
};

export const createCategories = createAction(actions.createCategories);
export const fetchCategories = createAction(actions.fetchCategories);
export const updateCategories = createAction(actions.updateCategories);
export const deleteCategories = createAction(actions.deleteCategories);

const initialState = {
  categories: []
};

export default handleActions(
  {
    [actions.setCategories]: (state, { payload }) =>
      produce(state, draft => {
        draft.categories = payload;
      })
  },
  initialState
);
