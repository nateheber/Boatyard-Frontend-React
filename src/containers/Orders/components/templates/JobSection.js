import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { Section } from 'components/basic/InfoSection';
import JobItem from '../infoSections/JobItem';

const Wrapper = styled.div`
  margin: -25px -15px;
  overflow: auto;
  max-height: 290px;
`;

const Button = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  padding: 5px;
  outline: none;
  cursor: pointer;
  background: #FFFFFF;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.12) 100%);
  border: 1px solid #A9B5BB;
  border-radius: 6px;
`;

export default class JobSection extends React.Component {
  addJob = () => {

  };

  renderAddButton = () => {
    return (<Button onClick={this.addJob}>
      <FontAwesomeIcon icon='plus' color='#003247' />
    </Button>);
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
