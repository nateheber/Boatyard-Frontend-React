import React from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';

import './style.css';

export class DatePicker extends React.Component {
  render() {
    const { date, onChange } = this.props;
    return <Calendar value={date} onChange={onChange} />;
  }
}
