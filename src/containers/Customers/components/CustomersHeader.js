import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const CustomersHeader = ({ onAction, onNew }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Customers</PageTitle>
      <ActionDropdown
        items={[
          {
            title: 'Import',
            action: () => {
              onAction('import');
            }
          },
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
      <OrangeButton className="desktop" onClick={onNew}>ADD NEW CUSTOMER</OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
