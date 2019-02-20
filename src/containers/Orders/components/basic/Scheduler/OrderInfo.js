import React from 'react';
import { get } from 'lodash';

import { InfoHeader, InfoField } from './basics';

export const OrderInfo = ({ order }) => {
  const serviceName = get(order, 'lineItems[0].relationships.service.attributes.name');
  return (
    <div>
      <InfoHeader>order info</InfoHeader>
      <InfoField>{serviceName}</InfoField>
    </div>
  )
}