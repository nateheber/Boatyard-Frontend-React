import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { HollowButton } from 'components/basic/Buttons'

const Wrapper = styled.div`
  position: relative;
  padding: 25px;
`

const TitleWrapper = styled.div`
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px;
  font-weight: 700;
  width: 100%;
`

const ButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Button = styled.button`

`

export class CalendarHeader extends React.Component {
  now = () => {
    this.props.onChange(new Date())
  }

  changeWeek = offset => () => {
    const { date } = this.props;
    const prevWeekDate = moment(date).add(offset, 'week');
    const convertTime = moment(prevWeekDate).format("YYYY-MM-DD HH:mm:ss");
    const convertTimeObject = new Date(convertTime);
    this.props.onChange(convertTimeObject);
  }

  render() {
    const { title, date } = this.props;
    const isThisWeek = moment(date).isSame(moment(), 'week');
    return (
      <Wrapper>
        <ButtonWrapper>
          <HollowButton disabled={isThisWeek} onClick={this.now}>TODAY</HollowButton>
          <Button onClick={this.changeWeek(-1)}>{'<'}</Button>
          <Button onClick={this.changeWeek(1)}>{'>'}</Button>
        </ButtonWrapper>
        <TitleWrapper>{title}</TitleWrapper>
      </Wrapper>
    )
  }
}