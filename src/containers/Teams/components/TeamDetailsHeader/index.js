import React from 'react';

import { SectionHeaderWrapper, LeftPart } from 'components/basic/Header';
import { HollowButton } from 'components/basic/Buttons';
import { PageTitle } from 'components/basic/Typho';

export default class TeamDetailsHeader extends React.Component {
  handleClickDeleteButton = () => {
    const { onAction } = this.props;
    if (onAction) {
      onAction();
    }
  }
  render() {
    const { title } = this.props;
    return (
      <SectionHeaderWrapper>
        <LeftPart>
          <PageTitle>{title}</PageTitle>
          <HollowButton className="desktop" onClick={this.handleClickDeleteButton}>Delete</HollowButton>
        </LeftPart>
      </SectionHeaderWrapper>  
    );
  }
}
