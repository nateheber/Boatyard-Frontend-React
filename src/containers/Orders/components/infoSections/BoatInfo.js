import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import { EditButton } from 'components/basic/Buttons';

const Wrapper = styled.div``;

const Field = styled.div`
  margin-bottom: 30px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  font-weight: bold;
  color: #004258;
  margin-bottom: 5px;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
  line-height: 1.42857;
`;

const getLocationAddressString = (location) => {
  console.log(location)
  const address = get(location, 'relationships.address.data');
  const street = get(address, 'street', '');
  const city = get(address, 'city', '');
  const state = get(address, 'state', '');
  const zip = get(address, 'zip', '');
  const line1 = `${street} ${city}`;
  const line2 = `${state} ${zip}`;
  return {line1, line2};
}

export default ({ name, make, model, length, boatLocation, onEdit }) => {
  const { line1, line2 } = getLocationAddressString(boatLocation);
  return (
    <Wrapper>
      <EditWrapper>
        <Field>
          <Label>BOAT NAME</Label>
          <FieldValue>{name}</FieldValue>
        </Field>
        <EditButton onClick={onEdit} />
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
      <Field>
        <Label>BOAT LOCATION</Label>
        <FieldValue>{line1}</FieldValue>
        <FieldValue>{line2}</FieldValue>
      </Field>
    </Wrapper>
  );
};
