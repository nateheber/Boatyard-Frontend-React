import React from 'react';
import styled from 'styled-components';

import { Section } from 'components/basic/InfoSection';
import { HollowButton } from 'components/basic/Buttons';

import OrderPaymentModal from '../modals/OrderPaymentModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

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
`

const Buttons  = styled.div`
  display: flex;
  flex-direction: column;
`

export default class OrderReviewSection extends React.Component {
  state = {
    showModal: false
  }

  onCloseModal = () => {
    this.setState({ showModal: false })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { userId, orderId, balance } = this.props;
    const { showModal } = this.state;
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
        <OrderPaymentModal
          open={showModal}
          onClose={this.onCloseModal}
          userId={userId}
          balance={balance}
          orderId={orderId}
        />
      </Section>
    )
  }
}
