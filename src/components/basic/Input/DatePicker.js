import React from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

export const DateSelector = (props) => (
  <DatePicker {...props} />
)