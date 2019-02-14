import React from 'react';
import styled from 'styled-components';
import className from 'classnames';

const ErrorMessage = styled.div`
  color: #f7941e !important;
  display: block;
  font-weight: 400;
  font-size: 12px;
  margin: 0 0 5px;
  margin-bottom: 15px;
  line-height: 1.125;
  opacity: 0;
  transition: opacity 0.5s;
  &.show {
    opacity: 1;
  }
`;

const Input = styled.textarea`
  background: #fff;
  padding: 15px;
  margin-bottom: 5px;
  border: 1px solid #dfdfdf;
  min-height: 100px;
  width: 100%;
  border-radius: 6px !important;
  outline: none;
  box-sizing: border-box;
  resize: none;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  color: #555;
  &:disabled {
    background: #f1f1f1;
  }
`;

export class TextArea extends React.Component {
  render() {
    const { hasError, hideError, errorMessage, ...rest } = this.props;
    return (
      <React.Fragment>
        <Input {...rest} />
        { (!hideError && hasError) && <ErrorMessage className={className({ show: hasError })}>
          {errorMessage}
        </ErrorMessage>}
      </React.Fragment>
    );
  }
}
