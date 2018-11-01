import React from 'react';

import { storiesOf } from '@storybook/react';

import LeftPart from '../components/template/Calendar/LeftPart';
import { CalendarDropdown } from '../components/basic/Dropdown';
import { TimeColumn, DateColumn } from '../components/basic/CalendarList';
import {
  TeamMembers,
  DatePicker,
  CalendarList
} from '../components/compound/Calendar';

storiesOf('Calendar Components', module)
  .add('Calendar', () => <DatePicker date={new Date()} />)
  .add('Calendar Drodown', () => (
    <CalendarDropdown
      onChange={mode => {
        console.log(mode);
      }}
    />
  ))
  .add('Team Members', () => {
    const members = [
      { name: 'Detailer Brock Boatyard', color: 'rgb(254, 195, 80)' },
      { name: 'Daniel Zheng', color: 'rgb(247, 154, 67)' }
    ];
    return <TeamMembers members={members} />;
  })
  .add('Calendar Left Part', () => <LeftPart />)
  .add('Time Column', () => <TimeColumn />)
  .add('Date Column', () => <DateColumn />)
  .add('Calendar List', () => <CalendarList date={new Date()} />);
