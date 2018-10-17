import React from 'react';
import styled from 'styled-components';

import { MonthlyRevenueSection } from '../../basic/SubSection';

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
`;

export const MonthlyRevenue = () => (
  <Wrapper>
    <MonthlyRevenueSection amount={0} />
  </Wrapper>
);
