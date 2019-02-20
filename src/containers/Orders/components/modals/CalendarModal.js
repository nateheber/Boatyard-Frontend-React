import React from 'react';
import Modal from 'react-responsive-modal';
import { get } from 'lodash';

import { DatePicker } from 'components/compound/Calendar';
import { CalendarList, CalendarHeader } from 'components/compound/Calendar';

import {
  BoatInfo, OrderInfo, Wrapper, LeftPart, ScheduleHeader, Content, SectionHeader, RightPart,
} from '../basic/Scheduler';

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
    const { open, onClose, optionCount, totalCount, assignments, order } = this.props;
    const { date } = this.state;
    const orderId = get(order, 'id');
    return (
      <Modal styles={modalStyles} open={open} onClose={onClose}>
        <Wrapper>
          <LeftPart>
            <ScheduleHeader>
              schedule order #{orderId}
            </ScheduleHeader>
            <Content>
              <SectionHeader>Calendar</SectionHeader>
              <DatePicker date={date} onChange={this.onChangeDate} />
              <OrderInfo order={order} />
              <BoatInfo order={order} />
            </Content>
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