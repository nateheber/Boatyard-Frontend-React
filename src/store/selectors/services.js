import { get, isEmpty } from 'lodash';
import { createSelector } from 'reselect';

const servicesSelector = (state) => {
  return get(state, 'service.services', []);
};

const allServicesSelector = (state) => {
  return get(state, 'service.allServices', []);
};

const includedSelector = (state) => get(state, 'service.included', []);

export const refinedServicesSelector = createSelector(
  servicesSelector,
  includedSelector,
  (allServices, included) => {
    return allServices.map(service => {
      for(const key in service.relationships) {
        let value = service.relationships[key].data;
        if(value && !isEmpty(value) && value.hasOwnProperty('type')) {
          const item = get(included, `[${value.type}][${value.id}]`);
          if (item) {
            service.relationships[key] = item;
          }
        }
      }
      return service;
    });
  }
);

export const refinedAllServicesSelector = createSelector(
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
