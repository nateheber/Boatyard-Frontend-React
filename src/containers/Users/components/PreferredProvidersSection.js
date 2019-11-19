import React from 'react';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import RemoveButton from '../../Orders/components/basic/RemoveButton';
import { NormalText } from 'components/basic/Typho'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 220px;
  overflow: auto;
  margin: -30px -20px;
`;

const Name = styled.div`
  color: #004258 !important;
  font-family: 'Source Sans', sans-serif !important;
  font-size: 16px;
`;

const Provider = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #E6E6E6;
  padding: 20px;
  align-items: center;
`;

const NoProviders = styled(NormalText)`
  padding: 20px;
  width: 100%;
  text-align: center;
`;

export default ({ user, providers, onRemove }) => (
  <Wrapper>
    {console.log(providers)}
    {isEmpty(providers) && <NoProviders>There are no preferred providers.</NoProviders>}
    {providers.map((provider, index) => {
      return (
        <Provider key={`providers-${index}`}>
          <Name>{get(provider, 'relationships.provider.attributes.name')} - {get(provider, 'relationships.providerLocation.attributes.locationName')}</Name>
          {!user.isDisabled && <RemoveButton onClick={evt => onRemove(provider)} />}
        </Provider>
      )
    })}
  </Wrapper>
);
