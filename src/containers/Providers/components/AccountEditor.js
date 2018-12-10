import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input
} from 'components/basic/Input';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';

export class AccountEditor extends React.Component {
  constructor(props) {
    super(props);
    const {
      name,
      phoneNumber,
      websiteUrl,
      taxRate,
      subscriptionFee,
      transactionFee
    } = props;
    this.state = {
      name,
      phoneNumber,
      websiteUrl,
      taxRate,
      subscriptionFee,
      transactionFee
    };
  }
  onChangeField = (field, evt) => {
    const updateObj = {};
    updateObj[field] = evt.target.value;
    this.setState(updateObj);
  };
  renderFields = () => {
    const {
      name,
      phoneNumber,
      websiteUrl,
      taxRate,
      subscriptionFee,
      transactionFee
    } = this.state;
    return (
      <React.Fragment>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Provider Name</InputLabel>
            <Input
              type="text"
              value={name}
              onChange={evt => this.onChangeField('name', evt)}
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Phone</InputLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={evt => this.onChangeField('phoneNumber', evt)}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Tax Rate</InputLabel>
            <Input
              type="text"
              value={taxRate}
              onChange={evt => this.onChangeField('taxRate', evt)}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Subscription Fee</InputLabel>
            <Input
              type="text"
              value={subscriptionFee}
              onChange={evt => this.onChangeField('subscriptionFee', evt)}
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Transaction Fee</InputLabel>
            <Input
              type="text"
              value={transactionFee}
              onChange={evt => this.onChangeField('transactionFee', evt)}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Website</InputLabel>
            <Input
              type="text"
              value={websiteUrl}
              onChange={evt => this.onChangeField('websiteUrl', evt)}
            />
          </InputWrapper>
          <InputWrapper />
        </InputRow>
      </React.Fragment>
    );
  };
  renderActions = () => {
    const { save, next } = this.props;
    return (
      <React.Fragment>
        <HollowButton onClick={() => save(this.state)}>SAVE</HollowButton>
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
