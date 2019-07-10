import _ from 'lodash';
import { createSelector } from 'reselect';

export const providerLocationsSelector = (state) => state.providerLocation.providerLocations;
export const includedSelector = (state) => state.providerLocation.included;
export const locationsSelector = (state) => _.get(state, 'providerLocation.included.locations', {});

export const refinedProviderLocationSelector = createSelector(
  providerLocationsSelector, includedSelector,
  (providerLocations, included) => {
    const services = [];
    const parsedData = providerLocations.map((location) => {
      const relationships = _.get(location, 'relationships');
      const relationKeys = _.keys(relationships);
      const parsedRelationships = relationKeys.map((key) => {
        const data = _.get(relationships, `[${key}].data`);
        const type = _.get(data, 'type');
        const id = _.get(data, 'id');
        if (!_.isArray(data)) {
          return _.get(included, `[${type}][${id}]`);
        }
        return data.map(relation => {
          const type = _.get(relation, 'type');
          const id = _.get(relation, 'id');
          if (type === 'services') {
            services.push(_.get(included, `[${type}][${id}]`));
          }
          return _.get(included, `[${type}][${id}]`);
        })
      });
      const relations = {};
      for (const index in parsedRelationships) {
        const item = parsedRelationships[index];
        if (!_.isEmpty(item)) {
          if (!_.isArray(item)) {
            relations[item.type] = item;
          } else {
            for(const index in item) {
              if (!relations[item[index].type]) {
                relations[item[index].type] = [];
              }
              if (item[index].type === 'provider_location_services') {
                const refactoredItem = item[index];
                const service = services.find(s => s.id === _.get(refactoredItem, 'attributes.serviceId', '').toString());
                refactoredItem.attributes['iconId'] = _.get(service, 'attributes.iconId');
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
    return {providerLocations: parsedData};
  }
);