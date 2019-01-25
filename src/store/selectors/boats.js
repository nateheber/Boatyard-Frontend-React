import { createSelector } from 'reselect';

const boatsSelector = state => state.boat.boats;
const includedSelector = state => state.boat.included;

export const refinedBoatsSelector = createSelector(
  boatsSelector,
  includedSelector,
  (boats, included) => {
    return boats.map(boat => {
      for(const key in boat.relationships) {
        let value = boat.relationships[key].data;
        boat.relationships[key] = included[value.type][value.id];
      }
      return boat;
    });
  }
);
