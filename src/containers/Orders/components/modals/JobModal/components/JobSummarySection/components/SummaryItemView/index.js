import React from 'react';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import { Row, Col } from 'react-flexbox-grid';
import { get } from 'lodash';
import moment from 'moment';
import { DeleteButton } from '../../../Section';
import * as constants from 'utils/constants';

const ContentWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  .btn-delete {
    position: absolute;
    top: -15px;
    right: -15px;
  }
`;

const Text = styled.div`
  font-family: Helvetica;
  font-size: 15px;
  color: #003247;
  line-height: 23px;
  &.title {
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const Divider = styled.div`
  border-top: 1px solid #A9B5BB;
  margin: 20px -25px;
  height: 1px;
`;

export default class AttachmentSection extends React.Component {
  handleAddAttachment = () => {
  };

  whenValue = () => {
    const { order } = this.props;
    const lineItems = get(order, 'lineItems', []);
    if (lineItems && lineItems.length > 0) {
      const scheduleItems = get(lineItems[0], 'relationships.lineItemSchedules', []);
      if (scheduleItems && scheduleItems.length > 0) {
        const scheduleItem = scheduleItems[0];
        if (scheduleItem) {
          if (get(scheduleItem, 'attributes.flexible')) {
            return constants.WHEN_FLEXIBLE_OPTION;
          } else if (get(scheduleItem, 'attributes.asap')) {
            return constants.WHEN_ASAP_OPTION;
          } else if (get(scheduleItem, 'attributes.complicated')) {
            return constants.WHEN_COMPLICATED_OPTION;
          } else {
            const startAt = moment(get(scheduleItem, 'attributes.specificStart'));
            let morning = true;
            if (startAt.hours() > 11) {
              morning = false;
            }
            return `${startAt.format('MM/DD/YYYY')} (${morning ? 'Morning' : 'Afternoon'})`;
          }
        }
      }
    }
    return null;
  };

  // renderProperties = () => {
  //   const { service } = this.props;
  //   const properties = get(order, 'attributes.properties', {});
  //   const fields = [];
  //   for (const key in properties) {
  //     const value = get(properties, key);
  //     fields.push(
  //       <Col xs={12} sm={6} md={3} key={`${key} - ${value}`}>
  //         <Text className='title'>{startCase(key)}:</Text>
  //         <Text>{value}</Text>
  //       </Col>
  //     );
  //   }
  //   return fields;
  // };

  render() {
    const { service: {name, scheduled_text, notes } } = this.props;
    // console.log(order);
    return (
      <ContentWrapper>
        <Row style={{ marginBottom: 37 }}>
          <Col xs={12} sm={6} md={3}>
            <Text className='title'>Service:</Text>
            <Text>{name}</Text>
          </Col>

          <Col xs={12} sm={6} md={3}>
            <Text className='title'>When:</Text>
            <Text>{scheduled_text}</Text>
          </Col>
      </Row>
        <Row>
          <Col xs={12}>
            <Text className='title'>Special Instructions:</Text>
            <Text>{notes}</Text>
          </Col>
        </Row>
        <DeleteButton className="btn-delete" onClick={this.props.handleDelete}>
          <EvilIcon name="ei-close" size="s" className="close-icon" />
        </DeleteButton>
        <Divider />
      </ContentWrapper>
    );
  }
}
