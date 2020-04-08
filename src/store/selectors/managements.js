import { createSelector } from 'reselect';
import { get, isEmpty } from 'lodash';

const managementsSelector = state => state.management.managements;
const includedSelector = state => state.management.included;

export const refinedManagementsSelector = createSelector(
  managementsSelector,
  includedSelector,
  (managements, included) => {
    return managements.map(management => {
      for(const key in management.relationships) {
        let value = management.relationships[key].data;
        if(value && !isEmpty(value)) {
          const relationship = get(included, `[${value.type}][${value.id}]`);
          if (relationship && !isEmpty(relationship)) {
            management.relationships[key] = relationship;
          }
        }
      }
      return management;
    });
  }
);
