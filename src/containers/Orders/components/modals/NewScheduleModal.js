import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'
import moment from 'moment'

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import { DateSelector, TimePicker, CheckField } from 'components/basic/Input';
import Modal from 'components/compound/Modal'

const Label = styled.div`
  margin: 15px 0;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: #07384b;
`

export default class NewScheduleModal extends React.Component {
  state = {
    fromDate: new Date(),
    fromTime: '12:00',
    toDate: new Date(),
    toTime: '12:00',
    needApproval: false,
  }

  changeField = field => (value) => {
    const data = {};
    data[field] = value;
    this.setState(data);
  }

  changeApprovalState = () => {
    const { needApproval } = this.state;
    this.setState({
      needApproval: !needApproval
    })
  }

  setFields(date, fromTime, toTime) {
    this.setState({
      fromDate: date,
      fromTime: fromTime,
      toDate: date,
      toTime: toTime,
      needApproval: false,
    })
  }

  resetFields() {
    this.setState({
      fromDate: new Date(),
      fromTime: '12:00',
      toDate: new Date(),
      toTime: '12:00',
      needApproval: false,
    })
  }

  onSave = () => {
    const { fromDate, fromTime, toDate, toTime, needApproval } = this.state
    const from = `${moment(fromDate).format('YYYY-MM-DD')} ${fromTime}`;
    const to = `${moment(toDate).format('YYYY-MM-DD')} ${toTime}`;
    this.props.onSave({ from: new Date(from), to: new Date(to), needApproval });
    if (this.props.isLast) {
      this.props.onClose();
    }
  }

  render() {
    const { open, onClose, isLast, orderId } = this.props;
    const action = [<HollowButton onClick={onClose}>Cancel</HollowButton>, <OrangeButton onClick={this.onSave}>{isLast ? 'Save' : 'Save & Continue'}</OrangeButton>];
    const { fromDate, fromTime, toDate, toTime, needApproval } = this.state;
    return (
      <Modal
        title={`Order #${orderId}`}
        small
        actions={action}
        open={open}
        onClose={onClose}
      >
        <Label>Schedule from</Label>
        <Row>
          <Col sm={6}>
            <DateSelector dateFormat="d-MMMM-yyyy" selected={fromDate} onChange={this.changeField('fromDate')}/>
          </Col>
          <Col sm={6}>
            <TimePicker time={fromTime} onChange={this.changeField('fromTime')} />
          </Col>
        </Row>
        <Label>Schedule from</Label>
        <Row>
          <Col sm={6}>
            <DateSelector dateFormat="d-MMMM-yyyy" selected={toDate} onChange={this.changeField('toDate')}/>
          </Col>
          <Col sm={6}>
            <TimePicker time={toTime} onChange={this.changeField('toTime')} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <CheckField checked={needApproval} title="Customer approval required" color="#8f8f8f" onClick={this.changeApprovalState} />
          </Col>
        </Row>
      </Modal>
    );
  }
}
