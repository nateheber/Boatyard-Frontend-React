import React from 'react';

import { SectionHeaderWrapper, LeftPart, RightPart } from '../../basic/Header';
import { ColumnFilter } from '../../basic/Dropdown';
import { PageTitle } from '../../basic/Typho';

export const ProviderHeader = ({ onAction }) => (
  <SectionHeaderWrapper>
    <LeftPart>
      <PageTitle>Orders</PageTitle>
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
