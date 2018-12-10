import * as APIGenerator from '../../api';

export const getAuthToken = state => state.auth.authToken;
export const getProviders = state => state.provider.providers;
export const getManagements = state => state.management.managements;
export const getUsers = state => state.user.users;

export const getCategoryClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createCategoryClient('basic');
    case 'admin':
      return APIGenerator.createCategoryClient('admin');
    case 'provider':
      return APIGenerator.createCategoryClient('provider');
    default:
      return APIGenerator.createCategoryClient('basic');
  }
};

export const getServiceClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createServiceClient('basic');
    case 'admin':
      return APIGenerator.createServiceClient('admin');
    case 'provider':
      return APIGenerator.createServiceClient('provider');
    default:
      return APIGenerator.createServiceClient('basic');
  }
};

export const getBoatClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createServiceClient('basic');
    case 'admin':
      return APIGenerator.createServiceClient('admin');
    case 'provider':
      return APIGenerator.createServiceClient('provider');
    default:
      return APIGenerator.createServiceClient('basic');
  }
};

export const getManagementClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createManagementClient('basic');
    case 'admin':
      return APIGenerator.createManagementClient('admin');
    case 'provider':
      return APIGenerator.createManagementClient('provider');
    default:
      return APIGenerator.createManagementClient('basic');
  }
};
