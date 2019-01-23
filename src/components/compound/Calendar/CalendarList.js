import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { TimeColumn, DateColumn } from 'components/basic/CalendarList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export class CalendarList extends React.Component {

  renderColumns = () => {
    const { date, assignments } = this.props;
    const columns = [];
    for (let i = 0; i < 7; i += 1) {
      const mDate = moment(date).startOf('week');
      columns.push(
        <DateColumn
          date={mDate.add(i, 'days')}
          active={mDate.isSame(moment(date), 'day')}
          onClickTime={this.props.onClickTime}
          assignments={assignments}
          key={`column_${i}`}
        />
      );
    }
    return columns;
  }

  render() {
    return (
      <Wrapper>
        <TimeColumn />
        {this.renderColumns()}
      </Wrapper>
    );
  }
}
