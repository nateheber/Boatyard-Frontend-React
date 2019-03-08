import _ from 'lodash';

export const getProviderPrimaryLocation = (provider) => {
  const locationRelationship = _.get(provider, 'relationships.primaryLocation.data');
  const included = _.get(provider, 'included');
  const locationType = _.get(locationRelationship, 'type');
  const locationId = _.get(locationRelationship, 'id');
  const location = _.find(included, item => item.type === locationType && item.id === locationId);
  return location;
}