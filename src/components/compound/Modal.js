import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { isEmpty } from 'lodash';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import ModalTab from './ModalTab';

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
  &.noBorder {
    border-bottom: none;
  }
`;

const Body = styled.div`
  box-sizing: border-box;
  // min-height: 265px;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 30px;
  // min-height: 265px;
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
    const { open, onClose, children, title, actions, small, loading, spinnerOptions, tabs, selected, onSelect } = this.props;
    return (
      <Modal
        styles={small ? modalStyles.small : modalStyles.main}
        open={open}
        onClose={onClose}
        style={{width: '300px'}}
      >
        <Header className={!isEmpty(tabs) ? 'noBorder' : ''}>{title}</Header>
        {!isEmpty(tabs) && <ModalTab tabs={tabs} selected={selected} onSelect={onSelect} /> }
        <Body>
          <Content>
            {children}
          </Content>
          {actions && <ActionWrapper>{actions}</ActionWrapper>}
          {loading && <LoadingSpinner
            loading={true}
            backgroundColor={spinnerOptions && spinnerOptions.backgroundColor}
            opacity={spinnerOptions && spinnerOptions.opacity}
          />}
        </Body>
      </Modal>
    );
  }
}
