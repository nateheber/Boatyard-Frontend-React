import { get } from 'lodash';
import { createSelector } from 'reselect';

const allServicesSelector = (state) => {
  return get(state, 'category.categories', []);
};

const includedSelector = (state) => get(state, 'service.included', []);

export const refinedServicesSelector = createSelector(
  allServicesSelector,
  includedSelector,
  (allServices, included) => {
    return allServices.map(service => {
      for(const key in service.relationships) {
        let value = service.relationships[key].data;
        if(value) {
          service.relationships[key] = included[value.type][value.id];
        }
      }
      return service;
    });
  }
);
