import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DateContainer = styled.div`
  flex: 1;
  height: 45px;
  color: #b9b9b9;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px !important;
  text-align: center;
  z-index: 3;
  &.active {
    background-color: rgb(254, 252, 250);
  }
`;

export default ({ date }) => {
  const columns = [];
  for (let i = 0; i < 7; i += 1) {
    const mDate = moment(date).startOf('week');
    columns.push(
      <DateContainer
        date={mDate.add(i, 'days')}
        className={mDate.isSame(moment(date), 'day') ? 'active' : ''}
        key={`column_${i}`}
      >
        <div>{moment(date).format('dddd')}</div>
        <div>{moment(date).format('M/D')}</div>
      </DateContainer>
    );
  }
  return (
    <Wrapper>
      {columns}
    </Wrapper>
  )
}