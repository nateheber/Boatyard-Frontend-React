import React from 'react';

import {
  InputRow,
  InputWrapper,
  InputLabel,
  Input,
  TextArea,
  CheckField
} from '../../basic/Input';
import { OrangeButton, HollowButton } from '../../basic/Buttons';
import { EditorSection } from '../../compound/SubSections';

export class CategoryEditor extends React.Component {
  constructor(props) {
    super(props);
    const {
      name,
      subtitle,
      appIdentifier,
      description,
      isHidden,
      primary
    } = props;
    this.state = {
      name,
      subtitle,
      appIdentifier,
      description,
      isHidden,
      primary
    };
  }

  onChangeVal = (field, val) => {
    const obj = {};
    obj[field] = val;
    this.setState({ ...obj });
  };

  onSave = () => {
    this.props.onSave({ ...this.state });
  };

  render() {
    const {
      name,
      subtitle,
      appIdentifier,
      description,
      isHidden,
      primary
    } = this.state;
    const fields = (
      <div>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Category Name</InputLabel>
            <Input
              type="text"
              defaultValue={name}
              onChange={evt => this.onChangeVal('name', evt.target.value)}
            />
          </InputWrapper>
          <InputWrapper className="primary">
            <InputLabel>Subtitle</InputLabel>
            <Input
              type="text"
              defaultValue={subtitle}
              onChange={evt => this.onChangeVal('subtitle', evt.target.value)}
            />
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>App Identifier</InputLabel>
            <Input
              type="text"
              defaultValue={appIdentifier}
              onChange={evt =>
                this.onChangeVal('appIdentifier', evt.target.value)
              }
            />
          </InputWrapper>
          {/* <InputWrapper className="primary">
            <InputLabel>Icon</InputLabel>
            <input type="file" />
          </InputWrapper> */}
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Description</InputLabel>
            <TextArea
              defaultValue={description}
              onChange={evt =>
                this.onChangeVal('description', evt.target.value)
              }
            />
          </InputWrapper>
          <InputWrapper>
            <CheckField
              title="Primary"
              checked={primary}
              onClick={() => this.onChangeVal('primary', !primary)}
            />
            <CheckField
              title="Is Hidden"
              checked={isHidden}
              onClick={() => this.onChangeVal('isHidden', !isHidden)}
            />
          </InputWrapper>
        </InputRow>
      </div>
    );
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.props.onCancel}>Cancel</HollowButton>,
        <OrangeButton onClick={this.onSave}>Save</OrangeButton>
      </React.Fragment>
    );
    return <EditorSection content={fields} actions={actions} />;
  }
}
