import { get } from 'lodash';
import { createSelector } from 'reselect';

const allCategoriesSelector = (state, categoryType) => {
  switch (categoryType) {
    case 'filtered': {
      return get(state, 'category.filteredCategories', []);
    }
    default: {
      return get(state, 'category.categories', []);
    }
  }
};

const includedSelector = (state, categoryType) => get(state, 'category.included', []);

export const refinedCategoriesSelector = createSelector(
  allCategoriesSelector,
  includedSelector,
  (allCategories, included) => {
    return allCategories.map(category => {
      for(const key in category.relationships) {
        let value = category.relationships[key].data;
        if(value) {
          category.relationships[key] = included[value.type][value.id];
        }
      }
      return category;
    });
  }
);
