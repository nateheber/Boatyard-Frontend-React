import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { parsetMomentToDate } from 'utils/basic';

const Wrapper = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  background-color: ${props => props.background || 'yellow'};
  &.starting {
    border-top: 3px solid ${props => props.hightlight || 'blue'};
  }
`

const getTimeOffsetInPercent = (start, end) => {
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) * 100;
}

export default ({background, hightlight, date, from, to}) => {
  const isStarting =  moment(date).isSame(from, 'day');
  const isEnding = moment(date).isSame(to, 'day');
  const startPos = isStarting ? getTimeOffsetInPercent(parsetMomentToDate(date), from) : 0;
  const endPos = isEnding ? getTimeOffsetInPercent(parsetMomentToDate(date), to) : 100;
  const height = endPos - startPos;
  return (
    <Wrapper background={background} hightlight={hightlight} style={{ top: `${startPos}%`, height: `${height}%` }}>

    </Wrapper>
  );
}