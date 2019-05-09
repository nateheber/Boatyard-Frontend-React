import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  padding: 5px;
  outline: none;
  cursor: pointer;
  background: #FFFFFF;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.12) 100%);
  border: 1px solid #A9B5BB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class GradientButton extends React.Component {

  handleClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  render () {
    const { children } = this.props
    return (<Button onClick={this.handleClick} >
      {children}
    </Button>);
  }
}