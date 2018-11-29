import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { OrangeButton } from '../../basic/Buttons';
import { ActionDropdown } from '../../basic/Dropdown';
import { PageTitle } from '../../basic/Typho';

export const CategoryHeader = ({ onAction, onAdd }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Category</PageTitle>
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
        ADD CATEGORY
      </OrangeButton>
    </RightPart>
  </SectionHeaderWrapper>
);
