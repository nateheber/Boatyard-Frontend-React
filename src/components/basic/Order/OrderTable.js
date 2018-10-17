import React from 'react';

import { OrderItem } from './OrderItem';
import { OrderTableHeader } from './OrderTableHeader';

export const OrderTable = ({ items }) => (
  <div>
    <OrderTableHeader />
    {items.map((item, idx) => (
      <OrderItem {...item} key={`orderItem_${idx}`} />
    ))}
  </div>
);
