import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';

import { Section } from 'components/basic/InfoSection';
import { HollowButton } from 'components/basic/Buttons';
import NewScheduleModal from '../modals/NewScheduleModal';
import CalendarModal from '../modals/CalendarModal';
import AssignmentInfo from '../basic/AssignmentInfo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const AssignmentsList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Buttons  = styled.div`
  display: flex;
  flex-direction: column;
`;

const Column = styled(Col)`
  margin-left: -5px;
  margin-right: -5px;
`;

export default class OrderSummarySection extends React.Component {
  state = {
    newAssignment: false,
    showCalendar: false,
    totalCount: 1,
    optionCount: 1,
    assignments: [],
  }

  setRef = (ref) => {
    this.newScheduleModal = ref;
  }

  addOne = () => {
    this.setState({
      optionCount: 1,
      totalCount: 1,
      assignments: [],
      showCalendar: true,
    })
  }

  addThree = () => {
    this.setState({
      optionCount: 3,
      totalCount: 3,
      assignments: [],
      showCalendar: true,
    })
  }

  openNewModal = () => {
    this.setState({ newAssignment: true })
  }

  closeNewModal = () => {
    this.setState({ newAssignment: false })
  }

  closeCalendar = () => {
    this.setState({ showCalendar: false })
  }

  saveOne = (assignment) => {
    const { assignments, optionCount } = this.state;
    this.setState({
      assignments: [...assignments, assignment],
      optionCount: optionCount - 1,
    })
  }

  onClickTime = ({date, fromTime, toTime}) => {
    const { optionCount } = this.state;
    if (optionCount > 0) {
      this.newScheduleModal.setFields(date, fromTime, toTime);
      this.setState({
        newAssignment: true
      })
    }
  }

  render () {
    const { optionCount, totalCount, newAssignment, assignments, showCalendar } = this.state;
    const { order } = this.props;
    const orderId = get(order, 'id');
    return (
      <Section title="Scheduling">
        {
          assignments.length === 0 ? (
            <Row style={{ margin: 0 }}>
              <Column>
                <HollowButton onClick={this.addOne}>SCHEDULE 1 OPTION</HollowButton>
                <HollowButton onClick={this.addThree}>SCHEDULE 3 OPTIONS</HollowButton>
              </Column>
            </Row>
          ) : (
            <Wrapper>
              <AssignmentsList>
                {
                  assignments.map((assignment, idx) => (
                    <AssignmentInfo assignment={assignment} key={`assignment_${idx}`} />
                  ))
                }
              </AssignmentsList>
              <Buttons>
                <HollowButton onClick={this.addOne}>RESCHEDULE 1 OPTION</HollowButton>
                <HollowButton onClick={this.addThree}>RESCHEDULE 3 OPTIONS</HollowButton>
              </Buttons>
            </Wrapper>
          )
        }
        <CalendarModal
          order={order}
          onClose={this.closeCalendar}
          optionCount={optionCount}
          totalCount={totalCount}
          onClickTime={this.onClickTime}
          open={showCalendar}
          assignments={assignments}
        />
        <NewScheduleModal
          ref={this.setRef}
          orderId={orderId}
          isLast={optionCount === 1}
          open={newAssignment}
          onClose={this.closeNewModal}
          onSave={this.saveOne}
        />
      </Section>
    )
  }
}
