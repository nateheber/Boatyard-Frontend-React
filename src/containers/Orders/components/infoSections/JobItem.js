import React from 'react';
import styled from 'styled-components';
import { startCase } from 'lodash';

const Wrapper = styled.div`
  position: relative;
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F5F5F5;

  &:hover {
    cursor: pointer;
    background: #F5F5F5;
  }
`;

const LeftSection = styled.div`
  width: 24%;
`;

const JobTitle = styled.div`
  font-family: Helvetica;
  font-size: 16px;
  color: #003247;
  text-align: left;
  line-height: 23px;
`;

const JobID = styled.div`
  font-family: Helvetica;
  font-size: 12px;
  color: #999999;
  text-align: left;
`;

const MiddleSection = styled(JobID)`
  flex-grow: 1;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  .edit {
    margin-left: 10px;
    cursor: pointer;
    img {
      width: 20px;
    }
  }
`;

const Button = styled.button`
  background: #0D485F;
  font-family: Helvetica;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  min-height: 30px;
  min-width: 133px;
  border: none;
  &.accepted {
    background-color: #F38118;
  }
  &.in-progress {
    background-color: #147397;
  }
  &.pending {
    background-color: #0D485F;
  }
  &.completed {
    background-color: #9F9AA4;
  }
  &.declined {
    background-color: #DE5454;
  }
`;

export default class JobItem extends React.Component {
  reviseServices(services) {
    return services.map(({scheduledText, name}) => {
      let due_type;
      let due_date = undefined;
      let due_time = undefined;
      let due_time_range = undefined;

      if (scheduledText === 'Flexible') {
        due_type = 'flexible';
      } else if (scheduledText === 'As Soon As Possible') {
        due_type = 'asap';
      } else {
        if (scheduledText.indexOf(' ') > 1) {
          const vals = scheduledText.split(' ');
          if (scheduledText.indexOf ('~') > 1) {
            due_type = 'date_time_range';
            due_time_range = {
              from_time: {value: vals[1], label: vals[1]},
              to_time: {value: vals[3], label: vals[3]}
            };
          } else {
            due_type = 'specific_date_time';
            due_time = {value: vals[1], label: vals[1]};
          }
          due_date = new Date(vals[0]);
        } else {
          due_type = 'specific_date';
          due_date= new Date(scheduledText);
        }
      }
      return {
        service: name,
        due_type,
        due_date,
        due_time,
        due_time_range
      }
    })
  }

  handleEdit = () => {
    const { job: {id, attachments, assignments, attributes: {jobNumber, state, notes, settings, title, services}}, SetWorkOrder } = this.props;
    const assignee = assignments.length > 0 ? assignments[assignments.length - 1] : undefined;
    const workorder = {
      id,
      notes,
      settings,
      title,
      jobNumber,
      services: this.reviseServices(services),
      reset: true,
      modalShow: true,
      assignee: assignee && {value: assignee.id, label: assignee.fullName},
      file_attachments_attributes: attachments,
      state,
    };

    SetWorkOrder(workorder);
  }

  render () {
    const { job } = this.props;
    const { assignments } = job;
    const assignee = assignments.length > 0 ? assignments[assignments.length - 1].fullName : '';
    return (
      <Wrapper onClick={this.handleEdit}>
        <LeftSection>
          <JobTitle>{job.attributes.title}</JobTitle>
          <JobID>{job.attributes.jobNumber}</JobID>
        </LeftSection>
        <MiddleSection>
          {assignee}
        </MiddleSection>
        <RightSection>
          {/* <Button className={job.status}>{startCase(job.status)}</Button> */}
          <Button className={job.attributes.state}>{startCase(job.attributes.state)}</Button>
        </RightSection>
      </Wrapper>
    )
  }
}
