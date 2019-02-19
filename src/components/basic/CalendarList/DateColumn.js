import React from 'react';
import styled from 'styled-components';
import { times, filter } from 'lodash';
import moment from 'moment';

import { parsetMomentToDate } from 'utils/date'

import Assignment from './Assignment'

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  border-right: 1px solid #ddd;
`;

const FirstHalf = styled.div`
  height: 22px;
  padding: 0px 2px;
  background-color: white;
  &.active {
    background-color: rgb(254, 252, 250);
  }
`;

const SecondHalf = styled.div`
  height: 22px;
  background-color: #f7f7f7;
  &.active {
    background-color: rgb(250, 248, 246);
  }
`;

const TimeWrapper = styled.div`
  position: relative;
`

const renderAssignments = (date, assignments) => {
  const renderingData = filter(assignments,
    (assignment) => moment(date).isBetween(moment(assignment.from), moment(assignment.to)) ||
      moment(date).isSame(assignment.from, 'day') ||
      moment(date).isSame(assignment.to, 'day')
  )
  return renderingData.map((data, idx) => <Assignment date={date} {...data} key={`assignment_${idx}`} />)
}

export const DateColumn = ({ date, active, onClickTime, assignments }) => (
  <Wrapper>
    <TimeWrapper>
      {times(24, idx => {
        return (
          <div key={`div_${idx}`}>
            <FirstHalf className={active ? 'active' : ''} onClick={() => {
              if (onClickTime) {
                onClickTime(parsetMomentToDate(date), `${idx}:00`)}
              }
            }/>
            <SecondHalf className={active ? 'active' : ''} onClick={() => {
              if (onClickTime) {
                onClickTime(parsetMomentToDate(date), `${idx}:30`)}
              }
            }/>
          </div>
        );
      })}
      {renderAssignments(date, assignments)}
    </TimeWrapper>
  </Wrapper>
);
