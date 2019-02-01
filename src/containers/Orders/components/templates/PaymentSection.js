import React from 'react';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';

import { Section } from 'components/basic/InfoSection';
import { HollowButton } from 'components/basic/Buttons';
import OrderPaymentModal from '../modals/OrderPaymentModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoItem = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
`;

const InfoList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Buttons  = styled.div`
  display: flex;
  flex-direction: column;
`;

export default class OrderReviewSection extends React.Component {
  state = {
    showModal: false
  };

  onCloseModal = () => {
    this.setState({ showModal: false })
  };

  openModal = () => {
    this.setState({ showModal: true })
  };

  render() {
    const { order } = this.props;
    const { showModal } = this.state;
    const balance = get(order, 'attributes.balance');
    return (
      <Section title="Payment">
        <Wrapper>
          <InfoList>
            <InfoItem>
              Balance Remaining: ${balance}
            </InfoItem>
          </InfoList>
          <Buttons>
            <HollowButton onClick={this.openModal}>Enter Payment</HollowButton>
          </Buttons>
        </Wrapper>
        {(!isEmpty(order) && showModal) && <OrderPaymentModal
          open={showModal}
          onClose={this.onCloseModal}
          order={order}
        />}
      </Section>
    )
  }
}
