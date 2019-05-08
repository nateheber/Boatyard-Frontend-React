import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const DateSelectWrapper = styled.div`
  width: 100%;
  .react-datepicker-wrapper {
    width: 100%;
    .react-datepicker__input-container {
      width: 100%;
    }
  }
`;

export class DateSelector extends React.Component {
  render() {
    const { hasError, hideError, errorMessage, ...rest } = this.props;
    return (
      <DateSelectWrapper>
        <DatePicker {...rest} />
      </DateSelectWrapper>
    );
  }
}
