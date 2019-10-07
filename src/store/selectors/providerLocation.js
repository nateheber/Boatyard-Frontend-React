
import { createSelector } from 'reselect';
import { get, isArray, isEmpty, sortBy } from 'lodash';

export const providerLocationsSelector = (state) => state.providerLocation.providerLocations;
export const includedSelector = (state) => state.providerLocation.included;
export const locationsSelector = (state) => get(state, 'providerLocation.included.locations', {});

export const refinedProviderLocationSelector = createSelector(
  providerLocationsSelector, includedSelector,
  (providerLocations, included) => {
    const services = [];
    const parsedData = providerLocations.map((location) => {
      const relationships = get(location, 'relationships');
      const parsedRelationships = [];
      for (const key in relationships) {
        const data = get(relationships, `[${key}].data`);
        const type = get(data, 'type');
        const id = get(data, 'id');
        if (!isEmpty(data) && data !== null) {
          if (!isArray(data)) {
            return get(included, `[${type}][${id}]`);
          }
          if (!isEmpty(data)) {
            return data.map(relation => {
              const type = get(relation, 'type');
              const id = get(relation, 'id');
              if (type === 'services') {
                services.push(get(included, `[${type}][${id}]`));
              }
              return get(included, `[${type}][${id}]`);
            });
          }
        }
      }
      const relations = {};
      for (const index in parsedRelationships) {
        const item = parsedRelationships[index];
        if (!isEmpty(item)) {
          if (!isArray(item)) {
            relations[item.type] = item;
          } else {
            for(const index in item) {
              if (!relations[item[index].type]) {
                relations[item[index].type] = [];
              }
              if (item[index].type === 'provider_location_services') {
                const refactoredItem = item[index];
                const service = services.find(s => s.id === get(refactoredItem, 'attributes.serviceId', '').toString());
                refactoredItem.attributes['iconId'] = get(service, 'attributes.iconId');
                relations[item[index].type].push(refactoredItem);
              } else {
                relations[item[index].type].push(item[index]);
              }
            }
          }
        }
      }
      return { ...location, relationships: relations };
    });
    return {providerLocations: sortBy(parsedData, p => get(p, 'relationships.locations.attributes.name') || ''.toUpperCase())};
  }
);

export const simpleProviderLocationSelector = createSelector(
  refinedProviderLocationSelector,
  ({providerLocations}) => {
    return providerLocations.map(p => {
      return {
        id: p.id,
        providerId: p.providerId,
        name: get(p, 'relationships.locations.attributes.name')
      };
    })
  });
