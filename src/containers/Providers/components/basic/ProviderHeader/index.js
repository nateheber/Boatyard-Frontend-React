import React from 'react';

import { SectionHeaderWrapper, LeftPart } from 'components/basic/Header';
import { ActionDropdown } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export default class ProviderHeader extends React.PureComponent {
  render() {
    const { title, deleteProvider, selectProvider } = this.props;
    const actionItems = [
      { title: 'Delete', action: deleteProvider },
      { title: 'Login As Provider', action: selectProvider }
    ];
    return (
      <SectionHeaderWrapper>
        <LeftPart>
          <PageTitle>{title}</PageTitle>
          <ActionDropdown items={actionItems} />
        </LeftPart>
      </SectionHeaderWrapper>
    );
  }
}
