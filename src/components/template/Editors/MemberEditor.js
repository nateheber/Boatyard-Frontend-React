import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input,
  Select
} from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class MemberEditor extends React.Component {
  render() {
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>First Name</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Last Name</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Email</InputLabel>
            <Input type="text" />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>Phone</InputLabel>
            <Input type="text" />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>Permissions</InputLabel>
            <Select>
              <option value="admin">Admin</option>
            </Select>
          </InputWrapper>
          <InputWrapper />
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
