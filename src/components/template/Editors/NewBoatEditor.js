import React from 'react';

import { InputRow, InputWrapper, InputLabel, Input } from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class NewBoatEditor extends React.Component {
  render() {
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>NAME</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>MAKE</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>BOAT MODEL</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>YEAR</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>BOAT LENGTH</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>BOAT LOCATION</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>BOAT LENGTH</InputLabel>
            <Input type="text" />
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
