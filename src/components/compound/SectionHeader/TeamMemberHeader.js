import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { OrangeButton } from '../../basic/Buttons';
import { ActionDropdown } from '../../basic/Dropdown';
import { PageTitle } from '../../basic/Typho';

export const TeamMemberHeader = ({ onAction }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Team</PageTitle>
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
      <OrangeButton className="desktop">ADD TEAM MEMBER</OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
