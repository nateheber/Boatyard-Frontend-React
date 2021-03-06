import * as APIGenerator from '../../api';

export const getAuthToken = state => state.auth.authToken;
export const getProviders = state => state.provider.providers;
export const getManagements = state => state.management.managements;
export const getUsers = state => state.user.users;
export const getUsersPageNumber = state => state.user.page;
export const getServicesPageNumber = state => state.service.nextPage;
export const getOrdersPageNumber = state => state.order.nextPage;

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

export const getUserClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createUserClient('basic');
    case 'admin':
      return APIGenerator.createUserClient('admin');
    case 'provider':
      return APIGenerator.createUserClient('provider');
    default:
      return APIGenerator.createUserClient('basic');
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

export const getOrderClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createOrderClient('basic');
    case 'admin':
      return APIGenerator.createOrderClient('admin');
    case 'provider':
      return APIGenerator.createOrderClient('provider');
    default:
      return APIGenerator.createOrderClient('basic');
  }
};

export const getBoatClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createBoatClient('basic');
    case 'admin':
      return APIGenerator.createBoatClient('admin');
    case 'provider':
      return APIGenerator.createBoatClient('provider');
    default:
      return APIGenerator.createBoatClient('basic');
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

export const getProviderClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createProviderClient('basic');
    case 'admin':
      return APIGenerator.createProviderClient('admin');
    case 'provider':
      return APIGenerator.createProviderClient('provider');
    default:
      return APIGenerator.createProviderClient('basic');
  }
};

export const getPaymentClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createPaymentClient('basic');
    case 'admin':
      return APIGenerator.createPaymentClient('admin');
    case 'provider':
      return APIGenerator.createPaymentClient('provider');
    default:
      return APIGenerator.createPaymentClient('basic');
  }
}

export const getCreditCardClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.createCreditCardClient('basic');
    case 'admin':
      return APIGenerator.createCreditCardClient('admin');
    case 'provider':
      return APIGenerator.createCreditCardClient('provider');
    default:
      return APIGenerator.createCreditCardClient('basic');
  }
}

export const getCustomApiClient = state => {
  switch (state.auth.previlage) {
    case 'basic':
      return APIGenerator.customApiClient('basic');
    case 'admin':
      return APIGenerator.customApiClient('admin');
    case 'provider':
      return APIGenerator.customApiClient('provider');
    default:
      return APIGenerator.customApiClient('basic');
  }
};
