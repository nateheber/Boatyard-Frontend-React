import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import ModalTab from './ModalTab';

const Header = styled.div`
  flex: 1 0 auto;
  background-color: #fafafa;
  color: #003247;
  padding: 25px 40px 25px 30px;
  border-bottom: 1px solid #e5e5e5;
  line-height: 1.42857;
  font-weight: 700;
  font-family: Montserrat, sans-serif;
  box-sizing: border-box;
  width: 100%;
  font-size: 18px;
  &.noBorder {
    border-bottom: none;
  }
  &.new {
    font-size: 36px;
    text-align: center;
    padding: 15px 40px 15px 15px;
  }
  text-transform: capitalize;
`;

const Body = styled.div`
  box-sizing: border-box;
`;

const Content = styled.div`
  box-sizing: border-box;
  padding: 30px;
  &.new {
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
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  padding: 20px 30px;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid #e5e5e5;
  &.space-between {
    justify-content: space-between;
  }
  @media (max-width: 820px) {
    flex-direction: column-reverse;
    justify-content: center;
    > button {
      width: 100%;
    }
  }

  &.new {
    justify-content: space-between;
    &.alone {
      justify-content: flex-end;
    }
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
  }
`;

const modalStyles = {
  main: {
    overlay: {
      background: 'rgba(0, 0, 0, 0.3)'
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
      background: 'rgba(0, 0, 0, 0.3)'
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
  large: {
    overlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '100px 1.2rem'
    },
    modal: {
      padding: '0px',
      width: '100%',
      maxWidth: '900px'
    },
    closeButton: {
      top: '25px',
      right: '15px'
    },
    closeIcon: {
      fill: '#003247'
    }
  },
  extraLarge: {
    overlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '100px 1.2rem'
    },
    modal: {
      padding: '0px',
      width: '1080px',
      maxWidth: '1080px',
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
      background: 'rgba(0, 0, 0, 0.3)',
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
    const {
      open,
      loading,
      onClose,
      classes,
      children,
      title,
      actions,
      small,
      normal,
      large,
      extraLarge,
      minHeight,
      spinnerOptions,
      tabs,
      selected,
      onSelect,
      customHeader
    } = this.props;
    return (
      <Modal
        styles={small ? modalStyles.small :
          normal ? modalStyles.normal  :
          large ? modalStyles.large :
          extraLarge ? modalStyles.extraLarge : modalStyles.main
        }
        open={open}
        onClose={onClose}
        style={{width: '300px'}}
        center={true}
      >
        {(title && title.length > 0) && <Header className={classNames(!isEmpty(tabs) ? 'noBorder' : '', classes)}>{title}</Header>}
        {customHeader && <Header>{customHeader}</Header>}
        {!isEmpty(tabs) && <ModalTab tabs={tabs} selected={selected} onSelect={onSelect} /> }
        <Body>
          <Content style={{ minHeight: minHeight || 'inherit' }} className={classNames(classes)}>
            {children}
          </Content>
          {actions && <ActionWrapper className={classNames(actions.length < 2 && 'alone', classes)}>{actions}</ActionWrapper>}
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
