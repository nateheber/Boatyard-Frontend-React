import React from 'react';

import { GradientButton } from 'components/basic/Buttons';
import { Section, SectionHeader, SectionContent, HeaderTitle, Image } from '../Section';
import { SummaryItemView, SummaryEditView } from './components';

import AddIcon from '../../../../../../../resources/job/add.png';

export default class JobSummarySection extends React.Component {
  render() {
    return (
      <Section>
        <SectionHeader>
          <HeaderTitle>Job Summary</HeaderTitle>
            <GradientButton onClick={this.handleAddSummary}>
              <Image src={AddIcon} />
            </GradientButton>
        </SectionHeader>
        <SectionContent>
          <SummaryItemView />
          <SummaryEditView />
        </SectionContent>
      </Section>
    );
  }
}
