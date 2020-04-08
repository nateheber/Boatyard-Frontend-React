import React from 'react';
import styled from 'styled-components';
import AddIcon from '../../../../resources/job/add.png';


import { Section } from 'components/basic/InfoSection';
import JobItem from '../infoSections/JobItem';
import { GradientButton } from 'components/basic/Buttons';

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
    const {workorders} = this.props;
    return (
      <Section title='Jobs' mode='view' editComponent={this.renderAddButton()}>
        <Wrapper>
          {workorders.map((item, idx) => (
            <JobItem key={`timeline_${idx}`} job={item} SetWorkOrder={this.props.SetWorkOrder} />
          ))}
        </Wrapper>
      </Section>
    )
  }
}
