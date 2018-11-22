import React from 'react';

import { InputRow, InputWrapper, InputLabel, Input } from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class UserEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }
  onChange = (value, field) => {
    const updateObject = {};
    updateObject[field] = value;
    this.setState(updateObject);
  };
  save = () => {
    this.props.onSave(this.state);
  };
  render() {
    const { firstName, lastName, email, phoneNumber } = this.props;
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>FIRST NAME</InputLabel>
            <Input
              defaultValue={firstName}
              onChange={evt => this.onChange(evt.target.value, 'firstName')}
              type="text"
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>LAST NAME</InputLabel>
            <Input
              defaultValue={lastName}
              onChange={evt => this.onChange(evt.target.value, 'lastName')}
              type="text"
            />
          </InputWrapper>
        </InputRow>

        <InputRow>
          <InputWrapper className="secondary">
            <InputLabel>EMAIL</InputLabel>
            <Input
              defaultValue={email}
              onChange={evt => this.onChange(evt.target.value, 'email')}
              type="text"
            />
          </InputWrapper>
          <InputWrapper className="secondary">
            <InputLabel>PHONE NUMBER</InputLabel>
            <Input
              defaultValue={phoneNumber}
              onChange={evt => this.onChange(evt.target.value, 'phoneNumber')}
              type="text"
            />
          </InputWrapper>
        </InputRow>
      </div>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.props.onCancel}>Cancel</HollowButton>
        <OrangeButton onClick={this.save}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
