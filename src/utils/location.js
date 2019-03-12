import { get, find } from 'lodash';

export const getAddressInformation = (location) => {
  const relationships = get(location, 'relationships');
  const locationInfo = find(relationships, r => r.type === 'locations');
  const locationName = get(locationInfo, 'attributes.name');
  const address = get(locationInfo, 'relationships.address.data');
  const street = get(address, 'street');
  const city = get(address, 'city');
  const state = get(address, 'state');
  const zip = get(address, 'zip');
  return ({
    locationName,
    street,
    city,
    state,
    zip
  });
}