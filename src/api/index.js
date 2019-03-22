import {
  CRUDClient,
  MultiLayerCRUDClient,
  NormalClient,
  SpreedlyClient
} from './core';

export const createSpreedlyClient = () => {
  return new SpreedlyClient();
};

export const createCategoryClient = authType => {
  return new CRUDClient('services/categories', authType);
};

export const createServiceClient = authType => {
  return new CRUDClient('services', authType);
};

export const createBoatClient = authType => {
  return new CRUDClient('boats', authType);
};

export const createPaymentClient = authType => {
  return new CRUDClient('payments', authType);
};

export const createLocationClient = authType => {
  return new CRUDClient('locations', authType);
};

export const createProviderClient = authType => {
  return new CRUDClient('providers', authType);
};

export const createManagementClient = authType => {
  return new CRUDClient('managements', authType);
};

export const createCreditCardClient = authType => {
  return new CRUDClient('credit_cards', authType);
};

export const createPreferredProviderClient = authType => {
  return new CRUDClient('preferred_providers', authType);
};

export const createNetworkClient = authType => {
  return new CRUDClient('networks', authType);
};

export const createQuoteClient = authType => {
  return new CRUDClient('quotes', authType);
};

export const createItemClient = authType => {
  return new MultiLayerCRUDClient(['orders', 'items'], authType);
};

export const createOrderClient = authType => {
  return new CRUDClient('orders', authType);
};

export const createQuickReplyClient = authType => {
  return new CRUDClient('quick_replies', authType);
};

export const createUserClient = authType => {
  return new CRUDClient('users', authType);
};

export const createChildAccountClient = authType => {
  return new CRUDClient('child_accounts', authType);
};

export const createProviderLocationServiceClient = authType => {
  return new CRUDClient('provider_location_services', authType);
};

export const createProviderLocationClient = authType => {
  return new MultiLayerCRUDClient(['providers', 'locations'], authType);
};

export const createPaymentGatewayClient = authType => {
  return new CRUDClient('gateways', authType);
};

export const createConversationsClient = authType => {
  return new CRUDClient('conversations', authType);
};

export const createIconClient = authType => {
  return new CRUDClient('icons', authType);
}

export const createDispatchedOrderClient = authType => {
  return new CRUDClient('dispatched_orders', authType);
}

export const createMessageClient = authType => {
  return new CRUDClient('messages', authType);
}

export const customApiClient = authType => {
  return new NormalClient(authType);
};

export const createSiteBannerClient = authType => {
  return new CRUDClient('site_banners', authType);
}

export const createGlobalMessageTemplateClient = authType => {
  return new CRUDClient('global_message_templates', authType);
}

export const createLocalMessageTemplateClient = authType => {
  return new CRUDClient('message_templates', authType);
}
