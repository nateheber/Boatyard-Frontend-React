import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';

const Wrapper = styled.div``;

const Field = styled(Row)`
  margin-bottom: 30px;
`;

const Label = styled(Col)`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  color: #004258;
`;

const FieldValue = styled(Col)`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
`;

export default ({ service, when, specialInstructions }) => (
  <Wrapper>
    <Field>
      <Label sm={3} md={3} lg={3}>
        SERVICE
      </Label>
      <FieldValue sm={3} md={3} lg={3}>
        {service}
      </FieldValue>
    </Field>
    <Field>
      <Label sm={3} md={3} lg={3}>
        WHEN
      </Label>
      <FieldValue sm={3} md={3} lg={3}>
        {when}
      </FieldValue>
    </Field>
    <Field>
      <Label sm={3} md={3} lg={3}>
        SPECIAL INSTRUCTIONS
      </Label>
      <FieldValue sm={3} md={3} lg={3}>
        {specialInstructions}
      </FieldValue>
    </Field>
  </Wrapper>
);
