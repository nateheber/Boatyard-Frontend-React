import React from 'react';

import { InputRow, InputWrapper, InputLabel, Input } from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class ProviderDetailsEditor extends React.Component {
  render() {
    const {
      name,
      phoneNumber,
      websiteUrl,
      taxRate,
      subscriptionFee,
      transactionFee,
      onCancel,
      onEdit
    } = this.props;
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Provider Name</InputLabel>
            <Input type="text" value={name} disabled />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Phone</InputLabel>
            <Input type="text" value={phoneNumber} disabled />
          </InputWrapper>
          <InputWrapper style={{ flex: 6 }} className="secondary">
            <InputLabel>Website Url</InputLabel>
            <Input type="text" value={websiteUrl} disabled />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Tax Rate</InputLabel>
            <Input type="text" value={taxRate} disabled />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Subscription Fee</InputLabel>
            <Input type="text" value={subscriptionFee} disabled />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Transaction Fee</InputLabel>
            <Input type="text" value={transactionFee} disabled />
          </InputWrapper>
        </InputRow>
      </div>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={onCancel}>Cancel</HollowButton>
        <OrangeButton onClick={onEdit}>Edit</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
