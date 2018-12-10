import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { PageTitle } from 'components/basic/Typho';

export const DashboardHeader = ({ onNewOrder }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Dashboard</PageTitle>
    </LeftPart>
    <RightPart>
      <OrangeButton className="desktop" onClick={onNewOrder}>
        New Order
      </OrangeButton>
      <OrangeButton className=" mobile tablet mobile-add" onClick={onNewOrder}>
        +
      </OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
