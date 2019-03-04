import React from 'react';
import styled from 'styled-components';

import { EditButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const Name = styled.div`
  color: #004258 !important;
  font-family: 'Source Sans', sans-serif !important;
  font-size: 14px;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export default ({ firstName, lastName, email, phoneNumber, isDisabled, onEdit }) => (
  <Wrapper>
    <EditWrapper>
      <Name>
        {firstName} {lastName}
      </Name>
      {onEdit && !isDisabled && <EditButton onClick={onEdit} />}
    </EditWrapper>
    <FieldValue>{phoneNumber}</FieldValue>
    <FieldValue>{email}</FieldValue>
  </Wrapper>
);
