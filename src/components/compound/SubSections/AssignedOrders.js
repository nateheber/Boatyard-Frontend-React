import React from 'react';
import styled from 'styled-components';

import { AssignedToMeSection } from 'components/basic/SubSection';

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
`;

export const AssignedOrders = () => (
  <Wrapper>
    <AssignedToMeSection count={0} />
  </Wrapper>
);
