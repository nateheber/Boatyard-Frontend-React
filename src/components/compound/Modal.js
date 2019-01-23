import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Header = styled.div`
  flex: 1 0 auto;
  background-color: #fafafa;
  color: #003247;
  padding: 25px 40px 25px 25px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 18px;
  line-height: 1.42857;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
  box-sizing: border-box;
  width: 100%;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 30px;
  min-height: 265px;
`;

const ActionWrapper = styled.div`
  display: flex;
  padding: 15px 30px;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #e5e5e5;
`;

const modalStyles = {
  main: {
    overlay: {
      background: 'transparent'
    },
    modal: {
      padding: '0px',
      width: '50%',
      maxWidth: '700px'
    },
    closeButton: {
      top: '25px',
      right: '15px'
    },
    closeIcon: {
      fill: '#003247'
    }
  },
  small: {
    overlay: {
      background: 'transparent'
    },
    modal: {
      padding: '0px',
      width: '400px'
    },
    closeButton: {
      top: '25px',
      right: '15px'
    },
    closeIcon: {
      fill: '#003247'
    }
  }
};

export default class CustomModal extends React.Component {
  render() {
    const { open, onClose, children, title, actions, small } = this.props;
    return (
      <Modal
        styles={small ? modalStyles.small : modalStyles.main}
        open={open}
        onClose={onClose}
        style={{width: '300px'}}
      >
        <Header>{title}</Header>
        <Content>
          {children}
        </Content>
        {actions && <ActionWrapper>{actions}</ActionWrapper>}
      </Modal>
    );
  }
}
