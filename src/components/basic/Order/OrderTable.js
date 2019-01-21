import React from 'react';
import styled from 'styled-components';

import { OrderItem } from './OrderItem';
import { OrderTableHeader } from './OrderTableHeader';

const Wrapper = styled.div``;

export const OrderTable = props => {
  const { columns, items } = props;
  return(
    <Wrapper>
      <OrderTableHeader columns={columns} />
      {items.map((item, idx) => (
        <OrderItem columns={columns} item={item} key={`orderItem_${idx}`} />
      ))}
    </Wrapper>
  );
};
