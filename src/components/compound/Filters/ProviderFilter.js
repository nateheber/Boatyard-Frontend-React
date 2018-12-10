import React from 'react';
import styled from 'styled-components';

import { OrangeButton } from 'components/basic/Buttons';
import { Input } from 'components/basic/Input';

const ProviderFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  margin-bottom: 15px;
`;

const FilterInput = styled(Input)`
  width: 350px !important;
  margin-bottom: 0px;
`;

export const ProviderFilter = ({ onChangeFilter, onNewItem }) => (
  <ProviderFilterWrapper>
    <FilterInput
      placeholder="Filter by name, contact, locatio, etc."
      onChange={onChangeFilter}
    />
    <OrangeButton onClick={onNewItem}>CREATE PROVIDER</OrangeButton>
  </ProviderFilterWrapper>
);
