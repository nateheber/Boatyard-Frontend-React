import _ from 'lodash';
import { createSelector } from 'reselect';

export const providerLocationsSelector = (state) => state.providerLocation.providerLocations;
export const includedSelector = (state) => state.providerLocation.included;

export const refinedProviderLocationSelector = createSelector(
  providerLocationsSelector, includedSelector,
  (providerLocations, included) => {
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
          return _.get(included, `[${type}][${id}]`);
        })
      })
      return { ...location, relationships: parsedRelationships };
    });
    return {providerLocations: parsedData};
  }
);