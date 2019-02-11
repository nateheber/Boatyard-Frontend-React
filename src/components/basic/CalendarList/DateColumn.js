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

const DateContainer = styled.div`
  height: 45px;
  color: #b9b9b9;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px !important;
  text-align: center;
  z-index: 3;
`;

const FirstHalf = styled.div`
  height: 22px;
  padding: 0px 2px;
  background-color: white;
`;

const SecondHalf = styled.div`
  height: 22px;
  background-color: #f7f7f7;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 249, 244, 0.5);
  top: 0px;
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
    <DateContainer>
      <div>{moment(date).format('dddd')}</div>
      <div>{moment(date).format('M/D')}</div>
    </DateContainer>
    <TimeWrapper>
      {times(24, idx => {
        return (
          <div key={`div_${idx}`}>
            <FirstHalf onClick={() => {
              if (onClickTime) {
                onClickTime(parsetMomentToDate(date), `${idx}:00`)}
              }
            }/>
            <SecondHalf onClick={() => {
              if (onClickTime) {
                onClickTime(parsetMomentToDate(date), `${idx}:30`)}
              }
            }/>
          </div>
        );
      })}
      {renderAssignments(date, assignments)}
    </TimeWrapper>
    {active && <Overlay />}
  </Wrapper>
);
