import React from 'react';

import {
  // Input,
  // InputWrapper,
  // InputLabel,
  // CheckBox,
  // TextArea,
  // Select,
  // DateSelector,
  // CurrencyInput
} from 'components/basic/Input';
import GradientButton from '../../../../basic/GradientButton';
import { Section, SectionHeader, SectionContent, HeaderTitle, Image } from '../Section';
import { SummaryItemView, SummaryEditView } from './components';

import AddIcon from '../../../../../../../resources/job/add.png';

export default class JobSummarySection extends React.Component {
  setCustomerInfoFieldRef = (ref) => {
    this.customerInfoFields = ref;
  };

  getCustomerInfoFieldsInfo = () => {
    const fields = [
      {
        type: 'text_field',
        field: 'first_name',
        className: 'primary',
        label: 'First Name',
        errorMessage: 'Enter First Name',
        required: true,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'last_name',
        className: 'primary',
        label: 'Last Name',
        errorMessage: 'Enter Last Name',
        required: true,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'email',
        className: 'primary',
        label: 'Email',
        errorMessage: 'Enter Email',
        required: true,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      }
    ]
    return fields;
  };

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
