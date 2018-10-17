import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { OrangeButton } from '../../basic/Buttons';
import { PageTitle } from '../../basic/Typho';

export const DashboardHeader = () => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Dashboard</PageTitle>
    </LeftPart>
    <RightPart>
      <OrangeButton className="desktop">New Order</OrangeButton>
      <OrangeButton className=" mobile tablet mobile-add">+</OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
