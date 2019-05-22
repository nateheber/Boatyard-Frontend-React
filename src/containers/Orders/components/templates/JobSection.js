import React from 'react';
import styled from 'styled-components';
import AddIcon from '../../../../resources/job/add.png';


import { Section } from 'components/basic/InfoSection';
import JobItem from '../infoSections/JobItem';
import GradientButton from '../basic/GradientButton';

const Wrapper = styled.div`
  margin: -25px -15px;
  overflow: auto;
  max-height: 290px;
`;

const Image = styled.img`
  width: 11px;
`;

export default class JobSection extends React.Component {
  handleAddJob = () => {
    const { addJob } = this.props;
    if (addJob) {
      addJob();
    }
  };

  renderAddButton = () => {
    return (<GradientButton onClick={this.handleAddJob}>
      <Image src={AddIcon} />
    </GradientButton>);
  };

  render () {
    const jobs = [
      {
      id: '23544',
      name: 'Job Title',
      status: 'accepted'
      },
      {
      id: '23545',
      name: 'Medium Job Title',
      status: 'in-progress'
      },
      {
      id: '23554',
      name: 'Third Job Title',
      status: 'pending'
      },
      {
      id: '22344',
      name: 'Short Job Title',
      status: 'completed'
      },
      {
      id: '29874',
      name: 'Really Long Job Title',
      status: 'declined'
      },
      {
      id: '23544',
      name: 'Job Title',
      status: 'accepted'
      },
      {
      id: '23545',
      name: 'Medium Job Title',
      status: 'in-progress'
      },
      {
      id: '23554',
      name: 'Third Job Title',
      status: 'pending'
      },
      {
      id: '22344',
      name: 'Short Job Title',
      status: 'completed'
      },
      {
      id: '29874',
      name: 'Really Long Job Title',
      status: 'declined'
      }
    ];
    return (
      <Section title='Jobs' mode='view' editComponent={this.renderAddButton()}>
        <Wrapper>
          {jobs.map((item, idx) => (
            <JobItem key={`timeline_${idx}`} job={item} />
          ))}
        </Wrapper>
      </Section>
    )
  }
}