import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

const managementsSelector = state => state.management.managements;
const includedSelector = state => state.management.included;

export const refinedManagementsSelector = createSelector(
  managementsSelector,
  includedSelector,
  (managements, included) => {
    return managements.map(management => {
      for(const key in management.relationships) {
        let value = management.relationships[key].data;
        if(!isEmpty(value)) {
          management.relationships[key] = included[value.type][value.id];
          // const idx = findIndex(included, location => location.id === value.id);
          // if (idx > -1) management.relationships[key] = included[idx];  
        }
      }
      return management;
    });
  }
);
