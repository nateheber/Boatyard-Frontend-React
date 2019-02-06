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
  padding: 15px 40px 15px 15px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 1.42857;
  font-weight: 700;
  // font-family: Montserrat, sans-serif;
  box-sizing: border-box;
  width: 100%;
  font-family: Helvetica;
  font-size: 36px;
  text-align: center;
  &.noBorder {
    border-bottom: none;
  }
`;

const Body = styled.div`
  box-sizing: border-box;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 35px 100px 15px;
  @media (max-width: 1200px) {
    padding: 35px 70px 15px;    
  }
  @media (max-width: 1200px) {
    padding: 35px 60px 15px;    
  }
  @media (max-width: 768px) {
    padding: 35px 40px 15px;    
  }
  @media (max-width: 600px) {
    padding: 30px 20px 5px;    
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  padding: 10px 100px 30px;
  justify-content: space-between;
  align-items: center;
  &.alone {
    justify-content: flex-end;
  }
  // border-top: 1px solid #e5e5e5;
  > button {
    height: 48px;
  }
  @media (max-width: 1200px) {
    padding: 10px 70px 30px;    
  }
  @media (max-width: 1200px) {
    padding: 10px 60px 30px;    
  }
  @media (max-width: 820px) {
    flex-direction: column-reverse;
    justify-content: center;
    > button {
      width: 100%;
    }
  }
  @media (max-width: 768px) {
    padding: 10px 40px 30px;    
  }
  @media (max-width: 600px) {
    padding: 10px 20px 20px;    
  }

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
  },
  normal: {
    overlay: {
      background: 'transparent'
    },
    modal: {
      padding: '0px',
      width: '550px'
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
    const { open, onClose, children, title, actions, small, normal, minHeight, loading, spinnerOptions, tabs, selected, onSelect } = this.props;
    return (
      <Modal
        styles={small ? modalStyles.small : normal ? modalStyles.normal : modalStyles.main}
        open={open}
        onClose={onClose}
        style={{width: '300px'}}
      >
        <Header className={!isEmpty(tabs) ? 'noBorder' : ''}>{title}</Header>
        {!isEmpty(tabs) && <ModalTab tabs={tabs} selected={selected} onSelect={onSelect} /> }
        <Body>
          <Content style={{ minHeight: minHeight || 'inherit' }}>
            {children}
          </Content>
          {actions && <ActionWrapper className={actions.length < 2 && 'alone'}>{actions}</ActionWrapper>}
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
