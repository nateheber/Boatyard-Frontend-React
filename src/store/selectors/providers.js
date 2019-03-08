import { createSelector } from 'reselect';
import { get, set } from 'lodash';

export const getProvidersSelector = state => state.provider.providers;
export const getPreferredProvidersSelector = state => state.provider.preferredProviders;
export const includedSelector = state => state.provider.included;
export const getCurrentProviderSelector = state => state.provider.currentProvider;

export const refinedPreferredProvidersSelector = createSelector(
  getPreferredProvidersSelector,
  includedSelector,
  (allOrders, included) => {
    return allOrders.map(preferredProvider => {
      for(const key in preferredProvider.relationships) {
        let value = get(preferredProvider, `relationships[${key}].data`);
        if(value) {
          if (key === 'lineItems') {
            if (value.length > 0) {
              set(preferredProvider.relationships, `[${key}]`, value.map(obj => {
                return get(included, `[${obj.type}][${obj.id}]`);
              }))
              for(const subKey in get(preferredProvider, `relationships[${key}][0].relationships`)) {
                const subValue = get(preferredProvider, `relationships[${key}][0].relationships[${subKey}].data`);
                if (subValue) {
                  preferredProvider.relationships[subKey] = get(included, `[${subValue.type}][${subValue.id}]`);
                }
              }
            }
          } else {
            preferredProvider.relationships[key] = get(included, `[${value.type}][${value.id}]`);
            if (key === 'boat') {
              const boatLocationInfo = get(preferredProvider.relationships[key], 'relationships.location.data');
              if (boatLocationInfo) {
                const locationInfo = get(included, `[${boatLocationInfo.type}][${boatLocationInfo.id}]`);
                set(preferredProvider.relationships[key], 'relationships.location', { attributes: locationInfo.attributes, address: get(locationInfo, 'relationships.address.data') });
              }
            }
          }
        }
      }
      return preferredProvider;
    });
  }
);
