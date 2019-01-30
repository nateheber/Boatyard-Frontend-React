import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

const Wrapper = styled.div``;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Label = styled.div`
  display: inline-block;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  color: #004258;
  text-transform: uppercase;
  font-weight: bold;
  margin-right: 15px;
  margin-bottom: 15px;
  margin-top: 2px;
`;

const FieldValue = styled.div`
  display: inline-block;
  font-family: 'Source Sans Pro';
  color: #07384b;
  font-size: 16px;
  font-weight: 400;
  margin: 0px;
`;

export default ({ lineItem }) => {
  const serviceName = get(lineItem, 'relationships.service.attributes.name');
  return (
    <Wrapper>
      <Field>
        <Label>
          SERVICE
        </Label>
        <FieldValue sm={3} md={3} lg={3}>
          {serviceName}
        </FieldValue>
      </Field>
    </Wrapper>
  )
};
