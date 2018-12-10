import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const UsersHeader = ({ onAction, onAdd }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Users</PageTitle>
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
    {/* <RightPart>
      <OrangeButton className="desktop" onClick={onAdd}>
        ADD NEW USER
      </OrangeButton>
    </RightPart> */}
  </SectionHeaderWrapper>
);
