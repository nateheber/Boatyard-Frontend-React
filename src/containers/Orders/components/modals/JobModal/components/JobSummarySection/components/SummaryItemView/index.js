import React from 'react';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import { Row, Col } from 'react-flexbox-grid';

import { DeleteButton } from '../../../Section';

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

export default class AttachmentSection extends React.Component {
  handleAddAttachment = () => {
  };

  render() {
    return (
      <ContentWrapper>
        <Row style={{ marginBottom: 37 }}>
          <Col xs={12} sm={6} md={3}>
            <Text className='title'>Service:</Text>
            <Text>Fuel Delivery</Text>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Text className='title'>When:</Text>
            <Text>Sep 17, 2019</Text>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Text className='title'>Gallons:</Text>
            <Text>300</Text>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Text className='title'>Amount:</Text>
            <Text>Fill Me Up</Text>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Text className='title'>Special Instructions:</Text>
            <Text>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et qua.</Text>
          </Col>
        </Row>
        <DeleteButton className="btn-delete" onClick={() => this.handleDelete}>
          <EvilIcon name="ei-close" size="s" className="close-icon" />
        </DeleteButton>
      </ContentWrapper>
    );
  }
}
