import React from 'react';
import { toastr } from 'react-redux-toastr';

import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import FormFields from 'components/template/FormFields';

export class AccountEditor extends React.Component {
  save = () => {
    if (this.fields.validateFields()) {
      const {
        name,
        phoneNumber,
        websiteUrl,
        taxRate,
        subscriptionFee,
        transactionFee
      } = this.fields.getFieldValues();
      this.props.save({
        name,
        phoneNumber,
        websiteUrl,
        taxRate: parseFloat(taxRate),
        subscriptionFee: parseFloat(subscriptionFee),
        transactionFee: parseFloat(transactionFee)
      });
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };
  getFormFieldsInfo = () => {
    const {
      name,
      phoneNumber,
      websiteUrl,
      taxRate,
      subscriptionFee,
      transactionFee
    } = this.props;
    return [
      {
        field: 'name',
        label: 'Name',
        type: 'text_field',
        errorMessage: 'Enter the company name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'phoneNumber',
        label: 'Phone',
        type: 'text_field',
        mask: '(999) 999-9999',
        maskChar: '_',
        required: true,
        errorMessage: 'Enter a phone number',
        defaultValue: phoneNumber,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'websiteUrl',
        label: 'Website URL',
        type: 'text_field',
        defaultValue: websiteUrl,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'subscriptionFee',
        label: 'Monthly Subscription Fee',
        type: 'text_field',
        required: true,
        errorMessage: 'Subscription Fee Must have at least 1 digit',
        defaultValue: subscriptionFee,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'transactionFee',
        label: 'Transaction Fee',
        type: 'text_field',
        required: true,
        errorMessage: 'Transaction Fee Must have at least 1 digit',
        defaultValue: transactionFee,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      },
      {
        field: 'taxRate',
        label: 'Tax Rate',
        type: 'text_field',
        required: true,
        errorMessage: 'Tax Rate Must have at least 1 digit',
        defaultValue: taxRate,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 6,
        xl: 6
      }
    ];
  };
  setFormFieldsRef = ref => {
    this.fields = ref;
  };
  renderFields = () => {
    const formFieldInfo = this.getFormFieldsInfo();
    return <FormFields ref={this.setFormFieldsRef} fields={formFieldInfo} />;
  };
  renderActions = () => {
    const { next } = this.props;
    return (
      <React.Fragment>
        <HollowButton onClick={this.save}>SAVE</HollowButton>
        <OrangeButton onClick={next}>NEXT</OrangeButton>
      </React.Fragment>
    );
  };
  render() {
    return (
      <EditorSection
        content={this.renderFields()}
        actions={this.renderActions()}
      />
    );
  }
}
