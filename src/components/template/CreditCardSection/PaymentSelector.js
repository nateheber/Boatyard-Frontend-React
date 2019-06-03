import React from 'react';
import styled from 'styled-components';

import PaymentOption from './PaymentOption';

const Wrapper = styled.div`
`;

const Title = styled.div`
  font-family: Montserrat, sans-serif;
  color: #07384b;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 14px;
`;

const options = ['cash', 'check']

export default class PaymentOptionSelector extends React.Component {
  onSelect = (selected) => {
    this.props.onChange(selected);
  };

  render() {
    const { selected } = this.props;
    return (
      <Wrapper>
        <Title>Payment Method</Title>
        <React.Fragment>
          {
            options.map((option, idx) => (
              <PaymentOption
                option={option}
                isSelected={selected === option}
                onSelect={this.onSelect}
                key={`option_${idx}`}
              />
            ))
          }
        </React.Fragment>
      </Wrapper>
    );
  }
}