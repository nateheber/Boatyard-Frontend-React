import React from 'react'
import styled from 'styled-components'
import { isEmpty } from 'lodash'

import { Input } from './Input'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TimeInput = styled(Input)`
  width: 33px;
`

const AMButton = styled.button`
  margin-left: 3px;
  border: 1px solid #E6E6E6;
  color: #8f8f8f;
  border-radius: 5px !important;
  outline: 0!important;
  box-shadow: none!important;
  background-color: #fff;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  user-select: none;
  font-family: 'Source Sans Pro', sans-serif;
`

const getTime = (time) => {
  if (isEmpty(time)) {
    return { hour: 0, min: 0, part: 'AM' }
  }
  const mainParts = time.split(':');
  const hour = parseInt(mainParts[0]) % 12;
  const min = parseInt(mainParts[1]);
  const part = parseInt(mainParts[0]) >= 12 ? 'PM' : 'AM';
  return { hour, min, part }
}

export class TimePicker extends React.Component {
  constructor(props) {
    super(props)
    const { time } = props;
    const { hour, min, part } = getTime(time);
    this.state = { hour, min, part }
  }

  onChangeHour = (evt) => {
    this.setState({ hour: evt.target.value }, this.sumitChange)
  }

  onChangeMin = (evt) => {
    this.setState({ min: evt.target.value }, this.sumitChange)
  }

  onChangePart = () => {
    const { part } = this.state;
    this.setState({
      part: part === 'AM' ? 'PM' : 'AM'
    })
  }

  sumitChange = () => {
    const { hour, min, part } = this.state;
    const hourVal = part === 'PM' ? parseInt(hour) + 12 : parseInt(hour);
    const minVal = parseInt(min);
    return `${hourVal}:${minVal}`
  }

  render() {
    const { hour, min, part } = this.state;
    return (
      <Wrapper>
        <TimeInput mask="99" value={hour} onChange={this.onChangeHour} />:
        <TimeInput mask="99" value={min} onChange={this.onChangeMin} /> 
        <AMButton onClick={this.onChangePart}>{part}</AMButton>
      </Wrapper>
    )
  }
}

