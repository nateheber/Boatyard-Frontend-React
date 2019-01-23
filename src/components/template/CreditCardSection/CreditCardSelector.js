import React from 'react';
import styled from 'styled-components';
import { findIndex, get } from 'lodash';
import deepEqual from 'fast-deep-equal';

import { HollowButton } from 'components/basic/Buttons';

import CreditCardOption from './CreditCardOption';
import CreationModal from './CreationModal';

const Wrapper = styled.div`
`

const Title = styled.div`
  font-family: Montserrat, sans-serif;
  color: #07384b;
  margin-top: 0;
  margin-bottom: 20px;
`

export default class CreditCardSelector extends React.Component {
  constructor(props) {
    super(props);
    const idx = findIndex(props.creditCards, ({attributes: { isDefault }}) => isDefault)
    const id = get(props, `creditCards[${idx}].id`, -1)
    this.state = {
      selected: id,
      showNewPaymentModal: false,
    }
    props.onChange(id)
  }

  componentDidUpdate(prevProps) {
    if(!deepEqual(prevProps.creditCards, this.props.creditCards)) {
      const idx = findIndex(this.props.creditCards, ({attributes: { isDefault }}) => isDefault)
      const id = get(this.props, `creditCards[${idx}].id`, -1)
      this.setState({
        selected: id
      })
      this.props.onChange(id)
    }
  }

  onSelect = (selected) => {
    this.setState({ selected })
    this.props.onChange(selected)
  }

  showCreationModal = () => {
    this.setState({ showNewPaymentModal: true })
  }

  closeCreationModal = () => {
    this.setState({ showNewPaymentModal: false })
  }

  render() {
    const { creditCards, userId, refreshCards } = this.props;
    const { selected, showNewPaymentModal } = this.state;
    return (
      <Wrapper>
        <Title>Payment Method</Title>
        <React.Fragment>
          {
            creditCards.map((creditCard, idx) => (
              <CreditCardOption
                creditCard={creditCard}
                isSelected={selected === creditCard.id}
                onSelect={this.onSelect}
                key={`option_${idx}`}
              />
            ))
          }
        </React.Fragment>
        <HollowButton onClick={this.showCreationModal} >New Payment Method</HollowButton>
        <CreationModal
          userId={userId}
          open={showNewPaymentModal}
          onClose={this.closeCreationModal}
          refreshCards={refreshCards}
        />
      </Wrapper>
    );
  }
}