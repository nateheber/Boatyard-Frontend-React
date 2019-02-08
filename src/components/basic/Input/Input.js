import React from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

const ErrorMessage = styled.div`
  color: #f7941e !important;
  display: block;
  font-weight: 400;
  font-size: 12px;
  margin: 0 0 5px;
  font-family: 'Source Sans', sans-serif;
  line-height: 1.125;
  text-transform: capitalize;
  opacity: 0;
  transition: opacity 0.5s;
  &.show {
    opacity: 1;
  }
`;

const MaskInput = styled(InputMask)`
  position: relative;
  background: #fff;
  padding: 0 15px;
  margin-bottom: 5px;
  border: 1px solid #dfdfdf;
  height: 30px;
  width: 100%;
  border-radius: 5px !important;
  outline: none;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  &:disabled {
    background: #f1f1f1;
  }
`;

export class Input extends React.Component {
  render() {
    const { hasError, errorMessage, hideError, ...rest } = this.props;
    return (
      <React.Fragment>
        <MaskInput {...rest} />
        { (!hideError && hasError) &&
          <ErrorMessage className={classNames({ show: hasError })}>
            {errorMessage}
          </ErrorMessage>
        }
      </React.Fragment>
    );
  }
}

const Selector = styled.select`
  background: #fff;
  padding: 0 15px;
  margin-bottom: 5px;
  border: 1px solid #dfdfdf;
  height: 30px;
  width: 100%;
  border-radius: 5px !important;
  outline: none;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  &:disabled {
    background: #f1f1f1;
  }
`;

export class Select extends React.Component {
  render() {
    const { hasError, errorMessage, hideError, ...rest } = this.props;
    return (
      <React.Fragment>
        <Selector {...rest} />
        { (!hideError && hasError) &&
          <ErrorMessage className={classNames({ show: hasError })}>
            {errorMessage}
          </ErrorMessage>
        }
      </React.Fragment>
    );
  }
}
