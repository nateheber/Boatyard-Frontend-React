import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input,
  TextArea,
  CheckBox
} from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class ProviderAccountEditor extends React.Component {
  render() {
    const fields = (
      <div>
        <InputRow>
          <InputWrapper style={{ flex: 6 }} className="secondary">
            <InputLabel>Provider Name</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 3 }} className="secondary">
            <InputLabel>Contact First Name</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 3 }} className="secondary">
            <InputLabel>Contact First Name</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Phone</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Email</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Address</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>City</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>State</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Zip Code</InputLabel>
            <TextArea />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>SaaS Subscriber</InputLabel>
            <CheckBox />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Google Place ID</InputLabel>
            <TextArea />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Website</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary" />
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Payment Method</InputLabel>
            <HollowButton>ADD PAYMENT METHOD</HollowButton>
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Monthly Subscription Fee</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Logo (1300px x 460px)</InputLabel>
            <HollowButton>ADD LOGO</HollowButton>
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel />
            <Input disabled type="text" placeholder="OR DRAGE PNG HERE" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper />
          <InputWrapper className="secondary">
            <InputLabel>Transaction Fee</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper />
          <InputWrapper />
        </InputRow>
      </div>
    );
    const actions = [
      <HollowButton>Save</HollowButton>,
      <OrangeButton>Next</OrangeButton>
    ];
    return <EditorSection content={fields} actions={actions} />;
  }
}
