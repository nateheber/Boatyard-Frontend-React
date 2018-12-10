import React from 'react';
import styled from 'styled-components';

import { OrverdueInvoiceSection } from 'components/basic/SubSection';

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
`;

export const OverdueInvoices = () => (
  <Wrapper>
    <OrverdueInvoiceSection count={0} />
  </Wrapper>
);
