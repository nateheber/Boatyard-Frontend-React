import { get } from 'lodash';
import * as APIGenerator from '../../api';

export const getAuthToken = state => state.auth.authToken;
export const getManagements = state => state.management.managements;
export const getUsers = state => state.user.users;
export const getUsersPageNumber = state => state.user.page;
export const getServicesPageNumber = state => state.service.nextPage;
export const getOrdersPageNumber = state => state.order.nextPage;
export const getOrderDispatchedFlag = state => state.order.dispatched;
export const getPrivilege = state => state.auth.privilege;
export const getUserId = state => state.profile.id;

export const getCategoryClient = state => {
  switch (state.auth.privilege) {
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
  switch (state.auth.privilege) {
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

export const getChildAccountClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createChildAccountClient('basic');
    case 'admin':
      return APIGenerator.createChildAccountClient('admin');
    case 'provider':
      return APIGenerator.createChildAccountClient('provider');
    default:
      return APIGenerator.createChildAccountClient('basic');
  }
};

export const getServiceClient = state => {
  //const providerLocationId = `${get(state.auth, 'providerLocationId') || ''}`;
  const providerLocationId = `${get(state.order, 'currentOrder.attributes.providerLocationId') || ''}`;
  switch (state.auth.privilege) {
    case 'basic':
      return providerLocationId.length > 0 ?
        APIGenerator.createLocationServiceClient('basic', [state.auth.providerId, providerLocationId]) :
        APIGenerator.createServiceClient('basic');
    case 'admin':
      console.log('Admin');
      console.log(`Provider Location Id:` ,providerLocationId);
      return providerLocationId.length > 0 ?
        APIGenerator.createLocationServiceClient('admin', [state.auth.providerId, providerLocationId]) :
        APIGenerator.createServiceClient('admin');
    case 'provider':
        return providerLocationId.length > 0 ?
        APIGenerator.createLocationServiceClient('provider', [state.auth.providerId, providerLocationId]) :
        APIGenerator.createServiceClient('provider');
    default:
      return providerLocationId.length > 0 ?
        APIGenerator.createLocationServiceClient('basic', [state.auth.providerId, providerLocationId]) :
        APIGenerator.createServiceClient('basic');
  }
};

export const getNormalServiceClient = state => {
  switch (state.auth.privilege) {
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

export const getProviderServiceClient = state => {
  switch (state.auth.privilege) {
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
  switch (state.auth.privilege) {
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

export const getDispatchedOrderClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createDispatchedOrderClient('basic');
    case 'admin':
      return APIGenerator.createDispatchedOrderClient('admin');
    case 'provider':
      return APIGenerator.createDispatchedOrderClient('provider');
    default:
      return APIGenerator.createDispatchedOrderClient('basic');
  }
};

export const getBoatClient = state => {
  switch (state.auth.privilege) {
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
  switch (state.auth.privilege) {
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
  switch (state.auth.privilege) {
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
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createPaymentClient('basic');
    case 'admin':
      return APIGenerator.createPaymentClient('admin');
    case 'provider':
      return APIGenerator.createPaymentClient('provider');
    default:
      return APIGenerator.createPaymentClient('basic');
  }
};

export const getCreditCardClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createCreditCardClient('basic');
    case 'admin':
      return APIGenerator.createCreditCardClient('admin');
    case 'provider':
      return APIGenerator.createCreditCardClient('provider');
    default:
      return APIGenerator.createCreditCardClient('basic');
  }
};

export const getCustomApiClient = state => {
  switch (state.auth.privilege) {
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

export const getProviderLocationClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createProviderLocationClient('basic');
    case 'admin':
      return APIGenerator.createProviderLocationClient('admin');
    case 'provider':
      return APIGenerator.createProviderLocationClient('provider');
    default:
      return APIGenerator.createProviderLocationClient('basic');
  }
};

export const getProviderLocationServiceClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createProviderLocationServiceClient('basic');
    case 'admin':
      return APIGenerator.createProviderLocationServiceClient('admin');
    case 'provider':
      return APIGenerator.createProviderLocationServiceClient('provider');
    default:
      return APIGenerator.createProviderLocationServiceClient('basic');
  }
};

export const getPaymentGatewayClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createPaymentGatewayClient('basic');
    case 'admin':
      return APIGenerator.createPaymentGatewayClient('admin');
    case 'provider':
      return APIGenerator.createPaymentGatewayClient('provider');
    default:
      return APIGenerator.createPaymentGatewayClient('basic');
  }
};

export const getIconClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createIconClient('basic');
    case 'admin':
      return APIGenerator.createIconClient('admin');
    case 'provider':
      return APIGenerator.createIconClient('provider');
    default:
      return APIGenerator.createIconClient('basic');
  }
};

export const getNotificationsClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createNotificationsClient('basic');
    case 'admin':
      return APIGenerator.createNotificationsClient('admin');
    case 'provider':
      return APIGenerator.createNotificationsClient('provider');
    default:
      return APIGenerator.createNotificationsClient('basic');
  }
};

export const getNetworkClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createNetworkClient('basic');
    case 'admin':
      return APIGenerator.createNetworkClient('admin');
    case 'provider':
      return APIGenerator.createNetworkClient('provider');
    default:
      return APIGenerator.createNetworkClient('basic');
  }
};

export const getConversationClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createConversationsClient('basic');
    case 'admin':
      return APIGenerator.createConversationsClient('admin');
    case 'provider':
      return APIGenerator.createConversationsClient('provider');
    default:
      return APIGenerator.createConversationsClient('basic');
  }
};

export const getMessageClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createMessageClient('basic');
    case 'admin':
      return APIGenerator.createMessageClient('admin');
    case 'provider':
      return APIGenerator.createMessageClient('provider');
    default:
      return APIGenerator.createMessageClient('basic');
  }
};

export const getSiteBannerClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createSiteBannerClient('basic');
    case 'admin':
      return APIGenerator.createSiteBannerClient('admin');
    case 'provider':
      return APIGenerator.createSiteBannerClient('provider');
    default:
      return APIGenerator.createSiteBannerClient('basic');
  }
};


export const getQuickRepliesClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createQuickReplyClient('basic');
    case 'admin':
      return APIGenerator.createQuickReplyClient('admin');
    case 'provider':
      return APIGenerator.createQuickReplyClient('provider');
    default:
      return APIGenerator.createQuickReplyClient('basic');
  }
};

export const getGlobalMessageTemplatesClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createGlobalMessageTemplateClient('basic');
    case 'admin':
      return APIGenerator.createGlobalMessageTemplateClient('admin');
    case 'provider':
      return APIGenerator.createGlobalMessageTemplateClient('provider');
    default:
      return APIGenerator.createGlobalMessageTemplateClient('basic');
  }
};

export const getLocalMessageTemplatesClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createLocalMessageTemplateClient('basic');
    case 'admin':
      return APIGenerator.createLocalMessageTemplateClient('admin');
    case 'provider':
      return APIGenerator.createLocalMessageTemplateClient('provider');
    default:
      return APIGenerator.createLocalMessageTemplateClient('basic');
  }
};

export const getExternalConnectionsClient = state => {
  switch (state.auth.privilege) {
    case 'basic':
      return APIGenerator.createExternalConnectionsClient('basic');
    case 'admin':
      return APIGenerator.createExternalConnectionsClient('admin');
    case 'provider':
      return APIGenerator.createExternalConnectionsClient('provider');
    default:
      return APIGenerator.createExternalConnectionsClient('basic');
  }
};
