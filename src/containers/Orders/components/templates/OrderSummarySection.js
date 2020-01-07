import React from 'react'
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { get, startCase } from 'lodash';
import moment from 'moment';

import { Section } from 'components/basic/InfoSection';
import * as constants from 'utils/constants';

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
  vertical-align: top;
`;

const FieldValue = styled.td`
  font-family: 'Source Sans Pro';
  color: #07384b;
  font-size: 16px;
  font-weight: 400;
  padding: 0 0 15px 0;
`;

export default class OrderSummarySection extends React.Component {
  renderWhenValues = () => {
    const { order } = this.props;
    const lineItems = get(order, 'lineItems', []);
    if (lineItems && lineItems.length > 0) {
      const scheduleItems = get(lineItems[0], 'relationships.lineItemSchedules', []);
      if (scheduleItems && scheduleItems.length > 0) {
        const scheduleItem = scheduleItems[0];
        if (scheduleItem) {
          if (get(scheduleItem, 'attributes.flexible')) {
            return (
              <TR>
                <Label>WHEN</Label>
                <FieldValue sm={3} md={3} lg={3}>{constants.WHEN_FLEXIBLE_OPTION}</FieldValue>
              </TR>
            );
          } else if (get(scheduleItem, 'attributes.asap')) {
            return (
              <TR>
                <Label>WHEN</Label>
                <FieldValue sm={3} md={3} lg={3}>{constants.WHEN_ASAP_OPTION}</FieldValue>
              </TR>
            );
          } else if (get(scheduleItem, 'attributes.complicated')) {
            const complicated = get(scheduleItem, 'attributes.complicated');
            return (
              <TR>
                <Label>WHEN</Label>
                <FieldValue sm={3} md={3} lg={3}>{`${constants.WHEN_COMPLICATED_OPTION} - ${complicated}`}</FieldValue>
              </TR>
            );
          } else {
            const startAt = moment(get(scheduleItem, 'attributes.specificStart'));
            let morning = true;
            if (startAt.hours() > 11) {
              morning = false;
            }
            return (
              <TR>
                <Label>WHEN</Label>
                <FieldValue sm={3} md={3} lg={3}>{`${startAt.format('MM/DD/YYYY')} (${morning ? 'Morning' : 'Afternoon'})`}</FieldValue>
              </TR>
            );
          }
        }
      }
    }
    return null;
  };

  renderProperties = () => {
    const { order } = this.props;
    const properties = get(order, 'attributes.properties', {});
    const fields = [];
    for (const key in properties) {
      const value = get(properties, key);
      const answer = typeof value === 'boolean' ? value === true ? 'Yes' : 'No' : value
      fields.push(
        <TR key={`${key} - ${value}`}>
          <Label>
            {startCase(key)}
          </Label>
          <FieldValue sm={3} md={3} lg={3}>
            {answer}
          </FieldValue>
        </TR>
      );
    }
    return fields;
  };

  render () {
    //const { lineItem, order, memorialization } = this.props;
    const { lineItem, order } = this.props;
    const specialInstructions = get(order, 'attributes.specialInstructions');
    const slipNumber = get(order, 'attributes.slipNumber');

    //const serviceName = get(memorialization, 'service.name');
    //const providerLocationServiceName = get(memorialization, 'providerLocationService.name');
    const serviceName = get(lineItem, 'relationships.service.attributes.name');
    const providerLocationServiceName = get(lineItem, 'relationships.providerLocationService.attributes.name');
    // console.log(lineItem);
    return (isEmpty(lineItem) && isEmpty(slipNumber) && isEmpty(specialInstructions)) ? false : (
      <Section title="Order Summary">
        <table>
          <tbody>
            {!isEmpty(lineItem) && <TR>
              <Label>
                SERVICE
              </Label>
              <FieldValue sm={3} md={3} lg={3}>
                {providerLocationServiceName || serviceName}
              </FieldValue>
            </TR>}
            {this.renderWhenValues()}
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
                <div dangerouslySetInnerHTML={{ __html: specialInstructions}} />
              </FieldValue>
            </TR>}
          </tbody>
        </table>
      </Section>
    )
  }
}
