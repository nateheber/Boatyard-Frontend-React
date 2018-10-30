import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { OrangeButton } from '../../basic/Buttons';
import { ActionDropdown } from '../../basic/Dropdown';
import { PageTitle } from '../../basic/Typho';

export const ServiceHeader = ({ onAction }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Services</PageTitle>
      <ActionDropdown
        items={[
          {
            title: 'Export',
            action: () => {
              onAction('export');
            }
          }
        ]}
      />
    </LeftPart>
    <RightPart>
      <OrangeButton className="desktop">ADD SERVICE</OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
