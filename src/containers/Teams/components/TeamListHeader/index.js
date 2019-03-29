import React from 'react';
import { withRouter } from 'react-router-dom';

import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

class TeamListHeader extends React.Component {
  goToAddPage = () => {
    this.props.history.push(`/team-details/`);
  };

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
          <OrangeButton className="desktop" onClick={this.goToAddPage}>ADD TEAM MEMBER</OrangeButton>
        </RightPart>
      </SectionHeaderWrapper>  
    );
  }
}

export default withRouter(TeamListHeader);
