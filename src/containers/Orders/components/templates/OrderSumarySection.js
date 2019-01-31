import React from 'react'
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { get } from 'lodash';

import { Section } from 'components/basic/InfoSection'


const Field = styled.tr`
  &:last-child {
  }
`;

const Label = styled.td`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  color: #004258;
  text-transform: uppercase;
  font-weight: bold;
  padding-bottom: 15px;
  padding-right: 10px;
  line-height: 20px;
`;

const FieldValue = styled.td`
  font-family: 'Source Sans Pro';
  color: #07384b;
  font-size: 16px;
  font-weight: 400;
  padding: 0 0 15px 0;
`;

export default class OrderSumarySection extends React.Component {
  render () {
    const { lineItem, specialInstructions } = this.props;
    const serviceName = get(lineItem, 'relationships.service.attributes.name');
    return isEmpty(lineItem) ? false : (
      <Section title="Order Summary">
        <table>
          <Field>
            <Label>
              SERVICE
            </Label>
            <FieldValue sm={3} md={3} lg={3}>
              {serviceName}
            </FieldValue>
          </Field>
          <Field>
            <Label>
              Special Instructions
            </Label>
            <FieldValue sm={3} md={3} lg={3}>
              {specialInstructions}
            </FieldValue>
          </Field>
        </table>
      </Section>
    )
  }
}
