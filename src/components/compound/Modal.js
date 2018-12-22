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

const Content = styled.div`
  box-sizing: border-box;
  padding: 30px;
  padding-top: 105px;
  min-height: 265px;
  overflow: auto;
`;

const ActionWrapper = styled.div`
  display: flex;
  padding: 15px 30px;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #e5e5e5;
`;

const modalStyles = {
  overlay: {
    background: 'transparent'
  },
  modal: {
    padding: '0px',
    width: '50%'
  }
};

export default class CustomModal extends React.Component {
  render() {
    const { open, onClose, children, title, actions } = this.props;
    return (
      <Modal styles={modalStyles} open={open} onClose={onClose}>
        <Content>
          <Header>{title}</Header>
          {children}
        </Content>
        {actions && <ActionWrapper>{actions}</ActionWrapper>}
      </Modal>
    );
  }
}
