import React from 'react';
import styled from 'styled-components';

import EditImage from '../../../../resources/edit.svg';

const Wrapper = styled.div``;

const Field = styled.div`
  margin-bottom: 30px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  font-weight: bold;
  color: #004258;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
`;

const EditButtonIcon = styled.img`
  width: 17px;
  height: 17px;
`

const EditButton = styled.a`
  color: transparent;
  background: transparent;
  &:active {
    outline: none;
  }
`

export default ({ name, make, model, length, onEdit }) => (
  <Wrapper>
    <EditWrapper>
      <Field>
        <Label>BOAT NAME</Label>
        <FieldValue>{name}</FieldValue>
      </Field>
      <EditButton onClick={onEdit}>
        <EditButtonIcon src={EditImage} />
      </EditButton>
    </EditWrapper>
    <Field>
      <Label>BOAT MAKE</Label>
      <FieldValue>{make}</FieldValue>
    </Field>
    <Field>
      <Label>BOAT MODEL</Label>
      <FieldValue>{model}</FieldValue>
    </Field>
    <Field>
      <Label>BOAT LENGTH</Label>
      <FieldValue>{length}</FieldValue>
    </Field>
    {/* <Field>
      <Label>BOAT LOCATION</Label>
      <FieldValue>{location}</FieldValue>
    </Field> */}
  </Wrapper>
);
