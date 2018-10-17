import React from 'react';
import styled from 'styled-components';

import {
  AssignedOrders,
  NewOrders,
  ScheduledOrders,
  OverdueInvoices,
  MonthlyRevenue
} from '../compound/SubSections';

import { DashboardHeader } from '../compound/SectionHeader';

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LeftPart = styled.div`
  flex-grow: 2;
`;

const RightPart = styled.div`
  flex-grow: 1;
`;

const Dashboard = () => (
  <Container>
    <DashboardHeader />
    <Wrapper>
      <LeftPart>
        <NewOrders />
        <ScheduledOrders />
        <AssignedOrders />
      </LeftPart>
      <RightPart>
        <MonthlyRevenue />
        <OverdueInvoices />
      </RightPart>
    </Wrapper>
  </Container>
);

export default Dashboard;
