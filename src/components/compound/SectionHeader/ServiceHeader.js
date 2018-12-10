import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const ServiceHeader = ({ onAction, onAdd }) => (
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
      <OrangeButton className="desktop" onClick={onAdd}>
        ADD SERVICE
      </OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
