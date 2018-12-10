import React from 'react';
import styled from 'styled-components';

import { AssignedToMeSection } from 'components/basic/SubSection';
import { OrderTable } from 'components/basic/Order';

const Wrapper = styled.div`
  background-color: #fff;
  margin: 15px;
`;

export const AssignedOrders = () => (
  <Wrapper>
    <AssignedToMeSection count={0} />
    {/* <OrderTable
      items={[
        {
          title: 'New Order',
          customer: 'Brock Prod Test 9 Donnelly',
          orderStatus: 'Accepted',
          boatMake: 'Blue',
          boatModel: 'Berries',
          boatName: 'Blubes'
        },
        {
          title: 'New Order',
          customer: 'Brock Prod Test 8 Donnelly',
          orderStatus: 'Accepted',
          boatMake: 'with',
          boatModel: 'Butter',
          boatName: 'Bagel'
        }
      ]}
    /> */}
  </Wrapper>
);
