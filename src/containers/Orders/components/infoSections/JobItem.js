import React from 'react';
import styled from 'styled-components';

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
`;

const LeftSection = styled.div`
`;

const JobTitle = styled.div`
  font-family: Helvetica;
  font-size: 16px;
  color: #003247;
  text-align: left;
  line-height: 23px;
`;

// const JobID = styled.div`
//   font-family: Helvetica;
//   font-size: 12px;
//   color: #999999;
//   text-align: left;
// `;

const RightSection = styled.div`
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

  render () {
    const { job } = this.props;
    return (
      <Wrapper>
        <LeftSection>
          <JobTitle>{job.attributes.jobNumber}</JobTitle>
        </LeftSection>
        <RightSection>
          {/* <Button className={job.status}>{startCase(job.status)}</Button> */}
          <Button className="pending">Pending</Button>
        </RightSection>
      </Wrapper>
    )
  }
}
