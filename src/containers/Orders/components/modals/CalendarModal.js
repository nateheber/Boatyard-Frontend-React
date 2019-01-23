import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

import { DatePicker, TeamMembers } from 'components/compound/Calendar';
import { CalendarList, CalendarHeader } from 'components/compound/Calendar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftPart = styled.div`
  flex: 1;
  display: inline-block;
  height: 100%;
  overflow-y: scroll;
`

const RightPart = styled.div`
  flex: 4;
  display: inline-block;
  padding-bottom: 15px;
`

const modalStyles = {
  overlay: {
    background: 'transparent',
  },
  modal: {
    padding: '0px',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%',
    overflowY: 'auto'
  }
};

export default class CalendarModal extends React.Component {
  state = {
    date: new Date(),
  }

  onChangeDate = (date) => {
    this.setState({ date })
  }

  onClickTime = (date, time) => {
    const fromTime = time;
    const parts = time.split(':');
    const toTime = `${parseInt(parts[0])+2}:${parts[1]}`
    this.props.onClickTime({
      date, fromTime, toTime
    })
  }

  render() {
    const { open, onClose, optionCount, totalCount, assignments } = this.props;
    const { date } = this.state;
    return (
      <Modal styles={modalStyles} open={open} onClose={onClose}>
        <Wrapper>
          <LeftPart>
            <DatePicker date={date} onChange={this.onChangeDate} />
            {/* <TeamMembers /> */}
          </LeftPart>
          <RightPart>
            <CalendarHeader
              date={date}
              onChange={this.onChangeDate}
              title={`Choose slot option ${optionCount} of ${totalCount}`}
            />
            <CalendarList date={date} onClickTime={this.onClickTime} assignments={assignments} />
          </RightPart>
        </Wrapper>
      </Modal>
    )
  }
}