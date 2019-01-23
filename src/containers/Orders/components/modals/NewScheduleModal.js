import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-flexbox-grid'

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import { DateSelector, TimePicker } from 'components/basic/Input';
import Modal from 'components/compound/Modal'

const Label = styled.div`
  margin: 15px 0;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  color: #07384b;
`

export default class EditBoatModal extends React.Component {
  render() {
    const { open, onClose, isLast, orderId } = this.props;
    const action = [<HollowButton onClick={onClose}>Cancel</HollowButton>, <OrangeButton onClick={this.onSave}>{isLast ? 'Save' : 'Save & Continue'}</OrangeButton>];
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
            <DateSelector />
          </Col>
          <Col sm={6}>
            <TimePicker />
          </Col>
        </Row>
      </Modal>
    );
  }
}
