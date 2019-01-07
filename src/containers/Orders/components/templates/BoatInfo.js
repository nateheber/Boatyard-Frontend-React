import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Field = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  color: #004258;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
`;

export default ({ name, make, model, length, location }) => (
  <Wrapper>
    <Field>
      <Label>BOAT NAME</Label>
      <FieldValue>{name}</FieldValue>
    </Field>
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
    <Field>
      <Label>BOAT LOCATION</Label>
      <FieldValue>{location}</FieldValue>
    </Field>
  </Wrapper>
);
