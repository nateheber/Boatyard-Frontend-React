import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Header = styled.div`
  flex: 1 0 auto;
  background-color: #fafafa;
  color: #003247;
  padding: 25px;
  height: 75px;
  border-bottom: 1px solid #e5e5e5;
  font-family: 'Source Sans', sans-serif;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 28px;
`;

const modalStyles = {
  overlay: {
    background: 'transparent'
  },
  modal: {
    padding: '0px'
  }
};

export default class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }
  render() {
    const { open, onClose, children } = this.props;
    const { title } = this.state;
    return (
      <Modal styles={modalStyles} open={open} onClose={onClose}>
        <Header>{title}</Header>
        {children}
      </Modal>
    );
  }
}