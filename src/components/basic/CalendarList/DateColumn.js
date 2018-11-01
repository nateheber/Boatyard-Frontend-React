import React from 'react';
import styled from 'styled-components';
import { times } from 'lodash';
import moment from 'moment';

const Wrapper = styled.div`
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

export const DateColumn = ({ date }) => (
  <Wrapper>
    <DateContainer>
      <div>{moment(date).format('dddd')}</div>
      <div>{moment(date).format('M/D')}</div>
    </DateContainer>
    {times(24, idx => {
      return (
        <div>
          <FirstHalf />
          <SecondHalf />
        </div>
      );
    })}
  </Wrapper>
);
