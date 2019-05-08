import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import classNames from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const DateSelectWrapper = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    width: 100%;
    .react-datepicker__input-container {
      width: 100%;
      >input {
        margin-bottom: 5px;
      }
    }
  }
`;

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

export class DateSelector extends React.Component {
  render() {
    const { hasError, hideError, errorMessage, ...rest } = this.props;
    return (
      <DateSelectWrapper>
        <DatePicker {...rest} />
        { (!hideError && hasError) &&
          <ErrorMessage className={classNames({ show: hasError })}>
            {errorMessage}
          </ErrorMessage>
        }
      </DateSelectWrapper>
    );
  }
}
