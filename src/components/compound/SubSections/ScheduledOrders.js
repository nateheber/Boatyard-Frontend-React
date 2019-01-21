import React from 'react';
import styled from 'styled-components';

import { ScheduledSection } from 'components/basic/SubSection';

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
`;

export const ScheduledOrders = () => (
  <Wrapper>
    <ScheduledSection count={0} />
  </Wrapper>
);
