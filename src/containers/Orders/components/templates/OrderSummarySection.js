import React from 'react'
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { get } from 'lodash';

import { Section } from 'components/basic/InfoSection';

const TR = styled.tr`
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

export default class OrderSummarySection extends React.Component {
  renderProperties = () => {
    const { order } = this.props;
    const properties = get(order, 'attributes.properties', {});
    const fields = [];
    for (const key in properties) {
      const value = get(properties, key);
      fields.push(
        <TR key={`${key} - ${value}`}>
          <Label>
            {key.toUpperCase()}
          </Label>
          <FieldValue sm={3} md={3} lg={3}>
            {value}
          </FieldValue>
        </TR>
      );
    }
    return fields;
  };

  render () {
    const { lineItem, order } = this.props;
    const specialInstructions = get(order, 'attributes.specialInstructions');
    const slipNumber = get(order, 'attributes.slipNumber');

    const serviceName = get(lineItem, 'relationships.service.attributes.name');
    return (isEmpty(lineItem) && isEmpty(slipNumber) && isEmpty(specialInstructions)) ? false : (
      <Section title="Order Summary">
        <table>
          <tbody>
            {!isEmpty(lineItem) && <TR>
              <Label>
                SERVICE
              </Label>
              <FieldValue sm={3} md={3} lg={3}>
                {serviceName}
              </FieldValue>
            </TR>}
            {this.renderProperties()}
            {!isEmpty(slipNumber) && <TR>
              <Label>
                Slip Number
              </Label>
              <FieldValue sm={3} md={3} lg={3}>
                {slipNumber}
              </FieldValue>
            </TR>}
            {!isEmpty(specialInstructions) && <TR>
              <Label>
                Special Instructions
              </Label>
              <FieldValue sm={3} md={3} lg={3}>
                {specialInstructions}
              </FieldValue>
            </TR>}
          </tbody>
        </table>
      </Section>
    )
  }
}
