import React from 'react';
import { withRouter } from 'react-router-dom';

import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { PageTitle } from 'components/basic/Typho';

class ContractorListHeader extends React.Component {
  goToAddPage = () => {
    this.props.history.push(`/contractor-details/`);
  };

  render() {
    return (
      <SectionHeaderWrapper>
        <LeftPart>
          <PageTitle>Contractors</PageTitle>
        </LeftPart>
        <RightPart>
          <OrangeButton className="desktop" onClick={this.goToAddPage}>ADD CONTRACTOR</OrangeButton>
        </RightPart>
      </SectionHeaderWrapper>
    );
  }
}

export default withRouter(ContractorListHeader);
