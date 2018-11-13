import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input,
  TextArea
} from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class NewCustomerEditor extends React.Component {
  render() {
    const fields = (
      <div>
        <InputRow>
          <InputWrapper style={{ flex: 5 }} className="secondary">
            <InputLabel>FIRST NAME</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 4 }} className="secondary">
            <InputLabel>LAST NAME</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 3 }} className="secondary">
            <InputLabel>PHONE NUMBER</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>BILLING ADDRESS</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper style={{ flex: 5 }} className="secondary">
            <InputLabel>CITY</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 4 }} className="secondary">
            <InputLabel>STATE</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 3 }} className="secondary">
            <InputLabel>ZIPCODE</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper style={{ flex: 5 }} className="secondary">
            <InputLabel>EMAIL</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper style={{ flex: 7 }} className="secondary">
            <InputLabel>CUSTOMER NOTES</InputLabel>
            <TextArea />
          </InputWrapper>
        </InputRow>
      </div>
    );
    const actions = [
      <HollowButton>Cancel</HollowButton>,
      <OrangeButton>Save</OrangeButton>
    ];
    return <EditorSection content={fields} actions={actions} />;
  }
}
