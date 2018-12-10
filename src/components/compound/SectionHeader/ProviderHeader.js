import React from 'react';

import {
  SectionHeaderWrapper,
  LeftPart,
  RightPart
} from 'components/basic/Header';
import { ColumnFilter } from 'components/basic/Dropdown';
import { PageTitle } from 'components/basic/Typho';

export const ProviderHeader = ({ onAction }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Providers</PageTitle>
    </LeftPart>
    <RightPart>
      <ColumnFilter
        items={[
          { title: 'provider name', value: 'provider_name' },
          { title: 'contact name', value: 'contact_name' },
          { title: 'phone', value: 'phone' },
          { title: 'email', value: 'email' },
          { title: 'location', value: 'location' }
        ]}
        onChangeSelection={columns => {
          console.log(columns);
        }}
      />
    </RightPart>
  </SectionHeaderWrapper>
);
