import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { OrangeButton } from '../../basic/Buttons';
import { PageTitle } from '../../basic/Typho';

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
