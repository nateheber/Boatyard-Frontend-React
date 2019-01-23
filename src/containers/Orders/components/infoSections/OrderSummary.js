import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-flexbox-grid';

const Wrapper = styled.div``;

const Field = styled(Row)`
  margin-bottom: 30px;
  padding-left: 20px;
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
`;

const FieldValue = styled.p`
  display: inline-block;
  font-family: 'Source Sans Pro';
  color: #004258;
  font-size: 16px;
  font-weight: 400;
  margin: 0px;
`;

export default ({ lineItem }) => {
  const { serviceAttributes: { name: serviceName } } = lineItem;
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
