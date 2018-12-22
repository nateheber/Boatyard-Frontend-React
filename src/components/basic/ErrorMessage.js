import React from 'react';
import styled from 'styled-components';
import className from 'classnames';

const MessageBox = styled.div`
  background-color: #094359 !important;
  border-color: #094359 !important;
  color: #fff !important;

  z-index: 9999999999;
  border-radius: 0 !important;
  border: 0;
  color: #fff;
  padding: 23px;
  position: fixed;
  text-align: center;
  transform: translate3d(0, 0, 0);
  transition: all 200ms ease;
  opacity: 1;
  font-size: 16px;
  width: 100%;
  margin: 0;
  max-width: 400px !important;
  left: 50%;
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  transform: scaleY(0);
  -webkit-transition: transform 0.5s;
  transition: transform 0.5s;
  &.show {
    transform: scaleY(1);
  }
`;

export default class ErrorMessage extends React.Component {
  state = {
    show: false
  };
  componentDidUpdate(prevProps) {
    if (!prevProps.error && this.props.error) {
      this.setState({
        show: true
      });
    }
    if (prevProps.error && !this.props.error) {
      this.setState({
        show: false
      });
    }
  }
  render() {
    const { show } = this.state;
    const { message } = this.props;
    return <MessageBox className={className({ show })}>{message}</MessageBox>;
  }
}
