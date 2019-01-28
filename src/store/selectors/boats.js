import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

const boatsSelector = state => state.boat.boats;
const includedSelector = state => state.boat.included;

export const refinedBoatsSelector = createSelector(
  boatsSelector,
  includedSelector,
  (boats, included) => {
    return boats.map(boat => {
      for(const key in boat.relationships) {
        let value = boat.relationships[key].data;
        if(!isEmpty(value)) {
          boat.relationships[key] = included[value.type][value.id];
          // const idx = findIndex(included, location => location.id === value.id);
          // if (idx > -1) boat.relationships[key] = included[idx];  
        }
      }
      return boat;
    });
  }
);
