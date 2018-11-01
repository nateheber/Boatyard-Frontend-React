import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { times } from 'lodash';

import { TimeColumn, DateColumn } from '../../basic/CalendarList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export class CalendarList extends React.Component {
  render() {
    const { date } = this.props;
    const mDate = moment(date);
    return (
      <Wrapper>
        <TimeColumn />
        {times(7, dt => {
          return <DateColumn date={mDate.add(dt)} />;
        })}
      </Wrapper>
    );
  }
}
