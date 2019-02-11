import React from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

export class DateSelector extends React.Component {
  render() {
    const { hasError, hideError, errorMessage, ...rest } = this.props;
    return (
      <DatePicker {...rest} />
    );
  }
}
