import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export default class TeamListHeader extends React.Component {
  render() {
  const { onAction } = this.props;
    return (
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
  }
}
