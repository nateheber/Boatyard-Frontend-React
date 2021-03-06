import React from 'react';
import styled from 'styled-components';

import { OrderItem } from './OrderItem';
import { OrderTableHeader } from './OrderTableHeader';

const Wrapper = styled.div``;

export const OrderTable = ({ items }) => (
  <Wrapper>
    <OrderTableHeader />
    {items.map((item, idx) => (
      <OrderItem {...item} key={`orderItem_${idx}`} />
    ))}
  </Wrapper>
);
