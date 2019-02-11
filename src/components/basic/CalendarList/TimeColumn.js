import React from 'react';
import styled from 'styled-components';
import { times } from 'lodash';

const Wrapper = styled.div`
  width: 34px;
  border-right: 1px solid #ddd;
`;

const Empty = styled.div`
  height: 45px;
`;

const FirstHalf = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 22px;
  padding: 0px 2px;
  background-color: white;
  font-size: 12px;
  font-weight: 300;
  color: #333;
`;

const SecondHalf = styled.div`
  height: 22px;
  background-color: #f7f7f7;
`;

export const TimeColumn = () => (
  <Wrapper>
    <Empty />
    {times(24, idx => {
      const hour = idx === 0 ? 12 : idx % 12;
      const apm = (idx + 1) / 12 > 1 ? 'pm' : 'am';
      return (
        <div key={`div_${idx}`}>
          <FirstHalf>
            {hour}
            {apm}
          </FirstHalf>
          <SecondHalf />
        </div>
      );
    })}
  </Wrapper>
);
