import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { TimeColumn, DateColumn } from 'components/basic/CalendarList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export class CalendarList extends React.Component {
  render() {
    const { date } = this.props;
    const columns = [];
    for (let i = 0; i < 7; i += 1) {
      const mDate = moment(date).startOf('week');
      columns.push(
        <DateColumn
          date={mDate.add(i, 'days')}
          active={mDate.isSame(moment(date), 'day')}
        />
      );
    }
    return (
      <Wrapper>
        <TimeColumn />
        {columns}
      </Wrapper>
    );
  }
}
