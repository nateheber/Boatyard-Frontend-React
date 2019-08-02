import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

const allServicesSelector = (state) => {
  return get(state, 'service.services', []);
};

const includedSelector = (state) => get(state, 'service.included', []);

export const refinedServicesSelector = createSelector(
  allServicesSelector,
  includedSelector,
  (allServices, included) => {
    return allServices.map(service => {
      for(const key in service.relationships) {
        let value = service.relationships[key].data;
        if(!isEmpty(value) && value.hasOwnProperty('type')) {
          service.relationships[key] = included[value.type][value.id];
        }
      }
      return service;
    });
  }
);
