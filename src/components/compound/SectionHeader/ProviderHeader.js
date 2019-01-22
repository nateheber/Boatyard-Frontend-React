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
          { label: 'provider name', value: 'provider_name' },
          { label: 'contact name', value: 'contact_name' },
          { label: 'phone', value: 'phone' },
          { label: 'email', value: 'email' },
          { label: 'location', value: 'location' }
        ]}
        onChangeSelection={columns => {
          console.log(columns);
        }}
      />
    </RightPart>
  </SectionHeaderWrapper>
);
